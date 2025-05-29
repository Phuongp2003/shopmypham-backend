import { Request, Response } from 'express';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import {
	CreateUserReq,
	UpdateUserReq,
	type ChangePasswordReq,
} from './user.dto';
import { UserService } from './user.service';

export class UserController {
	static async findAll(req: Request, res: Response) {
		try {
			const users = await UserService.findAll();
			res.json(users);
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async findById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await UserService.findById(id);
			res.json(user);
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async create(req: Request, res: Response) {
		try {
			const dto: CreateUserReq = req.body;
			const user = await UserService.create(dto);
			res.status(HttpStatus.CREATED).json(user);
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async update(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const dto: UpdateUserReq = req.body;
			const user = await UserService.update(id, dto);
			res.json(user);
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await UserService.delete(id);
			res.status(HttpStatus.NO_CONTENT).send();
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async getMe(req: Request, res: Response) {
		try {
			if (!req.user) {
				throw new HttpException(
					HttpStatus.UNAUTHORIZED,
					'User not authenticated'
				);
			}
			const user = await UserService.findById(req.user.id);
			res.json(user);
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async updateMe(req: Request, res: Response) {
		try {
			if (!req.user) {
				throw new HttpException(
					HttpStatus.UNAUTHORIZED,
					'User not authenticated'
				);
			}
			const dto: UpdateUserReq = req.body;
			const user = await UserService.update(req.user.id, dto);
			res.json(user);
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async deleteMe(req: Request, res: Response) {
		try {
			if (!req.user) {
				throw new HttpException(
					HttpStatus.UNAUTHORIZED,
					'User not authenticated'
				);
			}
			await UserService.delete(req.user.id);
			res.status(HttpStatus.NO_CONTENT).send();
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Internal server error',
				});
			}
		}
	}

	static async changePassword(req: Request, res: Response) {
		try {
			if (!req.user) {
				throw new HttpException(
					HttpStatus.UNAUTHORIZED,
					'Người dùng không được xác thực'
				);
			}
			const dto: ChangePasswordReq = req.body;
			await UserService.changePassword(req.user.id, dto);
			res.status(HttpStatus.NO_CONTENT).send();
		} catch (error) {
			if (error instanceof HttpException) {
				res.status(error.status).json({ message: error.message });
			} else {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					message: 'Lỗi máy chủ nội bộ',
				});
			}
		}
	}

  static async unlinkGoogleAccount(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(
          HttpStatus.UNAUTHORIZED,
          'User not authenticated'
        );
      }
      await UserService.unlinkGoogleAccount(req.user.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Internal server error',
        });
      }
    }
  }
  
}
