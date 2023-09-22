import * as XLSX from 'xlsx';
import { getAllRegistrations } from './getRegistrations';
import path from 'path';
import fs from 'fs';

export async function GET() {
	const data = await getAllRegistrations.execute();

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Create a worksheet
	const worksheet = XLSX.utils.json_to_sheet(data);

	// Add the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

	// Generate and save to /tmp the XLSX file
	XLSX.writeFile(workbook, '/tmp/doctorate_reinscriptions.xlsx');

	console.log("XLSX file 'doctorate_reinscriptions.xlsx' has been created.");

	// send file to the client
	const filePath = path.resolve('/tmp/example.xlsx');
	const fileStream = await fs.promises.readFile(filePath);
	const fileBuffer = Buffer.from(fileStream);

	// delete file
	return new Response(fileBuffer, {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename=doctorate_reinscriptions.xlsx'
		}
	});
}
