import fs from 'fs/promises';
import { UPLOADED_FILE_DEST } from '$env/static/private';
import JSZip from 'jszip';

// Define the directory you want to archive and the output file path
const SOURCE_DIR = UPLOADED_FILE_DEST;

export async function GET() {
	const zip = new JSZip();
	const files = await fs.readdir(SOURCE_DIR);

	// read all files and add them to the zip
	for (const file of files) {
		const filePath = `${SOURCE_DIR}/${file}`;
		const stats = await fs.stat(filePath);
		const ext = file.split('.').pop();
		const valid =
			stats.isFile() &&
			(file.startsWith('recu') || file.startsWith('reinscription')) && // only demande and recu files
			ext && // no files without extension
			['jpg', 'jpeg', 'png', 'pdf'].includes(ext); // only images and pdfs
		if (valid) {
			const fileContent = await fs.readFile(filePath);
			zip.file(file, fileContent);
		}
	}

	const archiveBuffer = await zip.generateAsync({
		type: 'nodebuffer',
		compressionOptions: { level: 9 }
	});

	return new Response(archiveBuffer, {
		headers: {
			'Content-Type': 'application/zip',
			'Content-Disposition': 'attachment; filename=archive.zip'
		}
	});
}
