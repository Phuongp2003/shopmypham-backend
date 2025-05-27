import 'reflect-metadata';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// --- Annotation Decorators ---
export function SwaggerController(options: {
	tag: string;
	description?: string;
}) {
	return function (target: Function) {
		Reflect.defineMetadata('swagger:controller', options, target);
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
		params?: string;
		body?: string;
		response?: string;
	}
) {
	return function (
		target: any,
		propertyKey: string,
		descriptor: PropertyDescriptor
	) {
		Reflect.defineMetadata(
			'swagger:method',
			{ ...meta, ...swaggerInfo },
			target,
			propertyKey
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
	}
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
	}
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
	}
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
	}
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
	}
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
	}
) {
	return SwaggerMethod({ ...meta, method: 'fetch' }, swaggerInfo);
}

// --- Annotation Registration Utility ---
const FILE_PATTERNS = ['.controller.ts'];

function isTargetFile(file: string) {
	return FILE_PATTERNS.some((pattern) => file.endsWith(pattern));
}

export function registerSwaggerAnnotations(
	baseDir: string = join(__dirname, '../../modules')
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
