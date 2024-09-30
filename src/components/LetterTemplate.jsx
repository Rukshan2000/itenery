import React from 'react';
import { useReactToPrint } from 'react-to-print';

const LetterTemplate = ({ title, recipientAddress, employeeName, dateOfAuthorized, dateOfEnforcement, dateOfRetire, signatoryName, signatoryPosition, specialNotes }) => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });



  const handleDownloadPDF = () => {
    handlePrint();
    // Adjust the timeout based on the time it takes for the letter to render
    setTimeout(() => {
      const pdfElement = document.getElementsByClassName('react-pdf__Document')[0];
      if (pdfElement) {
        const pdfData = pdfElement.outerHTML;
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${employeeName}_service_certificate.pdf`; // Dynamic filename
        link.click();
      }
    }, 2000); // Adjust the timeout as needed
  };
  return (
    <div>
      <div
        ref={componentRef}
        className="max-w-full px-6 py-8 mx-auto my-8 bg-white"
        style={{ width: '180mm', fontFamily: 'Times New Roman, Times, serif' }}
      >
        {/* Recipient Information */}
        <div className="mb-6">
          {/* Displaying recipient address lines */}
          {recipientAddress.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {/* Service Certificate */}
        <div className="mb-6">
          <p className="font-bold underline">Service Certificate</p>
          <p className='font-bold underline'>{title}.{employeeName} - Authorized Officer</p>
          <p className='mt-5 text-justify'>This refers to the request made by the above officer and you are kindly informed that{title}.{employeeName} served as the Enforcement Officer from {dateOfEnforcement} and has been working as an Authorized Officer since {dateOfAuthorized} of the Department of Immigration and Emigration. This post is permanent and pensionable and he is scheduled to retire on {dateOfRetire}.</p>
        </div>
        {/* Special Notes */}
        {specialNotes.length > 1 && (
          <div className="mb-6">
            {specialNotes.map((note, index) => (
              <p className='text-justify' key={index}>{(index + 2).toString().padStart(2, '0')}. {note}</p>
            ))}
          </div>
        )}



        {/* Signature */}
        <div>
          <p className='font-bold'>{signatoryName},</p>
          <p>{signatoryPosition},</p>
          <p>For Controller General of Immigration and Emigration.</p>
        </div>
      </div>

      {/* Centered Button for Downloading as PDF */}
      <div className="flex justify-center mt-4">
        <button onClick={handleDownloadPDF} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default LetterTemplate;
