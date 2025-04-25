import { UserRole } from '../enums/user-role.enum';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      role: UserRole;
    }
  }
} 
