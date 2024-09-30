import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Form = () => {
    const [month, setMonth] = useState('');
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [unit, setUnit] = useState('');
    const [project, setProject] = useState('');
    const [dates, setDates] = useState([]);
    const [natureOfWork, setNatureOfWork] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setMonth(selectedMonth);

        // Generate dates for the selected month
        const year = new Date().getFullYear();
        const date = new Date(year, selectedMonth, 1);
        const datesArray = [];
        const natureOfWorkArray = [];
        const descriptionsArray = [];

        while (date.getMonth() === parseInt(selectedMonth)) {
            datesArray.push(new Date(date));
            natureOfWorkArray.push('');
            descriptionsArray.push('');
            date.setDate(date.getDate() + 1);
        }

        setDates(datesArray);
        setNatureOfWork(natureOfWorkArray);
        setDescriptions(descriptionsArray);
    };

    const handleNatureOfWorkChange = (index, value) => {
        const updatedNatureOfWork = [...natureOfWork];
        updatedNatureOfWork[index] = value;
        setNatureOfWork(updatedNatureOfWork);
    };

    const handleDescriptionChange = (index, value) => {
        const updatedDescriptions = [...descriptions];
        updatedDescriptions[index] = value;
        setDescriptions(updatedDescriptions);
    };

    const handleDownload = () => {
        const workbook = XLSX.utils.book_new();
        const worksheetData = [
            ['LNP/Ag/F/012'],
            ['Agriculture Department - Monthly Itinerary'],
            [],
            ['Month', new Date(0, month).toLocaleString('default', { month: 'long' })], // Display month name
            ['Name', 'P G Samarawickrama'],
            ['Designation', 'Agriculture  Manager Technical'],
            ['Unit', unit],
            ['Project', project],
            [],
            ['Date', 'Day', 'Nature of Work', 'Description'],
            ...dates.map((date, index) => [
                date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear(), // Format date as MM/DD/YYYY
                date.toLocaleString('default', { weekday: 'long' }), 
                natureOfWork[index], 
                descriptions[index]
            ])
        ];
    
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    
        // Set column widths
        const wscols = [
            { wch: 20 }, // Date
            { wch: 10 }, // Day
            { wch: 30 }, // Nature of Work
            { wch: 50 }  // Description
        ];
        worksheet['!cols'] = wscols;
    
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'Monthly_Itinerary.xlsx');
    };
    

    return (
        <div className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold">Monthly Itinerary Form</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="month" className="block text-gray-700">Select Month:</label>
                    <select 
                        id="month" 
                        className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        value={month} 
                        onChange={handleMonthChange}
                    >
                        <option value="">Select Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
                        ))}
                    </select>
                </div>


                <div className="mb-4">
                    <label htmlFor="unit" className="block text-gray-700">Unit:</label>
                    <input 
                        id="unit" 
                        type="text" 
                        className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        value={unit} 
                        onChange={(e) => setUnit(e.target.value)} 
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="project" className="block text-gray-700">Project:</label>
                    <input 
                        id="project" 
                        type="text" 
                        className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                        value={project} 
                        onChange={(e) => setProject(e.target.value)} 
                    />
                </div>

                <div>
                    <h3 className="mt-4 text-lg font-semibold">Dates:</h3>
                    {dates.map((date, index) => (
                        <div key={index} className="mb-4">
                            <p className="mb-1 text-gray-700">Date: {date.toLocaleDateString()}</p>
                            <input 
                                type="text" 
                                placeholder="Nature of Work" 
                                className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={natureOfWork[index]} 
                                onChange={(e) => handleNatureOfWorkChange(index, e.target.value)} 
                            />
                            <input 
                                type="text" 
                                placeholder="Description" 
                                className="block w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                                value={descriptions[index]} 
                                onChange={(e) => handleDescriptionChange(index, e.target.value)} 
                            />
                        </div>
                    ))}
                </div>

                <button 
                    onClick={handleDownload} 
                    className="block w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Download as Excel
                </button>
            </form>
        </div>
    );
};

export default Form;

