import { Request, Response } from 'express';
import { CosmeticVariantService } from './cosmeticVariant.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({ tag: 'cosmetics/variants', description: 'Quản lý biến thể mỹ phẩm' })
export class CosmeticVariantController {
    @Get(
        {
            name: 'get-all-variants',
            description: 'Lấy tất cả biến thể',
            path: '/',
        },
        { response: 'CosmeticVariantResponse' },
    )
    static async getAll(req: Request, res: Response) {
        try {
            const variants = await CosmeticVariantService.getAll();
            res.json(variants);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(
        {
            name: 'get-variant-by-id',
            description: 'Lấy biến thể theo id',
            path: '/:id',
        },
        { response: 'CosmeticVariantResponse' },
    )
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const variant = await CosmeticVariantService.getById(id);
            if (!variant)
                return res.status(404).json({ message: 'Variant not found' });
            res.json(variant);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post(
        {
            name: 'create-variant',
            description: 'Tạo biến thể',
            path: '',
        },
        {
            body: 'CosmeticVariantCreateReq',
            response: 'CosmeticVariantResponse',
        },
    )
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const variant = await CosmeticVariantService.create(data);
            res.status(201).json(variant);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(
        {
            name: 'update-variant',
            description: 'Cập nhật biến thể',
            path: '/:id',
        },
        {
            body: 'CosmeticVariantUpdateReq',
            response: 'CosmeticVariantResponse',
        },
    )
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const variant = await CosmeticVariantService.update(id, data);
            if (!variant)
                return res.status(404).json({ message: 'Variant not found' });
            res.json(variant);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(
        {
            name: 'delete-variant',
            description: 'Xoá biến thể',
            path: '/:id',
        },
        { response: 'CosmeticVariantResponse' },
    )
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CosmeticVariantService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
