import { Request, Response } from 'express';
import { AddressService } from './address.service';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
export class AddressController {
  static async getAll(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const addresses = await AddressService.getAll(userId);
      res.json(addresses);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const { id } = req.params;
      const address = await AddressService.getById(userId, id);
      if (!address) return res.status(HttpStatus.NOT_FOUND).json({ message: 'Address not found' });
      res.json(address);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const address = await AddressService.create(userId, req.body);
      res.status(HttpStatus.CREATED).json(address);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const { id } = req.params;
      const address = await AddressService.update(userId, id, req.body);
      res.json(address);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not authenticated');
      }
      const userId = req.user.id;
      const { id } = req.params;
      await AddressService.delete(userId, id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  }
} 
