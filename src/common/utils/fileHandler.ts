import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import fs from 'fs';

export const IMAGE_DIR = 'uploads/images'; 

// Configure multer to save files
const storage: StorageEngine = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	) => {
		// Ensure directory exists
		if (!fs.existsSync(IMAGE_DIR)) {
			fs.mkdirSync(IMAGE_DIR, { recursive: true });
		}
		cb(null, IMAGE_DIR);
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void
	) => {
		const timestamp = Date.now();
		const originalName = file.originalname.replace(/\s/g, '_');
		cb(null, `${timestamp}_${originalName}`);
	},
});

export const upload = multer({ storage });
