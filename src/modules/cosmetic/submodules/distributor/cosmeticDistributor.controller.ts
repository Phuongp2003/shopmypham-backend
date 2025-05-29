import { Request, Response } from 'express';
import { CosmeticDistributorService } from './cosmeticDistributor.service';
import {
    Delete,
    Get,
    Post,
    Put,
    Controller,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({
    tag: 'CosmeticDistributor',
    description: 'Quản lý nhà phân phối',
})
export class CosmeticDistributorController {
    @Get(
        {
            name: 'get-all-distributors',
            description: 'Lấy tất cả nhà phân phối',
            path: '/cosmetics/distributors',
        },
        {
            query: 'CosmeticDistributorQueryParams',
            response: 'PaginatedCosmeticDistributorResponse',
        },
    )
    static async getAll(req: Request, res: Response) {
        try {
            const distributors = await CosmeticDistributorService.getAll();
            res.json(distributors);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get(
        {
            name: 'get-distributor-by-id',
            description: 'Lấy nhà phân phối theo id',
            path: '/cosmetics/distributors/:id',
        },
        {
            query: 'CosmeticDistributorQueryParams',
            response: 'CosmeticDistributorResponse',
        },
    )
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.query;
            const distributor = await CosmeticDistributorService.getById(
                id as string,
            );
            if (!distributor) {
                return res
                    .status(404)
                    .json({ message: 'Distributor not found' });
            }
            res.json(distributor);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post(
        {
            name: 'create-distributor',
            description: 'Tạo nhà phân phối',
            path: '/cosmetics/distributors',
        },
        {
            header: 'Authorization',
            body: 'CosmeticDistributorCreateReq',
            response: 'CosmeticDistributorResponse',
        },
    )
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const distributor = await CosmeticDistributorService.create(data);
            res.status(201).json(distributor);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put(
        {
            name: 'update-distributor',
            description: 'Cập nhật nhà phân phối',
            path: '/cosmetics/distributors/:id',
        },
        {
            body: 'CosmeticDistributorUpdateReq',
            response: 'CosmeticDistributor',
        },
    )
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.query;
            const data = req.body;
            const distributor = await CosmeticDistributorService.update(
                id as string,
                data,
            );
            if (!distributor) {
                return res
                    .status(404)
                    .json({ message: 'Distributor not found' });
            }
            res.json(distributor);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete(
        {
            name: 'delete-distributor',
            description: 'Xóa nhà phân phối',
            path: '/cosmetics/distributors/:id',
        },
        {
            response: 'CosmeticDistributorResponse',
        },
    )
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.query;
            await CosmeticDistributorService.delete(id as string);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
