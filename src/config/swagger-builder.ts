import 'reflect-metadata';
import yaml from 'js-yaml';
import fs from 'fs';

/**
 * Convert Express path format to OpenAPI format
 * Example: '/cosmetics/:id' => '/cosmetics/{id}'
 */
function convertExpressPathToOpenAPI(expressPath: string): string {
    return expressPath.replace(/:([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '{$1}');
}

export class SwaggerBuilder {
    private swagger: any = {
        paths: {},
        components: {
            schemas: {},
        },
        tags: [],
    };
    constructor() {}

    addTag(name: string, description: string): SwaggerBuilder {
        this.swagger.tags.push({ name, description });
        return this;
    }

    addSecurityScheme(name: string, scheme: any): SwaggerBuilder {
        if (!this.swagger.components.securitySchemes) {
            this.swagger.components.securitySchemes = {};
        }
        this.swagger.components.securitySchemes[name] = scheme;
        return this;
    }

    addPath(path: string, methods: any): SwaggerBuilder {
        if (!this.swagger.paths[path]) {
            this.swagger.paths[path] = {};
        }
        Object.assign(this.swagger.paths[path], methods);
        return this;
    }

    addSchemasFromComments(files: string[]): SwaggerBuilder {
        // Đọc các file types/dto và parse comment @swagger đặt ngay trên đầu mỗi type/schema
        for (const file of files) {
            const content = fs.readFileSync(file, 'utf-8');
            // Tìm tất cả các comment @swagger ngay trước export type|interface|class
            const regex =
                /\/\*\*([\s\S]*?@swagger[\s\S]*?)\*\/\s*(export (type|interface|class) (\w+))/g;
            let match;
            while ((match = regex.exec(content)) !== null) {
                const comment = match[1];
                const typeName = match[4];
                // Lấy phần sau @swagger làm yaml
                const yamlText = comment
                    .split('@swagger')[1]
                    .replace(/^\s*\* ?/gm, '');
                try {
                    const doc = yaml.load(yamlText);
                    if (doc && typeof doc === 'object') {
                        this.swagger.components.schemas[typeName] = doc;
                    }
                } catch (e) {
                    console.warn(
                        `Failed to parse @swagger for ${typeName} in ${file}:`,
                        e,
                    );
                }
            }
        }
        return this;
    }

    addControllersFromAnnotations(controllers: Function[]): SwaggerBuilder {
        // Không thay đổi, giữ nguyên annotation cho controller
        for (const ctrl of controllers) {
            const ctrlMeta = Reflect.getMetadata('swagger:controller', ctrl);
            if (!ctrlMeta) continue;
            this.addTag(ctrlMeta.tag, ctrlMeta.description || '');
            // Quét instance methods
            const proto = ctrl.prototype;
            const instanceMethodNames = Object.getOwnPropertyNames(
                proto,
            ).filter(
                (m) => typeof proto[m] === 'function' && m !== 'constructor',
            );
            for (const methodName of instanceMethodNames) {
                this._addMethodPath(proto, methodName, ctrlMeta);
            }
            // Quét static methods
            const staticMethodNames = Object.getOwnPropertyNames(ctrl).filter(
                (m) =>
                    typeof (ctrl as any)[m] === 'function' &&
                    m !== 'prototype' &&
                    m !== 'length' &&
                    m !== 'name',
            );
            for (const methodName of staticMethodNames) {
                this._addMethodPath(ctrl, methodName, ctrlMeta);
            }
        }
        return this;
    }

    _addMethodPath(target: any, methodName: string, ctrlMeta: any) {
        const methodMeta = Reflect.getMetadata(
            'swagger:method',
            target,
            methodName,
        );
        if (!methodMeta) return;
        const parameters: any[] = [];
        // Query
        if (methodMeta.query && typeof methodMeta.query === 'string') {
            const schema = this.swagger.components.schemas[methodMeta.query];
            if (schema && schema.properties) {
                for (const [prop, propSchemaRaw] of Object.entries(
                    schema.properties,
                )) {
                    const propSchema = propSchemaRaw as Record<string, any>;
                    const param: any = {
                        in: 'query',
                        name: prop,
                        schema: { ...propSchema },
                        required: Array.isArray(schema.required)
                            ? schema.required.includes(prop)
                            : false,
                    };
                    if (propSchema.enum) {
                        param.schema.enum = propSchema.enum;
                    }
                    parameters.push(param);
                }
            } else {
                // fallback: $ref toàn bộ schema
                parameters.push({
                    in: 'query',
                    name: methodMeta.query,
                    schema: {
                        $ref: `#/components/schemas/${methodMeta.query}`,
                    },
                });
            }
        }
        // Path params
        if (methodMeta.params && typeof methodMeta.params === 'string') {
            // Handle multiple params (comma-separated) or single param
            const paramNames = methodMeta.params.includes(',')
                ? methodMeta.params.split(',').map((p: string) => p.trim())
                : [methodMeta.params];

            for (const paramName of paramNames) {
                parameters.push({
                    in: 'path',
                    name: paramName,
                    schema: {
                        type: 'string',
                        description: `Path parameter: ${paramName}`,
                    },
                    required: true,
                });
            }
        } else if (
            methodMeta.autoDetectedParams &&
            Array.isArray(methodMeta.autoDetectedParams)
        ) {
            // Use auto-detected params from URL pattern
            for (const paramName of methodMeta.autoDetectedParams) {
                parameters.push({
                    in: 'path',
                    name: paramName,
                    schema: {
                        type: 'string',
                        description: `Auto-detected path parameter: ${paramName}`,
                    },
                    required: true,
                });
            }
        }
        // Body
        let requestBody;
        if (methodMeta.body && typeof methodMeta.body === 'string') {
            requestBody = {
                content: {
                    'application/json': {
                        schema: {
                            $ref: `#/components/schemas/${methodMeta.body}`,
                        },
                    },
                },
            };
        }
        // Response
        let responses: any = {};
        if (methodMeta.response && typeof methodMeta.response === 'string') {
            responses[methodMeta.status || 200] = {
                description: methodMeta.description || '',
                content: {
                    'application/json': {
                        schema: {
                            $ref: `#/components/schemas/${methodMeta.response}`,
                        },
                    },
                },
            };
        } else if (methodMeta.responses) {
            responses = methodMeta.responses;
        }
        const path =
            methodMeta.path || `/${ctrlMeta.tag.toLowerCase()}/${methodName}`;

        // Construct full path: if methodMeta.path starts with '/', combine with controller tag
        // Otherwise use the path as-is for backward compatibility
        let fullPath: string;
        if (methodMeta.path) {
            if (methodMeta.path.startsWith('/')) {
                // Relative path - combine with controller tag
                const basePath = `/${ctrlMeta.tag.toLowerCase()}`;
                if (methodMeta.path === '/') {
                    fullPath = basePath;
                } else {
                    fullPath = basePath + methodMeta.path;
                }
            } else {
                // Absolute path - use as-is (legacy support)
                fullPath = methodMeta.path;
            }
        } else {
            // No path specified - use default
            fullPath = `/${ctrlMeta.tag.toLowerCase()}/${methodName}`;
        }

        // Convert Express path format (:id) to OpenAPI format ({id})
        const openApiPath = convertExpressPathToOpenAPI(fullPath);
        // Kiểm tra requireHeader
        let security;
        if (
            Reflect.getMetadata('swagger:requireHeader', target, methodName) ||
            Reflect.getMetadata(
                'swagger:requireHeader',
                target.constructor || target,
            )
        ) {
            security = [{ bearerAuth: [] }];
        }
        this.addPath(openApiPath, {
            [methodMeta.method || 'get']: {
                tags: [ctrlMeta.tag],
                summary: methodMeta.name,
                description: methodMeta.description,
                parameters: parameters.length > 0 ? parameters : undefined,
                requestBody,
                responses,
                ...(security ? { security } : {}),
            },
        });
    }

    build(): any {
        return this.swagger;
    }
}
