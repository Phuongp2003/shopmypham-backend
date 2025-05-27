import { Request, Response } from "express";

import { HttpStatus } from "@/common/enums/http-status.enum";
import { HttpException } from "@/common/exceptions/http.exception";
import { ErrorResponse } from "@/common/interfaces/error-response.interface";

import { CosmeticService } from "./cosmetic.service";
import {
  CosmeticCreateInput,
  CosmeticQueryParams,
  CosmeticUpdateInput,
} from "./cosmetic.types";

import { SwaggerController, Get } from "@/common/annotation/swagger.annotation";

@SwaggerController({ tag: "Cosmetic", description: "Quản lý mỹ phẩm" })
export class CosmeticController {
  @Get(
    {
      name: "get-cosmetics",
      description: "Trả về danh sách mỹ phẩm với filter, sort, phân trang",
      path: "/cosmetics"
    },
    {
      query: "CosmeticQueryParams",
      response: "PaginatedCosmeticResponse"
    }
  )
  static async getCosmetics(req: Request, res: Response): Promise<void> {
    try {
      const params: CosmeticQueryParams = req.query;
      const result = await CosmeticService.getCosmetics(params);
      res.json(result);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status:
          error instanceof HttpException
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  static async getCosmeticById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cosmetic = await CosmeticService.getCosmeticById(id);
      res.json(cosmetic);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status:
          error instanceof HttpException
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  static async createCosmetic(req: Request, res: Response): Promise<void> {
    try {
      const data: CosmeticCreateInput = req.body;
      const cosmetic = await CosmeticService.createCosmetic(data);
      res.status(HttpStatus.CREATED).json(cosmetic);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status:
          error instanceof HttpException
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  static async updateCosmetic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: CosmeticUpdateInput = req.body;
      const cosmetic = await CosmeticService.updateCosmetic(id, data);
      res.json(cosmetic);
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status:
          error instanceof HttpException
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }

  static async deleteCosmetic(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CosmeticService.deleteCosmetic(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error: unknown) {
      const errorResponse: ErrorResponse = {
        status:
          error instanceof HttpException
            ? error.status
            : HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          error instanceof Error ? error.message : "Internal server error",
      };
      res.status(errorResponse.status).json(errorResponse);
    }
  }
}
