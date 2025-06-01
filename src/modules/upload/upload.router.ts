import express, { Request, Response } from 'express';
import { upload } from '@/common/utils/fileHandler';
import { UploadController } from './upload.controller';

const router = express.Router();

router.post(
	'/',
	upload.single('image'),
	UploadController.uploadImage
);

export default router;
