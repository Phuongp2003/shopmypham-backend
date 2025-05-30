import 'reflect-metadata';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// --- Utility Functions ---
/**
 * Extract path parameters from URL pattern
 * Example: '/cosmetics/:id/variants/:variantId' => ['id', 'variantId']
 */
export function extractPathParams(path: string): string[] {
    const paramPattern = /:([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
    const params: string[] = [];
    let match;
    
    while ((match = paramPattern.exec(path)) !== null) {
        params.push(match[1]);
    }
    
    return params;
}

// --- Annotation Decorators ---
export function Controller(options: { tag: string; description?: string }) {
    return function (target: Function) {
        Reflect.defineMetadata('swagger:controller', options, target);
    };
}

export function RequireHeader() {
    return function (
        target: any,
        propertyKey?: string,
        descriptor?: PropertyDescriptor,
    ) {
        if (propertyKey) {
            // Method decorator
            Reflect.defineMetadata(
                'swagger:requireHeader',
                true,
                target,
                propertyKey,
            );
        } else {
            // Class decorator
            Reflect.defineMetadata('swagger:requireHeader', true, target);
        }
    };
}

function SwaggerMethod(
    meta: {
        name?: string;
        description?: string;
        path?: string;
        method?: string;
    },
    swaggerInfo?: {
        query?: string;
        params?: string; // This will be auto-detected if not provided
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        // Auto-detect path parameters if path is provided
        let autoDetectedParams: string[] = [];
        if (meta.path) {
            autoDetectedParams = extractPathParams(meta.path);
        }
        
        // Merge auto-detected params with manually specified params
        const finalSwaggerInfo = { ...swaggerInfo };
        
        // If params not manually specified but we found params in path, use auto-detected
        if (!finalSwaggerInfo.params && autoDetectedParams.length > 0) {
            // For single param, use string. For multiple params, use array or object
            if (autoDetectedParams.length === 1) {
                finalSwaggerInfo.params = autoDetectedParams[0];
            } else {
                // For multiple params, we'll store as comma-separated string
                // The SwaggerBuilder will need to handle this
                finalSwaggerInfo.params = autoDetectedParams.join(',');
            }
        }
        
        Reflect.defineMetadata(
            'swagger:method',
            { 
                ...meta, 
                ...finalSwaggerInfo,
                autoDetectedParams // Store for SwaggerBuilder to use
            },
            target,
            propertyKey,
        );
    };
}

export function Get(
    meta: { name?: string; description?: string; path?: string },
    swaggerInfo?: {
        query?: string;
        params?: string;
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return SwaggerMethod({ ...meta, method: 'get' }, swaggerInfo);
}

export function Post(
    meta: { name?: string; description?: string; path?: string },
    swaggerInfo?: {
        query?: string;
        params?: string;
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return SwaggerMethod({ ...meta, method: 'post' }, swaggerInfo);
}

export function Put(
    meta: { name?: string; description?: string; path?: string },
    swaggerInfo?: {
        query?: string;
        params?: string;
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return SwaggerMethod({ ...meta, method: 'put' }, swaggerInfo);
}

export function Patch(
    meta: { name?: string; description?: string; path?: string },
    swaggerInfo?: {
        query?: string;
        params?: string;
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return SwaggerMethod({ ...meta, method: 'patch' }, swaggerInfo);
}

export function Delete(
    meta: { name?: string; description?: string; path?: string },
    swaggerInfo?: {
        query?: string;
        params?: string;
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return SwaggerMethod({ ...meta, method: 'delete' }, swaggerInfo);
}

export function Fetch(
    meta: { name?: string; description?: string; path?: string },
    swaggerInfo?: {
        query?: string;
        params?: string;
        body?: string;
        response?: string;
        header?: string;
    },
) {
    return SwaggerMethod({ ...meta, method: 'fetch' }, swaggerInfo);
}

// --- Annotation Registration Utility ---
const FILE_PATTERNS = ['.controller.ts'];

function isTargetFile(file: string) {
    return FILE_PATTERNS.some((pattern) => file.endsWith(pattern));
}

export function registerSwaggerAnnotations(
    baseDir: string = join(__dirname, '../../modules'),
) {
    const files: string[] = [];
    function scan(dir: string) {
        try {
            for (const entry of readdirSync(dir)) {
                const fullPath = join(dir, entry);
                if (statSync(fullPath).isDirectory()) {
                    scan(fullPath);
                } else if (isTargetFile(entry)) {
                    files.push(fullPath);
                }
            }
        } catch (error) {
            console.error(`Error scanning directory ${dir}:`, error);
        }
    }
    scan(baseDir);
    for (const file of files) {
        require(file);
    }
}

export function registerSwaggerAnnotationsForFiles(files: string[]) {
    for (const file of files) {
        require(file);
    }
}
