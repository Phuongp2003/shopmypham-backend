import { Request, Response } from 'express';
import { CosmeticOptionService } from './cosmesticOptions.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({
    tag: 'CosmeticOption',
    description: 'Quản lý tuỳ chọn thuộc tính mỹ phẩm',
})
export class CosmeticOptionController {
    @Get(
        {
            name: 'get-all-options',
            description: 'Lấy tất cả tuỳ chọn',
            path: '/cosmetics/options',
        },
        { response: 'CosmeticOptionResponse' },
    )
    static async getAll(req: Request, res: Response) {
        try {
            const options = await CosmeticOptionService.getAll();
            res.json(options);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(
        {
            name: 'get-option-by-id',
            description: 'Lấy tuỳ chọn theo id',
            path: '/cosmetics/options/:id',
        },
        { response: 'CosmeticOptionResponse' },
    )
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const option = await CosmeticOptionService.getById(id);
            if (!option)
                return res.status(404).json({ message: 'Option not found' });
            res.json(option);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post(
        {
            name: 'create-option',
            description: 'Tạo tuỳ chọn',
            path: '/cosmetics/options',
        },
        { body: 'CosmeticOptionCreateReq', response: 'CosmeticOptionResponse' },
    )
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const option = await CosmeticOptionService.create(data);
            res.status(201).json(option);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(
        {
            name: 'update-option',
            description: 'Cập nhật tuỳ chọn',
            path: '/cosmetics/options/:id',
        },
        { body: 'CosmeticOptionUpdateReq', response: 'CosmeticOptionResponse' },
    )
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const option = await CosmeticOptionService.update(id, data);
            if (!option)
                return res.status(404).json({ message: 'Option not found' });
            res.json(option);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(
        {
            name: 'delete-option',
            description: 'Xoá tuỳ chọn',
            path: '/cosmetics/options/:id',
        },
        { response: 'CosmeticOptionResponse' },
    )
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await CosmeticOptionService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
