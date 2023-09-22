import * as XLSX from 'xlsx';
import { getAllRegistrations } from './getRegistrations';

export async function load() {
	const data = await getAllRegistrations.execute();

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Create a worksheet
	const worksheet = XLSX.utils.json_to_sheet(data);

	// Add the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

	// Generate the XLSX file
	XLSX.writeFile(workbook, 'example.xlsx');
	// TODO : send the file to the client

	console.log("XLSX file 'example.xlsx' has been created.");
}
