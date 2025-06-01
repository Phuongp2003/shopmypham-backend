/**
 * @swagger
 * title: UploadImageBody
 * type: object
 * properties:
 *   image:
 *     type: string
 *     format: binary
 *     description: File ảnh upload
 */
export interface UploadImageBody {
  image: string;
}

/**
 * @swagger
 * title: UploadResponse
 * type: object
 * properties:
 *   asset_id:
 *     type: string
 *     description: Unique asset ID (timestamp)
 *   public_id:
 *     type: string
 *     description: Public file name
 *   version:
 *     type: integer
 *     description: Version (timestamp)
 *   version_id:
 *     type: string
 *     description: Version ID (timestamp)
 *   signature:
 *     type: string
 *     description: Signature (empty)
 *   width:
 *     type: integer
 *     nullable: true
 *     description: Image width
 *   height:
 *     type: integer
 *     nullable: true
 *     description: Image height
 *   format:
 *     type: string
 *     description: File format (extension)
 *   resource_type:
 *     type: string
 *     description: Resource type (image)
 *   created_at:
 *     type: string
 *     description: ISO date string
 *   tags:
 *     type: array
 *     items:
 *       type: string
 *     description: Tags (empty)
 *   bytes:
 *     type: integer
 *     description: File size in bytes
 *   type:
 *     type: string
 *     description: Upload type
 *   etag:
 *     type: string
 *     description: ETag (empty)
 *   placeholder:
 *     type: boolean
 *     description: Placeholder (false)
 *   url:
 *     type: string
 *     description: Public URL
 *   secure_url:
 *     type: string
 *     description: Secure URL
 *   original_filename:
 *     type: string
 *     description: Original file name
 */
export interface UploadResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number | null;
  height: number | null;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
} 
