import { Request } from 'express';

import { User } from '@prisma/client';

import { UserRole } from '../enums/user-role.enum';

declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            name: string;
            role: UserRole;
        }
        interface Request {
            user?: User;
        }
    }
}

export interface AuthenticatedRequest extends Request {
    user: User;
}
