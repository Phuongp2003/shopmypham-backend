/**
 * @swagger
 * type: object
 * properties:
 *   name:
 *     type: string
 *     description: Tên nhà phân phối
 *   address:
 *     type: string
 *     description: Địa chỉ
 *   phone:
 *     type: string
 *     description: Số điện thoại
 *   email:
 *     type: string
 *     description: Email
 */
export type CosmeticDistributorCreateReq = {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
};

/**
 * @swagger
 * type: object
 * properties:
 *   name:
 *     type: string
 *   address:
 *     type: string
 *   phone:
 *     type: string
 *   email:
 *     type: string
 */
export type CosmeticDistributorUpdateReq =
    Partial<CosmeticDistributorCreateReq>;
