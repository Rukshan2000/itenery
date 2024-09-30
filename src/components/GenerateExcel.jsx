import React from 'react';
import * as XLSX from 'xlsx';

const GenerateExcel = () => {
    const handleExport = () => {
        // Sample data
        const data = [
            { name: 'John', age: 28, city: 'New York' },
            { name: 'Jane', age: 22, city: 'San Francisco' },
            { name: 'Peter', age: 32, city: 'Boston' },
        ];

        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Create a Blob and download the file
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <button onClick={handleExport}>Export to Excel</button>
        </div>
    );
};

export default GenerateExcel;
