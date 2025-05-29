import { z } from 'zod';

import {
    PostCreateInput,
    PostQueryParams,
    PostUpdateInput,
} from './post.types';

export const postQueryParamsSchema = z.object({
    search: z.string().optional(),
    sortBy: z.enum(['createdAt', 'title']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().optional(),
    published: z.boolean().optional(),
}) satisfies z.ZodType<PostQueryParams>;

export const postCreateSchema = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    published: z.boolean().optional(),
}) satisfies z.ZodType<PostCreateInput>;

export const postUpdateSchema =
    postCreateSchema.partial() satisfies z.ZodType<PostUpdateInput>;
