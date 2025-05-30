import { Request, Response } from 'express';

import { HttpStatus } from '@/common/enums/http-status.enum';
import { HttpException } from '@/common/exceptions/http.exception';
import { ErrorResponse } from '@/common/interfaces/error-response.interface';

import { CosmeticService } from './cosmetic.service';
import {
    CosmeticCreateReq,
    CosmeticQueryParams,
    CosmeticUpdateReq,
    CosmeticRes,
    PaginatedCosmeticRes,
    EnhancedCosmeticDetailRes,
} from './cosmetic.dto';

import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({ tag: 'Cosmetics', description: 'Quản lý mỹ phẩm' })
export class CosmeticController {
    @Get(
        {
            name: 'get-cosmetics',
            description:
                'Trả về danh sách mỹ phẩm với filter, sort, phân trang',
            path: '/',
        },
        {
            query: 'CosmeticQueryParams',
            response: 'PaginatedCosmeticRes',
        },
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
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Get(
        {
            name: 'get-cosmetic-by-id',
            description: 'Lấy chi tiết mỹ phẩm theo ID',
            path: '/:id',
        },
        {
            response: 'EnhancedCosmeticDetailRes',
        },
    )
    static async getCosmeticById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(HttpStatus.BAD_REQUEST).json({
                    message: "Missing or invalid 'id' parameter",
                });
                return;
            }

            const cosmetic = await CosmeticService.getCosmeticById(id);
            res.json(cosmetic);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Post(
        {
            name: 'create-cosmetic',
            description: 'Tạo mới mỹ phẩm',
            path: '/',
        },
        {
            body: 'CosmeticCreateReq',
            response: 'CosmeticRes',
        },
    )
    @RequireHeader()
    static async createCosmetic(req: Request, res: Response): Promise<void> {
        try {
            const data: CosmeticCreateReq = req.body;
            const cosmetic = await CosmeticService.createCosmetic(data);
            res.status(HttpStatus.CREATED).json(cosmetic);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Put(
        {
            name: 'update-cosmetic',
            description: 'Cập nhật thông tin mỹ phẩm',
            path: '/:id',
        },
        {
            body: 'CosmeticUpdateReq',
            response: 'CosmeticRes',
        },
    )
    @RequireHeader()
    static async updateCosmetic(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const data: CosmeticUpdateReq = req.body;
            const cosmetic = await CosmeticService.updateCosmetic(id, data);
            res.json(cosmetic);
        } catch (error: unknown) {
            const errorResponse: ErrorResponse = {
                status:
                    error instanceof HttpException
                        ? error.status
                        : HttpStatus.INTERNAL_SERVER_ERROR,
                message:
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }

    @Delete(
        {
            name: 'delete-cosmetic',
            description: 'Xoá mỹ phẩm theo ID',
            path: '/:id',
        },
        {
            // params auto-detected from path - no need to specify
        },
    )
    @RequireHeader()
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
                    error instanceof Error
                        ? error.message
                        : 'Internal server error',
            };
            res.status(errorResponse.status).json(errorResponse);
        }
    }
}
