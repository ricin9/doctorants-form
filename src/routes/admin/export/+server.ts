import * as XLSX from 'xlsx';
import { getAllRegistrations } from './getRegistrations';

export async function GET() {
	const data = await getAllRegistrations.execute();

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Create a worksheet
	const worksheet = XLSX.utils.json_to_sheet(data);

	// Add the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des réinscriptions');

	// Generate file in memory (file buffer)
	const fileBuffer = XLSX.write(workbook, { type: 'buffer' });

	return new Response(fileBuffer, {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename=doctorate_reinscriptions.xlsx'
		}
	});
}
