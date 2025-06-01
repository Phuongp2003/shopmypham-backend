import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { UploadResponse } from './upload.types';
import { Controller, Post, RequireHeader, FileBody } from '@/common/annotation/swagger.annotation';

@Controller({ tag: 'File Upload', description: 'Quản lý upload file', path: '/upload' })
export class UploadController {
  @Post(
    {
      name: 'upload-image',
      description: 'Upload an image file',
      path: '/',
    },
    {
      response: 'UploadResponse',
    },
  )
  @FileBody('image')
  @RequireHeader()
  static async uploadImage(req: Request, res: Response): Promise<void> {
    const file = (req as any).file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Sanitize the file name
    const sanitizedFileName = file.originalname
      .replace(/\s/g, '_') // Replace spaces with underscores
      .replace(/[^a-zA-Z0-9_.-]/g, ''); // Remove invalid characters

    // Rename the file with the sanitized name
    const timestamp = Date.now();
    const newFileName = `${timestamp}_${sanitizedFileName}`;
    const newFilePath = path.join(file.destination, newFileName);

    // Rename the file on the filesystem
    fs.renameSync(file.path, newFilePath);

    const image = sharp(newFilePath);
    const metadata = await image.metadata();

    // Return the public URL of the image
    const imageUrl = `/images/${newFileName}`;
    const secureUrl = `${process.env.BACKEND_URL}${imageUrl}`;

    const response: UploadResponse = {
      asset_id: timestamp.toString(),
      public_id: newFileName,
      version: timestamp,
      version_id: timestamp.toString(),
      signature: '',
      width: metadata.width || null,
      height: metadata.height || null,
      format: path.extname(newFileName).substring(1),
      resource_type: 'image',
      created_at: new Date().toISOString(),
      tags: [],
      bytes: file.size,
      type: 'upload',
      etag: '',
      placeholder: false,
      url: secureUrl,
      secure_url: secureUrl,
      original_filename: file.originalname,
    };

    res.json(response);
  }
} 
