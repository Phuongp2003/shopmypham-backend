import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './types/user.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  findAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.findAll();
      res.json(users);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  findById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      res.json(user);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const dto: CreateUserDTO = req.body;
      const user = await this.userService.create(dto);
      res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dto: UpdateUserDTO = req.body;
      const user = await this.userService.update(id, dto);
      res.json(user);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  getMe = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const user = await this.userService.findById(req.user.id);
      res.json(user);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  updateMe = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const dto: UpdateUserDTO = req.body;
      const user = await this.userService.update(req.user.id, dto);
      res.json(user);
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };

  deleteMe = async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      await this.userService.delete(req.user.id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    }
  };
} 
