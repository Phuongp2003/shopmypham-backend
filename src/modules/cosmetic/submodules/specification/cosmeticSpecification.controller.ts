import { Request, Response } from 'express';
import { CosmeticSpecificationService } from './cosmeticSpecification.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({
    tag: 'cosmetics/specifications',
    description: 'Quản lý đặc điểm sản phẩm',
})
export class CosmeticSpecificationController {
    @Get(
        {
            name: 'get-all-specifications',
            description: 'Lấy tất cả đặc điểm',
            path: '/',
        },
        { response: 'CosmeticSpecificationResponse' },
    )
    static async getAll(req: Request, res: Response) {
        try {
            const specs = await CosmeticSpecificationService.getAll();
            res.json(specs);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(
        {
            name: 'get-specification-by-id',
            description: 'Lấy đặc điểm theo id',
            path: '/:id',
        },
        { response: 'CosmeticSpecificationResponse' },
    )
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const spec = await CosmeticSpecificationService.getById(id);
            if (!spec)
                return res
                    .status(404)
                    .json({ message: 'Specification not found' });
            res.json(spec);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post(
        {
            name: 'create-specification',
            description: 'Tạo đặc điểm',
            path: '',
        },
        {
            body: 'CosmeticSpecificationCreateReq',
            response: 'CosmeticSpecificationResponse',
        },
    )
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const spec = await CosmeticSpecificationService.create(data);
            res.status(201).json(spec);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(
        {
            name: 'update-specification',
            description: 'Cập nhật đặc điểm',
            path: '/:id',
        },
        {
            body: 'CosmeticSpecificationUpdateReq',
            response: 'CosmeticSpecificationResponse',
        },
    )
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const spec = await CosmeticSpecificationService.update(id, data);
            if (!spec)
                return res
                    .status(404)
                    .json({ message: 'Specification not found' });
            res.json(spec);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(
        {
            name: 'delete-specification',
            description: 'Xoá đặc điểm',
            path: '/:id',
        },
        { response: 'CosmeticSpecificationResponse' },
    )
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CosmeticSpecificationService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
