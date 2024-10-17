import React from 'react';
import html2pdf from 'html2pdf.js';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const PolicyDocument = () => {
  const generatePDF = () => {
    const element = document.getElementById('pdfContent');

    // Options for html2pdf
    const opt = {
      margin: 0,
      filename: 'policy_document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="shadow-div p-6 m-2">
      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudDownloadIcon style={{ fontSize: '1.2rem' }} />} // Adjust size here
          onClick={generatePDF}
          style={{ textTransform: 'none', padding: '10px 20px' }} // Adjust padding for better appearance
        >
          Download Policy Document
        </Button>
      </div>
    
 
 
    </div>
  );
};

export default PolicyDocument;
