import { Request, Response } from 'express';
import { ShippingPolicyService } from './shippingPolicy.service';
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    RequireHeader,
} from '@/common/annotation/swagger.annotation';

@Controller({
    tag: 'cosmetics/shipping-policies',
    description: 'Quản lý chính sách vận chuyển',
})
export class ShippingPolicyController {
    @Get({
        name: 'get-all-shipping-policies',
        description: 'Lấy tất cả chính sách vận chuyển',
        path: '/',
    }, { response: 'ShippingPolicyResponse' })
    static async getAll(req: Request, res: Response) {
        try {
            const policies = await ShippingPolicyService.getAll();
            res.json(policies);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Get({
        name: 'get-shipping-policy-by-id',
        description: 'Lấy chính sách vận chuyển theo id',
        path: '/:id',
    }, { response: 'ShippingPolicyResponse' })
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const policy = await ShippingPolicyService.getById(id);
            if (!policy)
                return res.status(404).json({ message: 'Shipping policy not found' });
            res.json(policy);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Post({
        name: 'create-shipping-policy',
        description: 'Tạo chính sách vận chuyển',
        path: '',
    }, { body: 'ShippingPolicyCreateReq', response: 'ShippingPolicyResponse' })
    @RequireHeader()
    static async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const policy = await ShippingPolicyService.create(data);
            res.status(201).json(policy);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Put({
        name: 'update-shipping-policy',
        description: 'Cập nhật chính sách vận chuyển',
        path: '/:id',
    }, { body: 'ShippingPolicyUpdateReq', response: 'ShippingPolicyResponse' })
    @RequireHeader()
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const policy = await ShippingPolicyService.update(id, data);
            if (!policy)
                return res.status(404).json({ message: 'Shipping policy not found' });
            res.json(policy);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Delete({
        name: 'delete-shipping-policy',
        description: 'Xoá chính sách vận chuyển',
        path: '/:id',
    }, { response: 'ShippingPolicyResponse' })
    @RequireHeader()
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ShippingPolicyService.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
} 
