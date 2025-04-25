import { Request, Response } from 'express';
import { CosmeticService } from './cosmetic.service';
import { CosmeticQueryParams, CosmeticCreateInput, CosmeticUpdateInput } from './cosmetic.types';
import { HttpException } from '@/common/exceptions/http.exception';
import { HttpStatus } from '@/common/enums/http-status.enum';
import { ErrorResponse } from '@/common/interfaces/error-response.interface';

export class CosmeticController {
  private cosmeticService: CosmeticService;

  constructor() {
    this.cosmeticService = new CosmeticService();
  }

  async getCosmetics(req: Request, res: Response): Promise<void> {
    try {
      const params: CosmeticQueryParams = req.query;
      const result = await this.cosmeticService.getCosmetics(params);
      res.json(result);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Internal server error'
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  async getCosmeticById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cosmetic = await this.cosmeticService.getCosmeticById(id);
      res.json(cosmetic);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Internal server error'
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  async createCosmetic(req: Request, res: Response): Promise<void> {
    try {
      const data: CosmeticCreateInput = req.body;
      const cosmetic = await this.cosmeticService.createCosmetic(data);
      res.status(HttpStatus.CREATED).json(cosmetic);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Internal server error'
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  async updateCosmetic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: CosmeticUpdateInput = req.body;
      const cosmetic = await this.cosmeticService.updateCosmetic(id, data);
      res.json(cosmetic);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Internal server error'
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  async deleteCosmetic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.cosmeticService.deleteCosmetic(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status: error instanceof HttpException ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
        message: error instanceof Error ? error.message : 'Internal server error'
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }
} 
