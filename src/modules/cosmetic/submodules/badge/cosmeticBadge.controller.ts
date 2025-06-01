import { Request, Response } from 'express';
import { CosmeticBadgeService } from './cosmeticBadge.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({
    tag: 'cosmetics/badges',
    description: 'Quản lý huy hiệu tin cậy',
})
export class CosmeticBadgeController {
    @Get(
        {
            name: 'get-all-badges',
            description: 'Lấy tất cả huy hiệu',
            path: '/',
        },
        { response: 'CosmeticBadgeResponse' },
    )
    static async getAll(req: Request, res: Response) {
        try {
            const badges = await CosmeticBadgeService.getAll();
            res.json(badges);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(
        {
            name: 'get-badge-by-id',
            description: 'Lấy huy hiệu theo id',
            path: '/:id',
        },
        { response: 'CosmeticBadgeResponse' },
    )
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const badge = await CosmeticBadgeService.getById(id);
            if (!badge)
                return res.status(404).json({ message: 'Badge not found' });
            res.json(badge);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post(
        {
            name: 'create-badge',
            description: 'Tạo huy hiệu',
            path: '',
        },
        { body: 'CosmeticBadgeCreateReq', response: 'CosmeticBadgeResponse' },
    )
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const badge = await CosmeticBadgeService.create(data);
            res.status(201).json(badge);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(
        {
            name: 'update-badge',
            description: 'Cập nhật huy hiệu',
            path: '/:id',
        },
        { body: 'CosmeticBadgeUpdateReq', response: 'CosmeticBadgeResponse' },
    )
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const badge = await CosmeticBadgeService.update(id, data);
            if (!badge)
                return res.status(404).json({ message: 'Badge not found' });
            res.json(badge);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(
        {
            name: 'delete-badge',
            description: 'Xoá huy hiệu',
            path: '/:id',
        },
        { response: 'CosmeticBadgeResponse' },
    )
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CosmeticBadgeService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
