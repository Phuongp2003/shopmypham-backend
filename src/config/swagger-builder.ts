export class SwaggerBuilder {
  private swagger: any = {
    paths: {},
    components: {
      schemas: {},
    },
    tags: [],
  };

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

  addSchema(name: string, schema: any): SwaggerBuilder {
    this.swagger.components.schemas[name] = schema;
    return this;
  }

  build(): any {
    return this.swagger;
  }
}
