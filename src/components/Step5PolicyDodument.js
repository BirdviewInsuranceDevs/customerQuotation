import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Button  } from '@mui/material';
import axios from 'axios';

const Step5PolicyDodument = ({processState,buttonName,setCheckMailDelivery,setLoaderIcon,holderEmail} ) => {
  const [recipientEmail, setRecipientEmail] = useState(holderEmail);
  const [responseMessage, setResponseMessage] = useState(''); // State to hold the response message
  const [errorMessage, setErrorMessage] = useState(''); // State to hold the error message
   
  const generatePDF = async (processingType) => {
    const doc = new jsPDF();

    // Use a valid image URL (adjust the path as necessary)
    const imgUrl = '/images/logo.jpeg'; // Adjust this path to your actual image

    // Load the image from URL
    const img = new Image();
    img.src = imgUrl;

   
      // Page 1: Cover Page
      const imgWidth = 50; // Desired width
      const imgHeight = 20; // Desired height
      doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height

      // Title
      doc.setFontSize(24);
      doc.text('INDIVIDUAL POLICY', 105, 60, { align: 'center' });

      // Company Information
      doc.setFontSize(20);
      doc.text('BIRDVIEW MICROINSURANCE LIMITED', 105, 80, { align: 'center' });
                      
      // Policy Details
      doc.setFontSize(16);
      doc.text('Policy Number: ABCXXXXXXXXX', 105, 100, { align: 'center' });
      doc.text('Individual Name: XXXXXXXXXX', 105, 120, { align: 'center' });
      doc.text('Insurance Policy', 105, 150, { align: 'center' });

      // Company Address
      doc.setFontSize(12);
      const addressY = 240; // Start position for the address
      doc.text('Physical Address', 105, addressY, { align: 'center' });
      doc.text('P.O. Box 45157, 00200', 105, addressY + 10, { align: 'center' });
      doc.text('Nairobi, Kenya', 105, addressY + 20, { align: 'center' });
      doc.text('Telephone: +254 742 222 888', 105, addressY + 30, { align: 'center' });
      doc.text('Email: customerservice@birdviewinsurance.com', 105, addressY + 40, { align: 'center' });
      doc.text('Ground Floor, Fidelity Center, Waiyaki Way, Westlands, Nairobi, Kenya', 105, addressY + 50, { align: 'center' });


      // Move to next page
      doc.addPage();

      // Page 2: Table of Contents
      doc.setFontSize(12);
      doc.text('TABLE OF CONTENTS', 105, 20, { align: 'center' });
      doc.setFontSize(11);

      const contents = [
        { title: 'Preamble' },
        { title: 'Policy Data Page' },
        { title: 'SECTION 1: Definitions' },
        { title: 'SECTION 2: Summary of Benefits' },
        { title: '(a) In-patient Cover' },
        { title: '(b) Outpatient Cover' },
        { title: '(c) Maternity Benefit' },
        { title: '(d) Optical Cover' },
        { title: '(e) Dental Cover' },
        { title: '(f) Hospital Cash Cover' },
        { title: '(g) Repatriation and Evacuation Cover' },
        { title: '(h) Last Expense Cover'},
        { title: 'SECTION 3: Exclusions' },
        { title: 'SECTION 4: Provisions and General Conditions' },
        { title: 'SECTION 5: Complaint Procedure' },
        { title: 'SECTION 6: Claims Procedures' },
        { title: 'SECTION 7: Proposal Form/Declaration (Attachment)' },
        { title: 'SECTION 8: The Schedule of Benefits (Attachment)' },
        // { title: 'SECTION 8: The Schedule of Benefits (Attachment)', page: 210 }, if will add pages section if needed
      ];

      contents.forEach((item, index) => {
        const yPosition = 40 + index * 10; // Adjust the y position for each item
        doc.text(item.title, 12, yPosition);
        // doc.text(`Page ${item.page}`, 180, yPosition, { align: 'right' }); if will add pages section if needed
      });


       // Move to next page
       doc.addPage();


       // Page 3: Policy Data Page
       doc.setFontSize(12);
       doc.text('BIRDVIEW MICROINSURANCE LIMITED', 105, 20, { align: 'center' });
       doc.setFontSize(10);
       doc.text('REGISTERED OFFICE:',10, 30);
       doc.text('Ground Floor, Fidelity Center, Waiyaki Way, Westlands, Nairobi, Kenya:',54, 30);
       doc.text('INDIVIDUAL POLICY NO. :',10, 40);
       doc.text('XXXXX',54, 40);
       doc.text('INDIVIDUAL NAME :',10, 50);
       doc.text('XXXXX',54, 50);

      // Set font size for the paragraph
      doc.setFontSize(10.5);
      const pg3paragraph1 = 'This policy is issued to the Insured named in the Policy Data Page following a written proposal to Birdview Microinsurance Limited, hereinafter referred to as Birdview Microinsurance.';
      const pg3paragraph2 = 'The membership schedules, application forms, benefit schedules together with any statement report or other document shall form the basis of this contract and shall be deemed to be incorporated herein. Birdview Microinsurance will issue this policy provided the Insured has paid the premium as consideration for such insurance.';
      const pg3paragraph3 = 'It is understood and agreed that the basis of this contract is a proposal and declaration made to Birdview Microinsurance Limited on behalf of the Member(s) and that the proposal and declaration shall be deemed to be incorporated herein.'; 
      const pg3paragraph4 ='Birdview Microinsurance Limited hereby undertakes and agrees to provide coverage of medical and surgical expenses as laid hereinafter in this policy necessarily and reasonably incurred by the Member as a direct result of sustaining accidental bodily injury and/or illness and/or disease within the period of insurance as follows, subject to the provisions, exclusions and conditions herein:';
      const pg3list1 = 'a) The proportion specified on the Policy Data Page of all approved surgeons, anesthetists’, operating theatre fees, ICU, CCU, HDU and hospital board and accommodation charges for bed/room benefit purchased.';
      const pg3list2 = 'b) The proportion specified on the Policy Data Page of all eligible and approved physicians, specialists and/or pathologists’ fees or nursing home and nursing attendance charges, x-ray and physiotherapy fees, clinic and laboratory fees, charges for drugs, dressings, surgical appliances for eligible illness and accidents during the insurance period; and';
      const pg3list3 = 'c) The proportion, if any, specified on the Policy Data Page of the cost of transportation, being one economy class return air-ticket on a commercial airline, for the Member for eligible inpatient medical treatment not available in Kenya where certified to be necessary and essential by a physician in Birdview Microinsurance Limited panel of Physicians. For such referrals, all costs of travel or stay outside the hospital for the Member or the costs of anyone accompanying the Member are not covered.';
      const pg3list4 = 'd) Where the member is a child who is aged ten years and below, the cost of travel (airfare only, economy class) for one parent/guardian accompanying the child.';
      const pg3paragraph5 ='The Insured shall be deemed to have disclosed all material facts relating to the risk insured by this policy in the Application Form or separately in a Letter. In the event of willful mis-representation or non-disclosure of such facts the Company shall be entitled to void this Policy and all premiums paid in respect of the Member (s) so affected shall be forfeited.';
      const pg3paragraph6 ='Provided that the stated proportions shall not exceed the amount specified in the Schedule.'
      const pg3paragraph7 ='In witness whereof the undersigned has hereunto set his hand at NAIROBI this __________ day of ___________________, 20XX.__________________Authorised Officer';
      const maxWidth = 190; // Adjust this value based on your document's layout
      const pg3paragraph1Split = doc.splitTextToSize(pg3paragraph1, maxWidth);
      doc.text(pg3paragraph1Split, 10, 60); 
      const pg3paragraph2Split = doc.splitTextToSize(pg3paragraph2, maxWidth);
      doc.text(pg3paragraph2Split, 10, 70);  
      const pg3paragraph3Split = doc.splitTextToSize(pg3paragraph3, maxWidth);
      doc.text(pg3paragraph3Split, 10, 85); 
      const pg3paragraph4Split = doc.splitTextToSize(pg3paragraph4, maxWidth);
      doc.text(pg3paragraph4Split, 10, 100);
      // List of items
      const pg3list1Split = doc.splitTextToSize(pg3list1, maxWidth);
      doc.text(pg3list1Split, 14, 120);
      const pg3list2Split = doc.splitTextToSize(pg3list2, maxWidth);
      doc.text(pg3list2Split, 14, 133);
      const pg3list3Split = doc.splitTextToSize(pg3list3, maxWidth);
      doc.text(pg3list3Split, 14, 155);
      const pg3list4Split = doc.splitTextToSize(pg3list4, maxWidth);
      doc.text(pg3list4Split, 14, 180);
      // end of List items
      const pg3paragraph5Split = doc.splitTextToSize(pg3paragraph5, maxWidth);
      doc.text(pg3paragraph5Split, 10, 190);
      const pg3paragraph6Split = doc.splitTextToSize(pg3paragraph6, maxWidth);
      doc.text(pg3paragraph6Split, 10, 210);
      const pg3paragraph7Split = doc.splitTextToSize(pg3paragraph7, maxWidth);
      doc.text(pg3paragraph7Split, 10, 220);

       // Move to next page
       doc.addPage();


       // Page 4: Policy Data Page
       doc.setFontSize(12);
       doc.text('POLICY DATA PAGE', 105, 20, { align: 'center' });
       doc.setFontSize(10);
       const pageWidth = doc.internal.pageSize.getWidth(); // Get full width of the page
       const pageMargin = 10; // Margin from the sides
       const tableWidth = pageWidth - pageMargin * 2; // Total width of the table (accounting for the margins)
       const leftColumnWidth = tableWidth * 0.3; // 30% of the available table width
       const rightColumnWidth = tableWidth * 0.7; // 70% of the available table width
       let startX = pageMargin; // Start position on the X-axis (with margin)
       let startY = 25; // Starting Y position for the table
       const rowHeight = 10; // Row height
       
       // Define the table rows data
       const tableData = [
         { left: 'POLICY NUMBER:', right: 'XXXX' },
         { left: 'EFFECTIVE DATE:', right: 'XXXX' },
         { left: 'INSURED:', right: 'XXXX' },
         { left: 'ADDRESS OF INSURED:', right: 'P.O Box 45157, 00200, Nairobi.' },
         { left: 'PERIOD OF INSURANCE:', right: 'From 1st January XXXX to 31st December XXXX (both days inclusive) Or For such further period/periods as may be mutually agreed upon.' },
         { left: 'BENEFITS COVERED', right: 'As per schedule of benefits attached' },
         { left: 'PREMIUM PAYABLE:', right: 'As per acceptance/debit notes or as may be revised for future periods of insurance' },
         { left: 'CURRENCY:', right: 'Kenya Shillings' },
         { left: 'GOVERNING LAW:', right: 'Laws of Kenya' },
         { left: 'INSURED PERSONS:', right: 'As provided by the Insured (and as may be revised periodically)' },
         { left: 'PROPORTION OF EXPENSES COVERED:', right: '1. 100% of the amount for each and every eligible inpatient credit and non-credit claim per family subject to reasonable and customary charges' },
         { left: ' ', right: '2. 100% of the amount for each and every eligible dental credit and non-credit claim per family/person subject to reasonable and customary charges' },
         { left: ' ', right: '3. 100% of the amount for each and every eligible optical credit and non-credit claim per family/person subject to reasonable and customary charges' },
         { left: ' ', right: '4. 100% of the amount for each and every eligible outpatient credit and non-credit claim per family/person subject to reasonable and customary charges' },
         { left: ' ', right: '5. 100% of the amount for each and every eligible last expense claim per family/person' },
         { left: ' ', right: '6. 100% of the amount for each and every eligible repatriation and/or evacuation benefit' },
         { left: ' ', right: '7. 100% of the amount for each and every eligible hospital cash benefit following a hospital resulting from a covered condition' },
         { left: ' ', right: '8. 100% of the amount for each and every eligible maternity credit and non-credit claim per member/spouse subject to reasonable and customary charges' }
       ];
       
       // Function to handle wrapping text inside a cell
       function wrapTextInCell(text, maxWidth) {
         return doc.splitTextToSize(text, maxWidth);
       }
       
       // Loop through the data to add rows with borders
       tableData.forEach((row, index) => {
         const wrappedLeftText = wrapTextInCell(row.left, leftColumnWidth - 4); // Wrap left column text
         const wrappedRightText = wrapTextInCell(row.right, rightColumnWidth - 4); // Wrap right column text
       
         // Calculate required height based on the wrapped text
         const maxLines = Math.max(wrappedLeftText.length, wrappedRightText.length); // Take the maximum number of lines
         const cellHeight = rowHeight * maxLines; // Adjust cell height based on the content
       
         // Draw the table borders
         doc.rect(startX, startY, leftColumnWidth, cellHeight); // Left column border
         doc.rect(startX + leftColumnWidth, startY, rightColumnWidth, cellHeight); // Right column border
       
         // Add the text
         // Left column
         doc.text(wrappedLeftText, startX + 2, startY + 7);
       
         // Right column
         doc.text(wrappedRightText, startX + leftColumnWidth + 2, startY + 7);
       
         // Update the startY position for the next row
         startY += cellHeight;
       });
       
         // Move to next page
         doc.addPage();


         // Page 5: Policy Data Page
         doc.setFontSize(12);
         doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
         doc.text('SECTION 1', 10, 40 );
         doc.setFontSize(10);
         doc.text('POLICY DATA PAGE', 50, 40 );
         doc.setLineWidth(1);  
         const maxParagraphWidth = 170;
         doc.line(10, 44 ,maxWidth, 44);
         // Set font size for the paragraph
         doc.setFontSize(11);
         const pg5paragraph1 ='1. Benefit Limit - This is Birdview Microinsurance Limited liability as limited in events and amount to the limits and sub-limits specified in the Schedule as applying to each item or type of cover provided. The overall maximum limit stated thereon is the maximum amount recoverable under this Policy as a whole by any Member during any one period of insurance and in total in respect of any one covered claim or event. ';
         const pg5paragraph2 ='2. Benefit Schedule - A detailed breakdown of benefits covered under the Individual medical insurance policy.';
         const pg5paragraph3 ='3. Chronic Condition - disease, illness or injury which has at least one of the following characteristics: - ';
         const pg5list1 ='a. It has no known cure,';
         const pg5list2 ='b. It is likely to recur, ';
         const pg5list3 ='c. It needs indefinite prolonged supervision and treatment by a specialist,';
         const pg5list4 ='d. It is permanent in nature and caused by changes in the body that cannot be reversed.';
         const pg5paragraph4 ='4. Civil War - An internecine war or a war carried on between or among opposing citizens of the same country or nations.';
         const pg5paragraph5 ='5. Claim - The documents submitted to Birdview Microinsurance Limited by the service provider or the member following the provision of medical services to a member that shall include diagnosis and an itemization of services provided and cost (invoice and/or receipt where applicable) of the same.';
         const pg5paragraph6 ='6. Civil Commotion - A substantial disturbance of the public peace by three (3) or more persons assembled together and acting with common intent. ';
         const pg5paragraph7 ='7. Commencement Date -	The date on which the Insurer confirms cover under this policy on or after the Effective Date and subsequent renewal dates. This shall also be when the waiting period (where applicable) for the benefits purchased begins. ';
         const pg5paragraph8 ='8. Congenital Conditions - Is a genetic, physical or (bio) chemical defect, disease or malformation which may be either hereditary/familial or due to an influence during gestation up to birth which may or may not be obvious at birth whether diagnosed or not ';
         const pg5paragraph9 ='9. Consent - Means any freely given and informed indication of an agreement by the Data Subject to the processing of his/her personal data, which may be given either by a written or oral statement or by a clear affirmative action.';
         const pg5paragraph10 ='10. Co-payment - An amount, which should be collected directly by the service provider from a member prior to receiving a service in accordance with the benefit schedule. ';
         const pg5paragraph11 ='11. Coup d’état - The overthrow of an existing government by a group of its citizens or subjects. ';
         const pg5paragraph12 ='12. Customary and Reasonable Charges - Means charges for medical care made by a service provider which shall be considered by Birdview Microinsurance Limited to be customary and reasonable to the extent that they do not exceed the general level of charges being made by other service providers of similar standing in the locality where the charge is incurred when providing like or comparable treatment, services or supplies to individuals of the same sex and of comparable age, for a similar disease or injury. The scales of charges agreed from time to time between Birdview Microinsurance Limited and its Panel of Service Providers shall be indicative of such customary and reasonable charges.';
         const pg5paragraph13 ='13. Day Case - When an Insured Person is admitted to a Hospital and uses a Hospital bed but does not stay overnight, ';
         const pg5paragraph14 ='14. Effective Date - The date that this medical insurance cover commences as shown on the Policy Data Page.';
         const pg5paragraph15 ='15. Eligible Dependent - Means one (1) legal spouse, children who are 38 weeks and discharged from hospital or children who are discharged from hospital and students up to age 25 years. Disabled children will be covered without age limit since they are not self-supporting. ';
         const pg5paragraph1Split = doc.splitTextToSize(pg5paragraph1, maxParagraphWidth);
         doc.text(pg5paragraph1Split, 13, 50); 
         const pg5paragraph2Split = doc.splitTextToSize(pg5paragraph2, maxParagraphWidth);
         doc.text(pg5paragraph2Split, 13, 72); 
         const pg5paragraph3Split = doc.splitTextToSize(pg5paragraph3, maxParagraphWidth);
         doc.text(pg5paragraph3Split, 13, 80);
         const pg5list1Split = doc.splitTextToSize(pg5list1, maxParagraphWidth);
         doc.text(pg5list1Split, 17, 88);
         const pg5list2Split = doc.splitTextToSize(pg5list2, maxParagraphWidth);
         doc.text(pg5list2Split, 17, 92);
         const pg5list3Split = doc.splitTextToSize(pg5list3, maxParagraphWidth);
         doc.text(pg5list3Split, 17, 97);
         const pg5list4Split = doc.splitTextToSize(pg5list4, maxParagraphWidth);
         doc.text(pg5list4Split, 17, 102);
         const pg5paragraph4Split = doc.splitTextToSize(pg5paragraph4, maxParagraphWidth);
         doc.text(pg5paragraph4Split, 13, 107);
         const pg5paragraph5Split = doc.splitTextToSize(pg5paragraph5, maxParagraphWidth);
         doc.text(pg5paragraph5Split, 13, 116);
         const pg5paragraph6Split = doc.splitTextToSize(pg5paragraph6, maxParagraphWidth);
         doc.text(pg5paragraph6Split, 13, 133);
         const pg5paragraph7Split = doc.splitTextToSize(pg5paragraph7, maxParagraphWidth);
         doc.text(pg5paragraph7Split, 13, 141);
         const pg5paragraph8Split = doc.splitTextToSize(pg5paragraph8, maxParagraphWidth);
         doc.text(pg5paragraph8Split, 13, 154);
         const pg5paragraph9Split = doc.splitTextToSize(pg5paragraph9, maxParagraphWidth);
         doc.text(pg5paragraph9Split, 13, 167);
         const pg5paragraph10Split = doc.splitTextToSize(pg5paragraph10, maxParagraphWidth);
         doc.text(pg5paragraph10Split, 13, 181);
         const pg5paragraph11Split = doc.splitTextToSize(pg5paragraph11, maxParagraphWidth);
         doc.text(pg5paragraph11Split, 13, 191);
         const pg5paragraph12Split = doc.splitTextToSize(pg5paragraph12, maxParagraphWidth);
         doc.text(pg5paragraph12Split, 13, 196);
         const pg5paragraph13Split = doc.splitTextToSize(pg5paragraph13, maxParagraphWidth);
         doc.text(pg5paragraph13Split, 13, 232);
         const pg5paragraph14Split = doc.splitTextToSize(pg5paragraph14, maxParagraphWidth);
         doc.text(pg5paragraph14Split, 13, 242);
         const pg5paragraph15Split = doc.splitTextToSize(pg5paragraph15, maxParagraphWidth);
         doc.text(pg5paragraph15Split, 13, 251);

           // Move to next page
         doc.addPage();

           // Page 6: Policy Data Page
         doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
         doc.setLineWidth(1);  
         doc.line(10, 34 ,maxWidth,34);
         doc.setFontSize(11);
         const pg6paragraph1 ='16. Emergency - An unforeseen, serious, sudden, and acute medical injury or illness that requires immediate medical attention and without treatment commencing within 48 hours of the emergency event it could result in death or serious impairment of bodily function.';
         const pg6paragraph2 ='17. Epidemic/Pandemic - An epidemic is the rapid spread of infectious disease to a large number of persons in a given population within a short period of time. An epidemic may be restricted to one location; however, if it spreads to other countries or continents and affects a substantial number of people, it may be termed a pandemic. A pandemic is an epidemic occurring on a scale which crosses international boundaries and usually affecting a large number of people.';
         const pg6paragraph3 ='18. External Prosthesis - An artificial device that replaces a missing body part, which may be lost/absent through trauma, disease, or congenital conditions such as a prosthetic limb, ear which is required at time of a surgical procedure.';
         const pg6paragraph4 ='19. Exclusions - Category of treatment, conditions, activities and their related or consequential expenses that are excluded from this Policy and for which Birdview Microinsurance Limited shall not be liable.';
         const pg6paragraph5 ='20. Fraud - An intentional act of deception by a medical service provider or member or both which has the objective of: -';
         const pg6list1 ='a. Obtaining an unjustified (financial or other) benefit or advantage relating to the services or';
         const pg6list2 ='b. Causing or exposing Birdview Microinsurance Limited to (financial or other) loss or disadvantage related to the services, whether or not that act in fact achieves its intended purpose.';
         const pg6paragraph6 =`21. Genetic Testing	- Is a type of medical test that identifies changes in chromosomes, genes, or proteins, the results of which can confirm or rule out a suspected genetic condition or help determine a person's chance of developing or passing on a genetic disorder.`;
         const pg6paragraph7 ='22. Hospital - Means an institution, which is legally licensed as a medical hospital under the laws of the country in which it is located, and which must be under the constant supervision of a registered and qualified Physician medical practitioner.';
         const pg6paragraph8 ='23. In Force	 - The Policy is in effect for the medical benefits specified in the Schedule.';
         const pg6paragraph9 ='24. In-Patient - A Member who has been admitted to a hospital, is assigned a bed and given diagnostic tests or receives treatment for a disease or injury.';
         const pg6paragraph10 ='25. Insurrection - A violent rising of citizens or subjects in resistance to their government.';
         const pg6paragraph11 ='26. Limit of Indemnity - This is Birdview Microinsurance Limited’s liability as limited in events and amount to the limits and sub-limits specified in the Schedule as applying to each item or type of cover provided. The overall maximum limit stated thereon is the maximum amount recoverable under this Policy as a whole by any Member during any one period of insurance and in total in respect of any one covered claim or event.';
         const pg6paragraph12 ='27. Medical Record	- This includes but is not limited to patient information, patient history, medical reports, medical examination findings, test results or reports, prescriptions for medication, referrals ordered or received from healthcare providers, case management plan, progress reports and return visits.';
         const pg6paragraph13 ='28. Medically Necessary - A medical service or treatment which in the opinion of a qualified and prudent medical practitioner is appropriate and consistent with the diagnosis and which is in accordance with generally accepted medical standards, clinically appropriate in terms of type, frequency, extent and duration and considered effective for the patient’s illness, injury or disease.';
         const pg6paragraph14 ='29. Occupational/Speech Therapy -	This is the use of assessment and treatment to develop, recover, or maintain the daily living and work skills of persons with a physical, mental, or cognitive dis-order';
         const pg6paragraph15 ='30. Optical Service - Eye care, eye examination, follow up and prescription of glasses and lenses.';
         const pg6paragraph16 ='31. Organ Transplant - The replacement of vital organs as a consequence of an underlying eligible medical condition.';
         const pg6paragraph1Split = doc.splitTextToSize(pg6paragraph1, maxParagraphWidth);
         doc.text(pg6paragraph1Split, 13, 40); 
         const pg6paragraph2Split = doc.splitTextToSize(pg6paragraph2, maxParagraphWidth);
         doc.text(pg6paragraph2Split, 13, 55); 
         const pg6paragraph3Split = doc.splitTextToSize(pg6paragraph3, maxParagraphWidth);
         doc.text(pg6paragraph3Split, 13, 78); 
         const pg6paragraph4Split = doc.splitTextToSize(pg6paragraph4, maxParagraphWidth);
         doc.text(pg6paragraph4Split, 13, 92); 
         const pg6paragraph5Split = doc.splitTextToSize(pg6paragraph5, maxParagraphWidth);
         doc.text(pg6paragraph5Split, 13, 106); 
         const pg6list1Split = doc.splitTextToSize(pg6list1, maxParagraphWidth);
         doc.text(pg6list1Split, 17, 116); 
         const pg6list2Split = doc.splitTextToSize(pg6list2, maxParagraphWidth);
         doc.text(pg6list2Split, 17, 122); 
         const pg6paragraph6Split = doc.splitTextToSize(pg6paragraph6, maxParagraphWidth);
         doc.text(pg6paragraph6Split, 13, 132); 
         const pg6paragraph7Split = doc.splitTextToSize(pg6paragraph7, maxParagraphWidth);
         doc.text(pg6paragraph7Split, 13, 146); 
         const pg6paragraph8Split = doc.splitTextToSize(pg6paragraph8, maxParagraphWidth);
         doc.text(pg6paragraph8Split, 13, 160); 
         const pg6paragraph9Split = doc.splitTextToSize(pg6paragraph9, maxParagraphWidth);
         doc.text(pg6paragraph9Split, 13, 166); 
         const pg6paragraph10Split = doc.splitTextToSize(pg6paragraph10, maxParagraphWidth);
         doc.text(pg6paragraph10Split, 13, 176); 
         const pg6paragraph11Split = doc.splitTextToSize(pg6paragraph11, maxParagraphWidth);
         doc.text(pg6paragraph11Split, 13, 183); 
         const pg6paragraph12Split = doc.splitTextToSize(pg6paragraph12, maxParagraphWidth);
         doc.text(pg6paragraph12Split, 13, 207); 
         const pg6paragraph13Split = doc.splitTextToSize(pg6paragraph13, maxParagraphWidth);
         doc.text(pg6paragraph13Split, 13, 226); 
         const pg6paragraph14Split = doc.splitTextToSize(pg6paragraph14, maxParagraphWidth);
         doc.text(pg6paragraph14Split, 13, 246); 
         const pg6paragraph15Split = doc.splitTextToSize(pg6paragraph15, maxParagraphWidth);
         doc.text(pg6paragraph15Split, 13,261); 
         const pg6paragraph16Split = doc.splitTextToSize(pg6paragraph16, maxParagraphWidth);
         doc.text(pg6paragraph16Split, 13,268);


           // Move to next page
           doc.addPage();

           // Page 7: Policy Data Page
         doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
         doc.setLineWidth(1);  
         doc.line(10, 34 ,maxWidth,34);
         doc.setFontSize(11);
         const pg7paragraph1 = '32. Out-patient Treatment - Treatment that is received at a recognised medical facility but does not require admission and stay in a hospital or day care.';
         const pg7paragraph2 = '33. Pain Management - An interdisciplinary approach using pharmacological measures (such as anaesthetics, tricyclic anti-depressants, and anticonvulsants), interventional procedures, physical therapy, physical exercise, application of ice and/or heat and psychological measures to control pain.';
         const pg7paragraph3 = '34. Panel of Service Providers - The list of Hospitals, Pharmacies, Clinics, Physicians and other service providers having an agreement in effect with Birdview Microinsurance Limited from whom Members may seek eligible services on credit. ';
         const pg7paragraph4 = '35. Patient - Is an ill or injured member in need of treatment by a Physician, surgeon or other healthcare provider';
         const pg7paragraph5 = '36. Period of Insurance - The period from the Effective Date to the renewal date and each twelve-month period, or any such period as may be agreed between the parties, from the renewal date thereafter.';
         const pg7paragraph6 = '37. Personal Data - Means any information relating to an identified or identifiable natural person such as their name, phone number, address, ID or passport number, date of birth and email address.';
         const pg7paragraph7 = '38. Physician - Means a properly qualified medical practitioner licensed by the competent medical authorities of the country in which treatment is provided and who in rendering such treatment is practicing within the scope of his or her licensing and training.';
         const pg7paragraph8 = '39. Political unrest - Widespread anger and dissatisfaction with the current government resulting in public protest and/or violent acts against the government or where an uprising might take place in the form of a coup by the military in a country.';
         const pg7paragraph9 = '40. Pre-authorization - Pre-authorization is a written approval that an insured member may need to access certain medical services according to the scope of their medical cover. It is a promise to cover the medical case as per the medical report received by the insurer,';
         const pg7paragraph10 = '41. Pre-existing Condition - A medical condition, which can be medically proven that a member had, or was known by the member to exist prior to the commencement date or prior to upgrading, whether or not treatment or advice or diagnosis was sought and received. It is also any condition diagnosed before expiry of 90 days from the commencement date.';
         const pg7paragraph11 = '42. Prematurity - The birth of a baby of less than 38 weeks gestational age and below, and before the developing organs are mature enough to allow normal postnatal survival. The infant is at greater risk of short- and long-term complications, including disabilities and impediments in growth and mental development.';
         const pg7paragraph12 = '43. Proportion of Expenses Covered - As indicated on the Policy Data Page and schedule of benefits.';
         const pg7paragraph13 = '44. Proximate Cause - Is concerned with how the ailment and/or condition happened to the member and whether the primary underlying cause is as a result of an insured condition.  It looks for what is the reason behind the loss, and whether it is an insured peril or not.';
         const pg7paragraph14 = '45. Prosthetic implant  - An artificial body part or appliance which is aimed to form a long-lasting part of the body and is surgically inserted for one or more of the following reasons: -';
         const pg7list1 ='a. To replace a joint or ligament';
         const pg7list2 ='b. To replace one or more heart valves';
         const pg7list3 ='c. To replace the aorta or an arterial blood vessel';
         const pg7list4 ='d. To replace a sphincter muscle';
         const pg7list5 ='e. To replace a lens or cornea of the eye';
         const pg7list6 ='f. To act as a pacemaker';
         const pg7list7 ='g. To remove excess fluid from the brain';
         const pg7paragraph1Split = doc.splitTextToSize(pg7paragraph1, maxParagraphWidth);
         doc.text(pg7paragraph1Split, 13, 40); 
         const pg7paragraph2Split = doc.splitTextToSize(pg7paragraph2, maxParagraphWidth);
         doc.text(pg7paragraph2Split, 13, 50); 
         const pg7paragraph3Split = doc.splitTextToSize(pg7paragraph3, maxParagraphWidth);
         doc.text(pg7paragraph3Split, 13, 68); 
         const pg7paragraph4Split = doc.splitTextToSize(pg7paragraph4, maxParagraphWidth);
         doc.text(pg7paragraph4Split, 13, 83); 
         const pg7paragraph5Split = doc.splitTextToSize(pg7paragraph5, maxParagraphWidth);
         doc.text(pg7paragraph5Split, 13, 93); 
         const pg7paragraph6Split = doc.splitTextToSize(pg7paragraph6, maxParagraphWidth);
         doc.text(pg7paragraph6Split, 13,108); 
         const pg7paragraph7Split = doc.splitTextToSize(pg7paragraph7, maxParagraphWidth);
         doc.text(pg7paragraph7Split, 13,123); 
         const pg7paragraph8Split = doc.splitTextToSize(pg7paragraph8, maxParagraphWidth);
         doc.text(pg7paragraph8Split, 13,138);
         const pg7paragraph9Split = doc.splitTextToSize(pg7paragraph9, maxParagraphWidth);
         doc.text(pg7paragraph9Split, 13,153);
         const pg7paragraph10Split = doc.splitTextToSize(pg7paragraph10, maxParagraphWidth);
         doc.text(pg7paragraph10Split, 13,168);
         const pg7paragraph11Split = doc.splitTextToSize(pg7paragraph11, maxParagraphWidth);
         doc.text(pg7paragraph11Split, 13,188);
         const pg7paragraph12Split = doc.splitTextToSize(pg7paragraph12, maxParagraphWidth);
         doc.text(pg7paragraph12Split, 13,208);
         const pg7paragraph13Split = doc.splitTextToSize(pg7paragraph13, maxParagraphWidth);
         doc.text(pg7paragraph13Split, 13,218);
         const pg7paragraph14Split = doc.splitTextToSize(pg7paragraph14, maxParagraphWidth);
         doc.text(pg7paragraph14Split, 13,234);
         const pg7list1Split = doc.splitTextToSize(pg7list1, maxParagraphWidth);
         doc.text(pg7list1Split, 17,245);
         const pg7list2Split = doc.splitTextToSize(pg7list2, maxParagraphWidth);
         doc.text(pg7list2Split, 17,250);
         const pg7list3Split = doc.splitTextToSize(pg7list3, maxParagraphWidth);
         doc.text(pg7list3Split, 17,256);
         const pg7list4Split = doc.splitTextToSize(pg7list4, maxParagraphWidth);
         doc.text(pg7list4Split, 17,262);
         const pg7list5Split = doc.splitTextToSize(pg7list5, maxParagraphWidth);
         doc.text(pg7list5Split, 17,267);
         const pg7list6Split = doc.splitTextToSize(pg7list6, maxParagraphWidth);
         doc.text(pg7list6Split, 17,273);
         const pg7list7Split = doc.splitTextToSize(pg7list7, maxParagraphWidth);
         doc.text(pg7list7Split, 17,279);
        


           // Move to next page
           doc.addPage();

           // Page 8: Policy Data Page
         doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
         doc.setLineWidth(1);  
         doc.line(10, 34 ,maxWidth,34);
         doc.setFontSize(11);
         const pg8list1 ='h. To control urinary incontinence (bladder control)';
         const pg8paragraph1 ='46. Riot - A violent disturbance by three (3) or more persons assembled together which threatens the public peace.';
         const pg8paragraph2 ='47. Sensitive Personal Data - Means data revealing a natural person’s race, health status, ethnic, social origin, conscience belief genetic data, biometric data, property details, marital status, family details including names of the person’s children, parents, spouse or spouses, sex, or the sexual orientation if the Data Subject.';
         const pg8paragraph3 ='48. Specialist - A qualified and registered medical practitioner who currently holds a substantive consultant appointment in that speciality which is recognized as such by the statutory bodies of the relevant country.';
         const pg8paragraph4 ='49. Strike - A work stoppage by three (3) or more workers to enforce demands made on an employer or to protest against and act or condition.';
         const pg8paragraph5 ='50. Surgical appliance - Devices and equipment used as an integral part of a surgical procedure administered by a surgeon.';
         const pg8paragraph6 ='51. Terrorism - An unlawful act, including the use of force or violence, by any person or groups(s) of persons, whether acting alone or on behalf of or in connection with any organisation(s), committed for political, religious or ideological purposes including the intention to influence any government and/or to put the public in fear for such purposes.';
         const pg8paragraph7 ='52. Waiting Period -The period of time set by the insurer that the member will not get services upon approval of membership. The waiting period applies to specific illnesses, procedures and medical treatment as indicated on the Policy Data Page.  Waiting periods will be waived where renewals are effected with another insurance service provider within one month of expiry and subject to proof of cover, availing renewal and claims report and underwriting.';
         const pg8paragraph8 ='53. We, Us, Our – Birdview Microinsurance Limited.';
         const pg8paragraph9 ='Words importing the singular number shall be deemed to include the plural number and vice versa. Where the context so admits, words denoting the masculine gender shall be deemed to include the feminine. ';
         const pg8Heading1 ='SECTION 2';
         const pg8subHeading1 ='SUMMARY OF BENEFITS';
         const pg8subHeading2 ='(A). In-patient Cover';
         const pg8Statement1 ='1. Hospital treatment and services (if purchased)';
         const pg8paragraph10 ='All necessary and eligible, active medical treatment and services provided by or on the order of a Physician to the Member when admitted as a registered patient to a hospital, treatment which cannot be provided on an outpatient basis.';
         const pg8paragraph11 ='Cover includes hospital accommodation (up to the cost of general ward bed in that hospital), nursing care, diagnostic, laboratory or other medically necessary facilities and services, physician’s, surgeon’s, anaesthetist’s or physiotherapist’s fees, operating theatre charges, intensive care unit charges, high dependency unit, cardiac care unit, specialist consultations or visits and all drugs, dressings or medications prescribed by treating physician for in-hospital use. This shall include discharge drugs for up to 30 days. The cost of non-medical goods or services including such items as telephone, newspaper, toiletry items or accommodation for the Member’s family is excluded. ';
         const pg8paragraph12 ='The policy will cover accommodation for a parent or legal guardian accompanying a Member who is below 10 years of age. ';
         const pg8Statement2 ='2. Day Care Surgery or treatment:';
         const pg8paragraph13 ='When an Insured Person is admitted to a Hospital and uses a Hospital Bed but 	does not stay overnight.';
         const pg8list1Split = doc.splitTextToSize(pg8list1, maxParagraphWidth);
         doc.text(pg8list1Split, 17, 40); 
         const pg8paragraph1Split = doc.splitTextToSize(pg8paragraph1, maxParagraphWidth);
         doc.text(pg8paragraph1Split, 13, 47); 
         const pg8paragraph2Split = doc.splitTextToSize(pg8paragraph2, maxParagraphWidth);
         doc.text(pg8paragraph2Split, 13, 57); 
         const pg8paragraph3Split = doc.splitTextToSize(pg8paragraph3, maxParagraphWidth);
         doc.text(pg8paragraph3Split, 13, 77);
         const pg8paragraph4Split = doc.splitTextToSize(pg8paragraph4, maxParagraphWidth);
         doc.text(pg8paragraph4Split, 13, 92);
         const pg8paragraph5Split = doc.splitTextToSize(pg8paragraph5, maxParagraphWidth);
         doc.text(pg8paragraph5Split, 13, 103);
         const pg8paragraph6Split = doc.splitTextToSize(pg8paragraph6, maxParagraphWidth);
         doc.text(pg8paragraph6Split, 13, 114);
         const pg8paragraph7Split = doc.splitTextToSize(pg8paragraph7, maxParagraphWidth);
         doc.text(pg8paragraph7Split, 13, 134);
         const pg8paragraph8Split = doc.splitTextToSize(pg8paragraph8, maxParagraphWidth);
         doc.text(pg8paragraph8Split, 13, 157);
         const pg8paragraph9Split = doc.splitTextToSize(pg8paragraph9, maxParagraphWidth);
         doc.text(pg8paragraph9Split, 13, 162);
         doc.line(10, 175 ,maxWidth,175);
         const pg8Heading1Split = doc.splitTextToSize(pg8Heading1, maxParagraphWidth);
         doc.text(pg8Heading1Split, 13, 181);
         const pg8subHeading1Split = doc.splitTextToSize(pg8subHeading1, maxParagraphWidth);
         doc.text(pg8subHeading1Split, 50, 181);
         doc.line(10, 185 ,maxWidth,185);
         const pg8subHeading2Split = doc.splitTextToSize(pg8subHeading2, maxParagraphWidth);
         doc.text(pg8subHeading2Split, 13, 192);
         const pg8Statement1Split = doc.splitTextToSize(pg8Statement1, maxParagraphWidth);
         doc.text(pg8Statement1Split, 22, 200);
         const pg8paragraph10Split = doc.splitTextToSize(pg8paragraph10, maxParagraphWidth);
         doc.text(pg8paragraph10Split, 25, 206);
         const pg8paragraph11Split = doc.splitTextToSize(pg8paragraph11, maxParagraphWidth);
         doc.text(pg8paragraph11Split, 25, 221);
         const pg8paragraph12Split = doc.splitTextToSize(pg8paragraph12, maxParagraphWidth);
         doc.text(pg8paragraph12Split, 25, 256);
         const pg8Statement2Split = doc.splitTextToSize(pg8Statement2, maxParagraphWidth);
         doc.text(pg8Statement2Split, 22, 266);
         const pg8paragraph13Split = doc.splitTextToSize(pg8paragraph13, maxParagraphWidth);
         doc.text(pg8paragraph13Split, 25, 272);


            // Move to next page
            doc.addPage();

            // Page 9: Policy Data Page
          doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
          doc.setLineWidth(1);  
          doc.line(10, 34 ,maxWidth,34);
          doc.setFontSize(11);
          const pg9Statement1 ='3. Pre-Hospitalisation Diagnostic Services:';
          const pg9paragraph1 ='Laboratory, radiology or other necessary medical diagnostic procedures ordered by a Physician and which results in the Member being admitted (on the same day the tests are done) as a registered patient to a hospital for treatment of the specific medical condition diagnosed, provided that such medical condition is covered. ';
          const pg9Statement2 ='4. First Emergency C Section in the lifetime of a woman:';
          const pg9paragraph2 ='First ever medically necessary emergency Caesarean section delivery in a woman’s life which must be certified by an independent medical examiner as being of vital necessity to the health of the mother and/or child. Expenses for the child are excluded.';
          const pg9Statement3 ='5.Chemotherapy:';
          const pg9paragraph3 ='The treatment of disease such as cancer by the use of powerful chemical substances - cytotoxic and other drugs shall be carried as inpatient or day case based on the treatment required.';
          const pg9Statement4 ='6. Radiation therapy:';
          const pg9paragraph4 ='Treatment with high-energy radiation rays such as gamma rays are used to kill, shrink, damage cancer     cells, and stopping them from growing and dividing.';
          const pg9Statement5 ='7. Local Road and Air Ambulance Services:';
          const pg9paragraph5 ='Ambulance services for transportation of a sick Member for eligible inpatient treatment from an area where facilities for adequate care do not exist to the nearest suitable hospital or licensed medical facility will be covered within the annual inpatient limit.';
          const pg9Statement6 ='8. Home Nursing: ';
          const pg9paragraph6 ='Eligible and medically necessary home nursing care shall be provided upon approval by Birdview Microinsurance Limited. This shall be covered up to a maximum of 30 days in any policy year.';
          const pg9paragraph7 ='Cover for all eligible in-patient services is subject to the limits specified in Schedule 8 and to the treatment cost being reasonable and customary.';
          const pg9subHeading1 ='(B) Out-patient Cover (If purchased)';
          const pg9paragraph8 ='Medically necessary and eligible medical treatment provided to a Member who is not a registered in-patient at a hospital and defined as:';
          const pg9Statement8 ='1. General Out-patient Services ';
          const pg9paragraph9 ='Outpatient services provided by or on the order of a Physician who is licensed as a General Practitioner.';
          const pg9Statement9 ='2.Specialist Out-patient Services';
          const pg9paragraph10 ='Outpatient services provided by or on the order of a Physician who is licensed as a Specialist or Consultant and to whom the Member has been referred to by a General Practitioner.';
          const pg9Statement10 ='3. Out-patient Laboratory and Radiology Services';
          const pg9paragraph11 ='Laboratory testing, radiographic procedures used to diagnose or treat medical conditions. Such services   must be provided or ordered by a Physician and must be covered under the policy.';
          const pg9Statement11 ='4. Out-patient Prescription Drugs';
          const pg9paragraph12 ='Dressings, Drugs and medicines, the use of which is restricted to the order of a Physician and prescribed   	for use by the Member as an outpatient for a maximum period of one month.';
          const pg9Statement12 ='5. Other Out-patient Services';
          const pg9paragraph13 ='Other services rendered under outpatient include Therapy which shall be on referral basis by a Physician, medical check-ups and vaccinations (KEPI vaccines) for children below the age of 1.5 years. ';
          const pg9Statement13 ='6. Pre and Post Natal Services';
          const pg9paragraph14 ='Pre-natal & Post-natal outpatient treatment subject to one (1) year waiting period.';
          const pg9paragraph15 ='Cover for all eligible outpatient services are subject to the amounts specified in Schedule 8 and to the treatment cost being customary and reasonable.';
          const pg9Statement1Split = doc.splitTextToSize(pg9Statement1, maxParagraphWidth);
          doc.text(pg9Statement1Split, 22, 40);
          const pg9paragraph1Split = doc.splitTextToSize(pg9paragraph1, maxParagraphWidth);
          doc.text(pg9paragraph1Split, 25, 46);
          const pg9Statement2Split = doc.splitTextToSize(pg9Statement2, maxParagraphWidth);
          doc.text(pg9Statement2Split, 22, 65);
          const pg9paragraph2Split = doc.splitTextToSize(pg9paragraph2, maxParagraphWidth);
          doc.text(pg9paragraph2Split, 25, 71);
          const pg9Statement3Split = doc.splitTextToSize(pg9Statement3, maxParagraphWidth);
          doc.text(pg9Statement3Split, 22, 85);
          const pg9paragraph3Split = doc.splitTextToSize(pg9paragraph3, maxParagraphWidth);
          doc.text(pg9paragraph3Split, 25, 91);
          const pg9Statement4Split = doc.splitTextToSize(pg9Statement4, maxParagraphWidth);
          doc.text(pg9Statement4Split, 22, 100);
          const pg9paragraph4Split = doc.splitTextToSize(pg9paragraph4, maxParagraphWidth);
          doc.text(pg9paragraph4Split, 25, 106);

          const pg9Statement5Split = doc.splitTextToSize(pg9Statement5, maxParagraphWidth);
          doc.text(pg9Statement5Split, 22, 115);
          const pg9paragraph5Split = doc.splitTextToSize(pg9paragraph5, maxParagraphWidth);
          doc.text(pg9paragraph5Split, 25, 121);

          const pg9Statement6Split = doc.splitTextToSize(pg9Statement6, maxParagraphWidth);
          doc.text(pg9Statement6Split, 22, 135);
          const pg9paragraph6Split = doc.splitTextToSize(pg9paragraph6, maxParagraphWidth);
          doc.text(pg9paragraph6Split, 25, 141);

          const pg9paragraph7Split = doc.splitTextToSize(pg9paragraph7, maxParagraphWidth);
          doc.text(pg9paragraph7Split, 25, 151);

          const pg9subHeading1Split = doc.splitTextToSize(pg9subHeading1, maxParagraphWidth);
          doc.text(pg9subHeading1Split, 22, 162);

          const pg9paragraph8Split = doc.splitTextToSize(pg9paragraph8, maxParagraphWidth);
          doc.text(pg9paragraph8Split, 25, 168);

          const pg9Statement8Split = doc.splitTextToSize(pg9Statement8, maxParagraphWidth);
          doc.text(pg9Statement8Split, 22, 177);
          const pg9paragraph9Split = doc.splitTextToSize(pg9paragraph9, maxParagraphWidth);
          doc.text(pg9paragraph9Split, 25, 182);

          const pg9Statement9Split = doc.splitTextToSize(pg9Statement9, maxParagraphWidth);
          doc.text(pg9Statement9Split, 22, 192);
          const pg9paragraph10Split = doc.splitTextToSize(pg9paragraph10, maxParagraphWidth);
          doc.text(pg9paragraph10Split, 25, 198);

          const pg9Statement10Split = doc.splitTextToSize(pg9Statement10, maxParagraphWidth);
          doc.text(pg9Statement10Split, 22, 208);
          const pg9paragraph11Split = doc.splitTextToSize(pg9paragraph11, maxParagraphWidth);
          doc.text(pg9paragraph11Split, 25,213);

          const pg9Statement11Split = doc.splitTextToSize(pg9Statement11, maxParagraphWidth);
          doc.text(pg9Statement11Split, 22, 224);
          const pg9paragraph12Split = doc.splitTextToSize(pg9paragraph12, maxParagraphWidth);
          doc.text(pg9paragraph12Split, 25, 230);

          const pg9Statement12Split = doc.splitTextToSize(pg9Statement12, maxParagraphWidth);
          doc.text(pg9Statement12Split, 22, 243);
          const pg9paragraph13Split = doc.splitTextToSize(pg9paragraph13, maxParagraphWidth);
          doc.text(pg9paragraph13Split, 25, 249);

          const pg9Statement13Split = doc.splitTextToSize(pg9Statement13, maxParagraphWidth);
          doc.text(pg9Statement13Split, 22, 264);
          const pg9paragraph14Split = doc.splitTextToSize(pg9paragraph14, maxParagraphWidth);
          doc.text(pg9paragraph14Split, 25, 269);

          const pg9paragraph15Split = doc.splitTextToSize(pg9paragraph15, maxParagraphWidth);
          doc.text(pg9paragraph15Split, 25,275);


            // Move to next page
            doc.addPage();

            // Page 10: Policy Data Page
          doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
          doc.setLineWidth(1);  
          doc.line(10, 34 ,maxWidth,34);
          doc.setFontSize(11);
          const pg10subHeading1 ='(C). Maternity Cover (Covered within Inpatient Benefit)'; 
          const pg10Statement1 ='1. Pregnancy and childbirth';
          const pg10paragraph1 ='Birdview Microinsurance Limited will cover the Member for the proportion of expenses shown on the Policy Data Page arising from childbirth provided the Member is admitted in a Hospital. The benefit shall cover delivery fees, consultation and treatment for childbirth for the normal period of confinement/admission in hospital. Expenses for the child are excluded.';
          const pg10Statement2 ='2. Complications of pregnancy';
          const pg10paragraph2 ='Birdview Microinsurance Limited will also cover cost arising out of complications of pregnancy, miscarriage and abortion provided that such abortion shall be certified by a gynaecologist and/or a psychiatrist as being necessary to preserve the mental and/or physical health of the mother. Birdview Microinsurance Limited reserves the right to require the mother to be examined by a specialist of its choice. ';
          const pg10paragraph3 ='Complications of pregnancy are defined as those medical conditions which only ever arise as a direct result of pregnancy or childbirth. Conditions covered are ectopic pregnancy, gestational diabetes, hydatidform mole and/or molar pregnancies, miscarriage (actual or threatened), pre-eclampsia, failure to progress in labour or stillbirth. Puerperal psychosis, Post-partum haemorrhage and retained placental membrane that occur during childbirth are also covered by this benefit including complications of the above conditions.';
          const pg10paragraph4 ='Cover for all eligible maternity services are subject to the limits as shall be specified in Schedule 8 within the inpatient benefit and to the cost of treatment being customary and reasonable.';
          const pg10paragraph5 ='Maternity cover is limited only to the female employee/spouse and not available for dependent children.';
          const pg10subHeading2 ='(D). Optical Cover (If purchased)'; 
          const pg10paragraph6 = 'On written request from the Group and at an additional premium, Birdview Microinsurance Limited will cover the Member for the proportion of expenses shown on the Policy Data Page for the cost of consultation by an optometrist or ophthalmologist, one sight/vision eye test each membership year, prescribed spectacles and contact lenses, which are prescribed to correct a sight/vision problem such as long or short sight  provided that the total coverage under this section in any one period of insurance shall not exceed the limits specified in the Schedule 9. The frames shall be limited to one pair for every two years (2) and up to a maximum of KShs. 10,000 or the maximum optical limit whichever is lower. '
          const pg10paragraph7 = 'Birdview Microinsurance Limited shall not be liable for payments in respect of: -'
          const pg10list1 ='i. The replacement of frames unless directly caused as a result of an accidental injury. '; 
          const pg10list2 ='ii. The replacement of lenses unless necessitated in the course of further treatment in connection with the contingency insured hereby.'; 
          const pg10list3 ='iii. Sunglasses and Plano lenses prescribed or otherwise'; 
          const pg10subHeading3 ='(E). Dental Cover (If Purchased)'; 
          const pg10paragraph8 ='On written request from the group and at additional premium, Birdview Microinsurance Limited will cover the Member the proportion of expenses shown on the Policy Data Page for the cost of dental consultation resulting in examinations, tooth cleaning, normal compound filling (excluding the use of semi-precious or precious metals), simple or non-surgical extractions, root canal treatment, inclusive of anaesthetist’s fees, hospital, and operating theatre costs.';
          const pg10paragraph9 ='Birdview Microinsurance Limited shall not be liable for payments in respect of: -';
          const pg10list4 ='i. The cost of replacement or repairs of old dentures, bridges and plates unless damage to the said dentures, bridges and plates arises as the result of bodily injury sustained by the Member caused solely and directly by accidental external and visible means.';
          const pg10list5 ='ii. The cost of orthodontic treatment of a cosmetic nature unless such treatment becomes necessary as the result of bodily injury sustained by the Member caused solely and directly by accidental external visible means or as a result of disease other than normal decay.';
          const pg10paragraph10 ='Cover for all eligible dental benefits are subject to the limits specified in Schedule 8 and to the cost of treatment being customary and reasonable.';
          const pg10subHeading1Split = doc.splitTextToSize(pg10subHeading1, maxParagraphWidth);
          doc.text(pg10subHeading1Split, 13, 40);          
          const pg10Statement1Split = doc.splitTextToSize(pg10Statement1, maxParagraphWidth);
          doc.text(pg10Statement1Split, 22, 46);
          const pg10paragraph1Split = doc.splitTextToSize(pg10paragraph1, maxParagraphWidth);
          doc.text(pg10paragraph1Split, 25, 51);
          const pg10Statement2Split = doc.splitTextToSize(pg10Statement2, maxParagraphWidth);
          doc.text(pg10Statement2Split, 25, 70);
          const pg10paragraph2Split = doc.splitTextToSize(pg10paragraph2, maxParagraphWidth);
          doc.text(pg10paragraph2Split, 25, 75);
          const pg10paragraph3Split = doc.splitTextToSize(pg10paragraph3, maxParagraphWidth);
          doc.text(pg10paragraph3Split, 25, 98);
          const pg10paragraph4Split = doc.splitTextToSize(pg10paragraph4, maxParagraphWidth);
          doc.text(pg10paragraph4Split, 25,126);
          const pg10paragraph5Split = doc.splitTextToSize(pg10paragraph5, maxParagraphWidth);
          doc.text(pg10paragraph5Split, 25,136);
          const pg10subHeading2Split = doc.splitTextToSize(pg10subHeading2, maxParagraphWidth);
          doc.text(pg10subHeading2Split, 13, 146); 
          const pg10paragraph6Split = doc.splitTextToSize(pg10paragraph6, maxParagraphWidth);
          doc.text(pg10paragraph6Split, 25,151);
          const pg10paragraph7Split = doc.splitTextToSize(pg10paragraph7, maxParagraphWidth);
          doc.text(pg10paragraph7Split, 25,187);
          const pg10list1Split = doc.splitTextToSize(pg10list1, maxParagraphWidth);
          doc.text(pg10list1Split, 29,192);
          const pg10list2Split = doc.splitTextToSize(pg10list2, maxParagraphWidth);
          doc.text(pg10list2Split, 29,197);
          const pg10list3Split = doc.splitTextToSize(pg10list3, maxParagraphWidth);
          doc.text(pg10list3Split, 29,207);
          const pg10subHeading3Split = doc.splitTextToSize(pg10subHeading3, maxParagraphWidth);
          doc.text(pg10subHeading3Split, 13,212);
          const pg10paragraph8Split = doc.splitTextToSize(pg10paragraph8, maxParagraphWidth);
          doc.text(pg10paragraph8Split, 25,217);
          const pg10paragraph9Split = doc.splitTextToSize(pg10paragraph9, maxParagraphWidth);
          doc.text(pg10paragraph9Split, 25,240);
          const pg10list4Split = doc.splitTextToSize(pg10list4, maxParagraphWidth);
          doc.text(pg10list4Split, 29,245);
          const pg10list5Split = doc.splitTextToSize(pg10list5, maxParagraphWidth);
          doc.text(pg10list5Split, 29,260);
          const pg10paragraph10Split = doc.splitTextToSize(pg10paragraph10, maxParagraphWidth);
          doc.text(pg10paragraph10Split,13,275);


            // Move to next page
            doc.addPage();

            // Page 11: Policy Data Page
          doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
          doc.setLineWidth(1);  
          doc.line(10, 34 ,maxWidth,34);
          doc.setFontSize(11);
          const pg11subHeading1 ='(F). Hospital Cash Benefit';
          const pg11paragraph1 ='The cover provides daily payments for insureds admitted in hospital for up to a maximum of 10 payments per year or admission, whichever comes first. Payments start from the second day of admission.';
          const pg11paragraph2 ='New entrants are required to observe a general waiting period of 30 days for illness claims, while no waiting period applies to accident-related treatments.';
          const pg11paragraph3 ='Policyholders are required to notify Birdview Microinsurance Limited within 48 hours of admission. ';
          const pg11paragraph4 ='Cover for all eligible in-patient services is subject to the limits specified in Schedule 8.';
          const pg11subHeading2 ='(G). Repatriation and Evacuation Benefit';
          const pg11paragraph5 = 'Evacuation and repatriation due to medical emergency, death and other emergencies excluding those related to war, criminal activities, and dangerous activities such as those listed under exclusions clause.';
          const pg11paragraph6 = 'Coverage is to an insured person in the Diaspora either as resident, on official duties, work or visit short term visit to any country in the world.';
          const pg11paragraph7 = 'Returnee can only be evacuated to Kenya and cannot take new cover within 2 years of returning.';
          const pg11paragraph8 = 'The cost of evacuation and repatriation shall be paid to the provider up to the maximum applicable benefit limit specified in Schedule 8.';
          const pg11subHeading3 ='(H). Last Expense';
          const pg11paragraph9 ='This is only payable to the named beneficiary, to whom the sum assured is made, payable, upon providing a written proof satisfactory to the Company of: -';
          const pg11list1 ='i. The death of the Insured;';
          const pg11list2 ='ii. The title and the identity of the claimant or claimants; and';
          const pg11list3 ='iii. The correctness of the date of birth of the Insured stated in the declarations,';
          const pg11list4 ='iv. Burial Permit/Death certificate stating the cause of death.';
          const pg11paragraph10 ='Cover for all eligible last expense benefit is subject to the limits specified in Schedule 8.';
          const pg11Heading1 ='SECTION 3';
          const pg11subHeading4 ='GENERAL EXCLUSIONS';
          const pg11paragraph11 ='This insurance excludes:';
          const pg11paragraph12 ='The Company shall not be liable in respect of: ';
          const pg11subHeading5 ='(A). Expenses incurred as a result of a Member’s participation in:';
          const pg11paragraph13 ='1. Naval, military or air force service, paramilitary, police and police reserve service or operations;';
          const pg11paragraph14 ='2. Expenses incurred directly or indirectly as a result of participation hazardous, high risk, adventurous, dangerous and/or extreme sports activities which include but are not limited to in winter and water sports, underwater activities, scuba diving, white water rafting, bungee jumping, parachuting, rock climbing, mountain climbing or hang-gliding.  Participation in professional sports; any race or speed contest, motorized race or motorized speed contest including training; parasailing; spelunking; heli-skiing, skiing outside of marked trails; other dangerous sports or high-risk activities. Participation in hunting, polo, racing on horseback, rugby, boxing, wrestling, rodeo activity, unarmed combat, caving, league footfall, motorcycling or motor racing on machines greater than 125 c.c. ';
          const pg11paragraph15 ='3. Air travel except as a fare-paying passenger in any aircraft licensed for passenger carrying.  Cover shall not in any event apply to a Member whilst operating, learning to operate or serving as a Member of a crew of any aircraft or to travel in any aircraft being used for sky-diving, racing, testing, aerobatics, exploration and/or participating in any other airborne activities.';
          const pg11subHeading1Split = doc.splitTextToSize(pg11subHeading1, maxParagraphWidth);
          doc.text(pg11subHeading1Split, 13, 40); 
          const pg11paragraph1Split = doc.splitTextToSize(pg11paragraph1, maxParagraphWidth);
          doc.text(pg11paragraph1Split,25, 45); 
          const pg11paragraph2Split = doc.splitTextToSize(pg11paragraph2, maxParagraphWidth);
          doc.text(pg11paragraph2Split,25, 60); 
          const pg11paragraph3Split = doc.splitTextToSize(pg11paragraph3, maxParagraphWidth);
          doc.text(pg11paragraph3Split,25, 70); 
          const pg11paragraph4Split = doc.splitTextToSize(pg11paragraph4, maxParagraphWidth);
          doc.text(pg11paragraph4Split,25, 75); 
          const pg11subHeading2Split = doc.splitTextToSize(pg11subHeading2, maxParagraphWidth);
          doc.text(pg11subHeading2Split, 13, 80);
          const pg11paragraph5Split = doc.splitTextToSize(pg11paragraph5, maxParagraphWidth);
          doc.text(pg11paragraph5Split, 25, 85);
          const pg11paragraph6Split = doc.splitTextToSize(pg11paragraph6, maxParagraphWidth);
          doc.text(pg11paragraph6Split, 25, 100);
          const pg11paragraph7Split = doc.splitTextToSize(pg11paragraph7, maxParagraphWidth);
          doc.text(pg11paragraph7Split, 25, 110);
          const pg11paragraph8Split = doc.splitTextToSize(pg11paragraph8, maxParagraphWidth);
          doc.text(pg11paragraph8Split, 25, 115);
          const pg11subHeading3Split = doc.splitTextToSize(pg11subHeading3, maxParagraphWidth);
          doc.text(pg11subHeading3Split, 13, 125);
          const pg11paragraph9Split = doc.splitTextToSize(pg11paragraph9, maxParagraphWidth);
          doc.text(pg11paragraph9Split, 25, 130);
          const pg11list1Split = doc.splitTextToSize(pg11list1, maxParagraphWidth);
          doc.text(pg11list1Split, 29, 140);
          const pg11list2Split = doc.splitTextToSize(pg11list2, maxParagraphWidth);
          doc.text(pg11list2Split, 29, 145);
          const pg11list3Split = doc.splitTextToSize(pg11list3, maxParagraphWidth);
          doc.text(pg11list3Split, 29, 150);
          const pg11list4Split = doc.splitTextToSize(pg11list4, maxParagraphWidth);
          doc.text(pg11list4Split, 29, 155);
          const pg11paragraph10Split = doc.splitTextToSize(pg11paragraph10, maxParagraphWidth);
          doc.text(pg11paragraph10Split, 25, 160);
          doc.line(10, 165 ,maxWidth,165);
          const pg11Heading1Split = doc.splitTextToSize(pg11Heading1, maxParagraphWidth);
          doc.text(pg11Heading1Split, 13, 171);
          const pg11subHeading4Split = doc.splitTextToSize(pg11subHeading4, maxParagraphWidth);
          doc.text(pg11subHeading4Split, 50, 171);
          doc.line(10, 175 ,maxWidth,175);
          const pg11paragraph11Split = doc.splitTextToSize(pg11paragraph11, maxParagraphWidth);
          doc.text(pg11paragraph11Split, 13, 180);
          const pg11paragraph12Split = doc.splitTextToSize(pg11paragraph12, maxParagraphWidth);
          doc.text(pg11paragraph12Split, 13, 185);
          const pg11subHeading5Split = doc.splitTextToSize(pg11subHeading5, maxParagraphWidth);
          doc.text(pg11subHeading5Split, 17, 190);
          const pg11paragraph13Split = doc.splitTextToSize(pg11paragraph13, maxParagraphWidth);
          doc.text(pg11paragraph13Split, 25, 195);
          const pg11paragraph14Split = doc.splitTextToSize(pg11paragraph14, maxParagraphWidth);
          doc.text(pg11paragraph14Split, 25, 200);
          const pg11paragraph15Split = doc.splitTextToSize(pg11paragraph15, maxParagraphWidth);
          doc.text(pg11paragraph15Split, 25, 240);
          


          // Move to next page
          doc.addPage();

          // Page 12: Policy Data Page
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
        doc.setLineWidth(1);  
        doc.line(10, 34 ,maxWidth,34);
        doc.setFontSize(11);
        const pg12subHeading1 ='(B). Expenses directly or indirectly incurred as a result of:';
        const pg12paragraph1 ='1. War (“declared or undeclared”), civil commotion, participation in riot and strike, political unrest, act of foreign enemy, hostilities and warlike operations, civil war, mutiny, insurrection, revolution, military or popular rising, military or usurped power, martial law or state of siege or any events or causes which determine the proclamation of maintenance or martial law or state of siege, confiscation, seizure, nationalization or destruction of or damage to the property by order of Government (de jury or de facto) or Land Authority or any process of law.';
        const pg12paragraph2 ='2. Costs directly or indirectly resulting from the release of weapon(s) of mass destruction, whether such involves an explosive sequence(s) or not.';
        const pg12paragraph3 ='3. Medical treatment directly or indirectly arising from or required as a result of chemical contamination or contamination by radioactivity from any nuclear material whatsoever or from the combustion of nuclear fuel, asbestosis or any related condition. Nuclear fission, ionising or non-ionising radiation or contamination by radioactivity from nuclear fuel or waste. For the purpose of this exclusion, combustion shall include any self- sustained process of nuclear fission.';
        const pg12paragraph4 ='4. Intentional self-injury, suicide or attempted suicide (whether sane or insane) or any bodily injury or illness wilfully self-inflicted or due to negligent or reckless behaviour or as a result of committing or helping to commit a criminal act, except in an attempt to save a human life or the proximate cause is a mental disorder.';
        const pg12paragraph5 ='5. Pre - existing and/or chronic conditions (including cancer), gynecological conditions, Hernias, Hemorrhoids, Thyroidectomy, Adenoidectomy, congenital, organ transplant, HIV/AIDS and related conditions existing/not existing and/or not diagnosed at the time of joining subject to 1 year waiting period.';
        const pg12paragraph6 ='6. Treatment for the consumption of alcohol, intoxication, dependency on or abuse of alcohol, drugs or any substance abuse or any other addictive conditions of any kind and complications, injury or illness arising directly or indirectly from such use, abuse or addiction. ';
        const pg12paragraph7 ='7. Treatment by chiropractors, acupuncturists, herbalists, and other alternative treatments. ';
        const pg12paragraph8 ='8. Stays and/or maintenance or treatment received in health hydro’s, nature cure clinics, spas or similar establishments or private beds registered as a nursing home attached to such establishments or a hospital which has effectively become the insured person’s home or permanent abode or where admission is arranged wholly or partly for domestic reasons or a period of quarantine or isolation. ';
        const pg12paragraph9 ='9. Pregnancy, childbirth, maternity benefits, miscarriage, caesarean operation subject to applicable limit and 12 months waiting period. The benefit shall exclude any treatment and expenses related to surrogacy.';
        const pg12paragraph10 ='10. Foetal Surgery';
        const pg12paragraph11 ='11. Family planning and Fertility treatment, or any form of assisted conception and complications e.g., costs of treatment related to infertility and impotence, hormone replacement therapy (HRT). Investigations, diagnostics and treatment of impotence, sexual dysfunction, or any consequence thereof, treatment for sterilization or fertilisation, vasectomy or other sexually related conditions or gender reassignment and related consequence. ';
        const pg12paragraph12 ='12. Inpatient non-accident Dental and Ophthalmology (eye related treatments) subject to 1 year waiting period.';
        const pg12paragraph13 ='13. Costs of treatment for, related to Peri-Menopause, Menopause, Andropause, ageing and puberty.';
        const pg12paragraph14 ='14. Cosmetic or beauty treatment and/or surgery, obesity, removal of fat or other surplus tissue from any part of the body, whether or not for medical or psychological purposes, and any associated treatment costs consequent of such treatment. This shall include breast reduction or enlargement. The only exception is reconstructive surgery resulting from an accident.';
        const pg12paragraph15 ='15. Treatment for weight loss/gain, obesity, or weight problems. This includes but is not limited to the treatment of conditions such as bariatric, and any treatment required for any condition caused as a result of these conditions.';
        const pg12subHeading1Split = doc.splitTextToSize(pg12subHeading1, maxParagraphWidth);
        doc.text(pg12subHeading1Split, 13, 40); 
        const pg12paragraph1Split = doc.splitTextToSize(pg12paragraph1, maxParagraphWidth);
        doc.text(pg12paragraph1Split, 25, 45);
        const pg12paragraph2Split = doc.splitTextToSize(pg12paragraph2, maxParagraphWidth);
        doc.text(pg12paragraph2Split, 25, 73);
        const pg12paragraph3Split = doc.splitTextToSize(pg12paragraph3, maxParagraphWidth);
        doc.text(pg12paragraph3Split, 25, 83);
        const pg12paragraph4Split = doc.splitTextToSize(pg12paragraph4, maxParagraphWidth);
        doc.text(pg12paragraph4Split, 25, 106);
        const pg12paragraph5Split = doc.splitTextToSize(pg12paragraph5, maxParagraphWidth);
        doc.text(pg12paragraph5Split, 25, 125);
        const pg12paragraph6Split = doc.splitTextToSize(pg12paragraph6, maxParagraphWidth);
        doc.text(pg12paragraph6Split, 25, 145);
        const pg12paragraph7Split = doc.splitTextToSize(pg12paragraph7, maxParagraphWidth);
        doc.text(pg12paragraph7Split, 25, 160);
        const pg12paragraph8Split = doc.splitTextToSize(pg12paragraph8, maxParagraphWidth);
        doc.text(pg12paragraph8Split, 25, 165);
        const pg12paragraph9Split = doc.splitTextToSize(pg12paragraph9, maxParagraphWidth);
        doc.text(pg12paragraph9Split, 25, 190);
        const pg12paragraph10Split = doc.splitTextToSize(pg12paragraph10, maxParagraphWidth);
        doc.text(pg12paragraph10Split, 25, 205);
        const pg12paragraph11Split = doc.splitTextToSize(pg12paragraph11, maxParagraphWidth);
        doc.text(pg12paragraph11Split, 25, 210);
        const pg12paragraph12Split = doc.splitTextToSize(pg12paragraph12, maxParagraphWidth);
        doc.text(pg12paragraph12Split, 25, 235);
        const pg12paragraph13Split = doc.splitTextToSize(pg12paragraph13, maxParagraphWidth);
        doc.text(pg12paragraph13Split, 25, 245);
        const pg12paragraph14Split = doc.splitTextToSize(pg12paragraph14, maxParagraphWidth);
        doc.text(pg12paragraph14Split, 25, 255);
        const pg12paragraph15Split = doc.splitTextToSize(pg12paragraph15, maxParagraphWidth);
        doc.text(pg12paragraph15Split, 25, 275);

         // Move to next page
         doc.addPage();

         // Page 13: Policy Data Page
       doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
       doc.setLineWidth(1);  
       doc.line(10, 34 ,maxWidth,34);
       doc.setFontSize(11);
       const pg13paragraph1 ='16. Replacement of natural teeth and cost of orthodontic treatment of a cosmetic nature unless such treatment becomes necessary as a result of bodily injury sustained by the member, caused solely and directly by accidental external visible means or as a result of disease other than  normal decay.';
       const pg13paragraph2 ='17. Treatment to change the refraction of one or both eyes (laser eye correction) including refractive keratectomy (RK) and photorefractive Keratectomy (PRK), macular degeneration and similar conditions. However, corrective sight surgery consequent of an accident shall be covered excluding laser surgery.';
       const pg13paragraph3 ='18. Massage.';
       const pg13paragraph4 ='19. Any injury, illness or disease specified as an exclusion and complications caused by a condition that is excluded.';
       const pg13paragraph5 ='20. Prematurity, congenital illness and conditions related to genetic disorders, and/or chromosomal disorders and hereditary conditions subject to 12 months waiting period. ';
       const pg13paragraph6 ='21. Genetic testing.';
       const pg13paragraph7 ='22. Occupational /Speech Therapy. ';
       const pg13paragraph8 ='23. Costs for any illness, diseases or injuries arising from ear or body piercing and tattooing.';
       const pg13paragraph9 ='24. Costs associated with circumcision unless necessary for the treatment of a disease or necessitated by an Accident.';
       const pg13paragraph10 ='25. Pain management modalities such as injections with proliferative agents or experimental treatment and drugs not scientifically recognized or not proven to be effective based on established medical practice. ';
       const pg13paragraph11 ='26. Claims arising or related or associated with Epidemics/Pandemics except COVID-19.';
       const pg13paragraph12 ='27. Any claim for expenses relating to any contingency arising whilst the member is outside the territorial limits of Kenya, but this limitation shall not apply to any member temporarily abroad and requiring emergency treatment resulting from an illness or injury that occurs during the period of travel provided that such period does not exceed six weeks in any one trip. Travel and accommodation costs are not covered. ';
       const pg13paragraph13 ='28. Costs related to locating a replacement organ, removal of a donor organ from the donor, removal of an organ from the member for the purposes of transplantation into another person, purchase of a donor organ or transportation and all associated administration costs.';
       const pg13paragraph14 ='29. Cost of providing, maintaining, or fitting an external prosthesis or appliance subject to pre-authorization.';
       const pg13paragraph15 ='30. Medical aids including but not limited to Glucometers, blood pressure machines, and oxygen concentrators.';
       const pg13paragraph16 ='31. Bodily injury or disease and/or illness arising out of non-adherence to medical advice given by a registered medical practitioner. This shall include treatment required as a result of failure to seek or follow medical advice, hospital discharge or travel against medical advice.';
       const pg13paragraph17 ='32. Evacuation or travel costs not specifically authorised in writing by Birdview Microinsurance Limited prior to travelling. Evacuation or travel costs are not payable where treatment is obtained as outpatient.';
       const pg13paragraph18 ='33. All expenses in respect of illness/conditions that were subject to waiting periods when the member and dependents joined the policy and purchased the benefit.';
       const pg13paragraph19 ='34. Experimental treatment and drugs not scientifically recognised or not proven to be effective based on established medical practice.';
       const pg13paragraph20 ='35. Charges recoverable under any Workmen’s Injury Benefits Act, Personal Accident policies or Government Health Services Schemes of compensation including all NHIF benefits or any other medical plan.';
       const pg13paragraph1Split = doc.splitTextToSize(pg13paragraph1, maxParagraphWidth);
       doc.text(pg13paragraph1Split, 25, 40);
       const pg13paragraph2Split = doc.splitTextToSize(pg13paragraph2, maxParagraphWidth);
       doc.text(pg13paragraph2Split, 25, 60);
       const pg13paragraph3Split = doc.splitTextToSize(pg13paragraph3, maxParagraphWidth);
       doc.text(pg13paragraph3Split, 25, 80);
       const pg13paragraph4Split = doc.splitTextToSize(pg13paragraph4, maxParagraphWidth);
       doc.text(pg13paragraph4Split, 25, 85);
       const pg13paragraph5Split = doc.splitTextToSize(pg13paragraph5, maxParagraphWidth);
       doc.text(pg13paragraph5Split, 25, 95);
       const pg13paragraph6Split = doc.splitTextToSize(pg13paragraph6, maxParagraphWidth);
       doc.text(pg13paragraph6Split, 25, 105);
       const pg13paragraph7Split = doc.splitTextToSize(pg13paragraph7, maxParagraphWidth);
       doc.text(pg13paragraph7Split, 25, 110);
       const pg13paragraph8Split = doc.splitTextToSize(pg13paragraph8, maxParagraphWidth);
       doc.text(pg13paragraph8Split, 25, 115);
       const pg13paragraph9Split = doc.splitTextToSize(pg13paragraph9, maxParagraphWidth);
       doc.text(pg13paragraph9Split, 25, 120);
       const pg13paragraph10Split = doc.splitTextToSize(pg13paragraph10, maxParagraphWidth);
       doc.text(pg13paragraph10Split, 25, 130);
       const pg13paragraph11Split = doc.splitTextToSize(pg13paragraph11, maxParagraphWidth);
       doc.text(pg13paragraph11Split, 25, 145);
       const pg13paragraph12Split = doc.splitTextToSize(pg13paragraph12, maxParagraphWidth);
       doc.text(pg13paragraph12Split, 25, 150);
       const pg13paragraph13Split = doc.splitTextToSize(pg13paragraph13, maxParagraphWidth);
       doc.text(pg13paragraph13Split, 25, 175);
       const pg13paragraph14Split = doc.splitTextToSize(pg13paragraph14, maxParagraphWidth);
       doc.text(pg13paragraph14Split, 25, 190);
       const pg13paragraph15Split = doc.splitTextToSize(pg13paragraph15, maxParagraphWidth);
       doc.text(pg13paragraph15Split, 25, 200);
       const pg13paragraph16Split = doc.splitTextToSize(pg13paragraph16, maxParagraphWidth);
       doc.text(pg13paragraph16Split, 25, 210);
       const pg13paragraph17Split = doc.splitTextToSize(pg13paragraph17, maxParagraphWidth);
       doc.text(pg13paragraph17Split, 25, 225);
       const pg13paragraph18Split = doc.splitTextToSize(pg13paragraph18, maxParagraphWidth);
       doc.text(pg13paragraph18Split, 25, 240);
       const pg13paragraph19Split = doc.splitTextToSize(pg13paragraph19, maxParagraphWidth);
       doc.text(pg13paragraph19Split, 25, 250);
       const pg13paragraph20Split = doc.splitTextToSize(pg13paragraph20, maxParagraphWidth);
       doc.text(pg13paragraph20Split, 25, 260);


       
         // Move to next page
         doc.addPage();

         // Page 14: Policy Data Page
       doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
       doc.setLineWidth(1);  
       doc.line(10, 34 ,maxWidth,34);
       doc.setFontSize(11);
       const pg14Heading1 ='SECTION 4';
       const pg14subHeading4 ='PROVISIONS AND GENERAL CONDITIONS';
       const pg14Statement1 ='1. Policy and Schedule One Contract: ';
       const pg14paragraph1 ='This policy and the Schedule shall be read together as one contract and any word or expression to which a specific meaning has been attached in any part of this Policy or of the Schedule shall bear such specific meaning wherever it may appear.';
       const pg14Statement2 ='2. Inception of Insurance: ';
       const pg14paragraph2 ='No Insurance shall be in force or effective until the Proposal form has been accepted by the Company and the Insured has paid the premium.';
       const pg14Statement3 ='3. Insured Persons: ';
       const pg14paragraph3 ='An Insured Person shall be any person who with the prior consent of the Insurer shall have applied to the Company for membership by submitting an application form and a declaration of health and whose application shall have been accepted in writing by the Company. Dependants, if any, mentioned in the application for membership shall be deemed to fall within the definition "Insured Person" and the terms, conditions, limitations and exceptions of this policy shall apply to every dependant as if a separate application form and declaration of health had been submitted to the Company in each case. Eligible for the main member and his/her legal dependants from the age of 65 to 80 years';
       const pg14Statement4 ='4. Evidence required by the Company: ';
       const pg14paragraph4 ='Every person applying to be insured under this contract shall furnish to the Company at his own expense all such medical and other evidence as the Company may reasonably require and shall submit to medical examination by a Medical Officer to be appointed by the company if so required. During the term of the contract, the Company shall have the prerogative to require further medical examination and to have free access to medical records as may be deemed necessary.';
       const pg14Statement5 ='5. Grace Period: ';
       const pg14paragraph5 ='Thirty (30) days are allowed for payment of each renewal premium upon confirmation by the insured of renewal of cover. In the event of non- payment of premiums within the grace period, all the attached benefit cover shall lapse and become void.';
       const pg14Statement6 ='6. Approved Hospitals and Physicians: ';
       const pg14paragraph6 ='The Insurance expressed in this Policy shall be operative in respect of treatment received in any legally recognized hospital or from any legally registered medical practitioner registered with the Kenya Medical Practitioners and Dentists Board. Acupuncturists, Herbalists, Chiropractors and other alternative medicine practitioners are not recognized under this policy.';
       const pg14Statement7 ='7. Premiums: ';
       const pg14paragraph7 ='All premiums are payable to the Company annually in advance. The premium payable in respect of Insured Persons shall be paid to the Company immediately such Insured Persons are accepted by the Company. The company reserves the right to suspend access to services on credit basis if there is undue delay in premium payment.';
       const pg14Statement8 ='8. Insured Persons included during the currency of the period of Insurance: ';
       const pg14paragraph8 ='Full annual premium shall apply.';
       const pg14Statement9 ='9. Change of cover of insured persons: ';
       const pg14paragraph9 ='An Insured Person can only change their Benefit Option at policy renewal. Change of cover is subject to underwriting and acceptance by the company. Such upgrades will only be accepted within a period of thirty (30) days from the policy renewal or inception date. The Company reserves the right to decline any requested cover upgrades without giving reasons. ';
       const pg14Heading1Split = doc.splitTextToSize(pg14Heading1, maxParagraphWidth);
       doc.text(pg14Heading1Split, 13, 40);
       const pg14subHeading4Split = doc.splitTextToSize(pg14subHeading4, maxParagraphWidth);
       doc.text(pg14subHeading4Split, 50, 40);
       doc.line(10, 45,maxWidth,45);
       doc.setFont("Helvetica", "bold"); 
       const pg14Statement1Split = doc.splitTextToSize(pg14Statement1, maxParagraphWidth);
       doc.text(pg14Statement1Split, 25, 50);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph1Split = doc.splitTextToSize(pg14paragraph1, maxParagraphWidth);
       doc.text(pg14paragraph1Split, 29, 55);
       doc.setFont("Helvetica", "bold"); 
       const pg14Statement2Split = doc.splitTextToSize(pg14Statement2, maxParagraphWidth);
       doc.text(pg14Statement2Split, 25, 70);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph2Split = doc.splitTextToSize(pg14paragraph2, maxParagraphWidth);
       doc.text(pg14paragraph2Split, 29, 75);
       doc.setFont("Helvetica", "bold");
       const pg14Statement3Split = doc.splitTextToSize(pg14Statement3, maxParagraphWidth);
       doc.text(pg14Statement3Split, 25, 85);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph3Split = doc.splitTextToSize(pg14paragraph3, maxParagraphWidth);
       doc.text(pg14paragraph3Split, 29, 90);
       doc.setFont("Helvetica", "bold");
       const pg14Statement4Split = doc.splitTextToSize(pg14Statement4, maxParagraphWidth);
       doc.text(pg14Statement4Split, 25, 128);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph4Split = doc.splitTextToSize(pg14paragraph4, maxParagraphWidth);
       doc.text(pg14paragraph4Split, 29, 132);
       doc.setFont("Helvetica", "bold");
       const pg14Statement5Split = doc.splitTextToSize(pg14Statement5, maxParagraphWidth);
       doc.text(pg14Statement5Split, 25, 155);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph5Split = doc.splitTextToSize(pg14paragraph5, maxParagraphWidth);
       doc.text(pg14paragraph5Split, 29, 160);
       doc.setFont("Helvetica", "bold");
       const pg14Statement6Split = doc.splitTextToSize(pg14Statement6, maxParagraphWidth);
       doc.text(pg14Statement6Split, 25, 175);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph6Split = doc.splitTextToSize(pg14paragraph6, maxParagraphWidth);
       doc.text(pg14paragraph6Split, 29, 180);
       doc.setFont("Helvetica", "bold");
       const pg14Statement7Split = doc.splitTextToSize(pg14Statement7, maxParagraphWidth);
       doc.text(pg14Statement7Split, 25, 200);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph7Split = doc.splitTextToSize(pg14paragraph7, maxParagraphWidth);
       doc.text(pg14paragraph7Split, 29, 205);
       doc.setFont("Helvetica", "bold");
       const pg14Statement8Split = doc.splitTextToSize(pg14Statement8, maxParagraphWidth);
       doc.text(pg14Statement8Split, 25, 225);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph8Split = doc.splitTextToSize(pg14paragraph8, maxParagraphWidth);
       doc.text(pg14paragraph8Split, 29, 230);
       doc.setFont("Helvetica", "bold");
       const pg14Statement9Split = doc.splitTextToSize(pg14Statement9, maxParagraphWidth);
       doc.text(pg14Statement9Split, 25, 235);
       doc.setFont("Helvetica", "normal");
       const pg14paragraph9Split = doc.splitTextToSize(pg14paragraph9, maxParagraphWidth);
       doc.text(pg14paragraph9Split, 29, 240);


         // Move to next page
         doc.addPage();

         // Page 15: Policy Data Page
       doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
       doc.setLineWidth(1);  
       doc.line(10, 34 ,maxWidth,34);
       doc.setFontSize(11);
       const pg15Statement1 =`10. Company's Right to Decline Renewal: `;
       const pg15paragraph1 ='The Company shall not be bound to renew this Policy nor give notice that it is due for renewal. The Company shall have the right to decline or qualify the terms of the Insurance in respect of all or any Insured Persons on giving to the Insured seven (7) days registered notice in writing prior to any Annual Renewal Date.';
       const pg15Statement2 ='11. Cancellation: ';
       const pg15paragraph2 ='Cancellation can only be done within 30 days from commencement date and shall attract a prorated premium refund for the remaining days to policy expiry subject to no claims incurred and/or reported less administration expenses at 15%. There will be no refund on cancellation by the member after 30 days from commencement date.';
       const pg15Statement3 ='12. Reinstatement of Cover: ';
       const pg15paragraph3 ='The policy will lapse on the eve of the renewal date. Any policy not renewed within 30 days after the renewal date will be subject to the terms and conditions of a new policy. ';
       const pg15Statement4 ='13. Notification of Claims: ';
       const pg15paragraph4 ='In the event of any illness or accident giving rise to a claim under this Policy the Insured shall as soon as possible send notification in writing to the Company and submit a duly completed claim form within sixty (60) days of the commencement of illness or the date of the accident. The Insured shall obtain and furnish the Company with all original bills, receipts and other documents upon which a claim is based and shall also give the Company any such additional information and assistance as the Company may require. The liability of the Company in respect of any contingency in any Period of Insurance giving rise to a claim hereunder shall be limited in respect of such claim to the period of three calendar months immediately following the next Annual Renewal Date and to the maximum benefits as stated in the Schedule.';
       const pg15Statement5 ='14. Case Management: ';
       const pg15paragraph5 ='The Medical treatment of a member as an In Patient shall be managed as described below:';
       const pg15list1 ='a) The service or treatment prescribed must be medically necessary.';
       const pg15list2 ='b) The service must have been preauthorized as per the Company Preauthorization procedures.';
       const pg15list3 ='c) The service, medication or supplies that the member is charged must relate to the reason for the admission and any expenses for treatment that is unrelated to the reason for admission as indicated in the preauthorization form will be deemed unpayable by the Company.';
       const pg15Statement6 ='15. Simultaneous Illness & Injuries: ';
       const pg15paragraph6 ='All disorders or injuries existing simultaneously which are due to the same or related caused or any one accident shall be considered as one sickness or accidental bodily injury.';
       const pg15Statement7 ='16. Arbitration: ';
       const pg15list4 ='a. Any dispute on matters involving a medical decision including reasonable and customary medical services and charges which cannot be settled by the parties may be referred to the arbitration of two qualified doctors to be agreed upon by the parties and in default of such agreements both to be nominated by the medical practitioners and dentist board'; 
       const pg15list5 ='b. Any other disputes between the parties, no being medical matter, with reference to or in connection with any part of the contract regarding the construction, meaning or effect of any provision hereof, the duties of the parties hereunder which cannot be settled by the parties may be referred to a single arbitration to be agreed upon between the parties and in default of agreement, one to be nominated by the Chartered Institute of Arbitrators of Kenya, with each party bearing its own costs of Arbitration. ';
       doc.setFont("Helvetica", "bold"); 
       const pg15Statement1Split = doc.splitTextToSize(pg15Statement1, maxParagraphWidth);
       doc.text(pg15Statement1Split, 25, 40);
       doc.setFont("Helvetica", "normal");
       const pg15paragraph1Split = doc.splitTextToSize(pg15paragraph1, maxParagraphWidth);
       doc.text(pg15paragraph1Split, 29, 45);
       doc.setFont("Helvetica", "bold");
       const pg15Statement2Split = doc.splitTextToSize(pg15Statement2, maxParagraphWidth);
       doc.text(pg15Statement2Split, 25, 65);
       doc.setFont("Helvetica", "normal");
       const pg15paragraph2Split = doc.splitTextToSize(pg15paragraph2, maxParagraphWidth);
       doc.text(pg15paragraph2Split, 29, 70);
       doc.setFont("Helvetica", "bold");
       const pg15Statement3Split = doc.splitTextToSize(pg15Statement3, maxParagraphWidth);
       doc.text(pg15Statement3Split, 25, 90);
       doc.setFont("Helvetica", "normal");
       const pg15paragraph3Split = doc.splitTextToSize(pg15paragraph3, maxParagraphWidth);
       doc.text(pg15paragraph3Split, 29, 95);
       doc.setFont("Helvetica", "bold");
       const pg15Statement4Split = doc.splitTextToSize(pg15Statement4, maxParagraphWidth);
       doc.text(pg15Statement4Split, 25, 105);
       doc.setFont("Helvetica", "normal");
       const pg15paragraph4Split = doc.splitTextToSize(pg15paragraph4, maxParagraphWidth);
       doc.text(pg15paragraph4Split, 29, 110);
       doc.setFont("Helvetica", "bold");
       const pg15Statement5Split = doc.splitTextToSize(pg15Statement5, maxParagraphWidth);
       doc.text(pg15Statement5Split, 25, 151);
       doc.setFont("Helvetica", "normal");
       const pg15paragraph5Split = doc.splitTextToSize(pg15paragraph5, maxParagraphWidth);
       doc.text(pg15paragraph5Split, 29, 156);
       const pg15list1Split = doc.splitTextToSize(pg15list1, maxParagraphWidth);
       doc.text(pg15list1Split, 32, 160);
       const pg15list2Split = doc.splitTextToSize(pg15list2, maxParagraphWidth);
       doc.text(pg15list2Split, 32, 165);
       const pg15list3Split = doc.splitTextToSize(pg15list3, maxParagraphWidth);
       doc.text(pg15list3Split, 32, 170);
       doc.setFont("Helvetica", "bold");
       const pg15Statement6Split = doc.splitTextToSize(pg15Statement6, maxParagraphWidth);
       doc.text(pg15Statement6Split, 25, 185);
       doc.setFont("Helvetica", "normal");
       const pg15paragraph6Split = doc.splitTextToSize(pg15paragraph6, maxParagraphWidth);
       doc.text(pg15paragraph6Split, 29, 190);
       doc.setFont("Helvetica", "bold");
       const pg15Statement7Split = doc.splitTextToSize(pg15Statement7, maxParagraphWidth);
       doc.text(pg15Statement7Split, 25, 200);
       doc.setFont("Helvetica", "normal");
       const pg15list4Split = doc.splitTextToSize(pg15list4, maxParagraphWidth);
       doc.text(pg15list4Split, 32, 205);
       const pg15list5Split = doc.splitTextToSize(pg15list5, maxParagraphWidth);
       doc.text(pg15list5Split, 32, 225);


          // Move to next page
          doc.addPage();

          // Page 16: Policy Data Page
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
        doc.setLineWidth(1);  
        doc.line(10, 34 ,maxWidth,34);
        doc.setFontSize(11);
        const pg16Statement1 ='17. Time Bar: ';
        const pg16paragraph1 ='In the event of the Company disclaiming liability in respect of any claim hereunder the Company shall not be liable in relation to such claim or possible claim after the expiry of 60 (sixty) days from the date of such disclaimer unless the disclaimer shall be the subject of pending legal proceedings or arbitrator.';
        const pg16Statement2 ='18. Jurisdiction:';
        const pg16paragraph2 ='Any legal proceedings instituted in connection with this Policy shall be brought before a court of competent jurisdiction in the Republic of Kenya.';
        const pg16Statement3 ='19. Contribution Clause: ';
        const pg16paragraph3 ='If at any time of any event in respect of which a claim arises, or which may be made under this policy, issued by the Company, there is any other insurance  effected by or on behalf of the insured covering defined events, the Company shall not be liable to pay or contribute more than its ratable proportion of any sum payable in respect of such event. If any such other insurance shall be subject to any condition of average this policy if not subject to any condition of average shall be subjected to average in like manner. If any other insurance effected by or on behalf of the insured is expressed to cover any of the defined events hereby insured but is subject to any provision whereby it is excluded from ranking concurrently with this policy either in whole or in part or from contributing ratably to the loss the company shall not be liable to pay or contribute more than its ratable proportion of any loss which the sum insured hereby bears to the total amount/loss payable.';
        const pg16Statement4 ='20. NHIF Membership: ';
        const pg16paragraph4 ='Insured members must obtain NHIF membership as NHIF related costs will not be paid under this cover';
        const pg16Statement5 ='21. Subrogation: ';
        const pg16paragraph5 ='The insured member shall do and concur in doing and permit to be done all such acts and things as may be necessary or required by Birdview Microinsurance Limited, before or after indemnification, in enforcing or endorsing any rights or remedies, or of obtaining relief or indemnity, to which We are or would become entitled or subrogated. Neither the member nor any insured person shall admit liability or do any acts or things that prejudice these Subrogation rights in any manner.  Any recovery made by the Birdview Microinsurance Limited pursuant to this clause shall first be applied to the amounts paid or payable by Birdview Microinsurance Limited under this policy and the costs and expenses incurred by us in effecting the recovery, where after we shall pay the balance amount to you. The Insured is required to notify Birdview Microinsurance Limited within 30 days of receipt of any notice given to any party and co-operate fully in all efforts to recover any payments made under this policy including any legal proceedings we may conduct and proceed on behalf of the insured and/or member at Birdview Microinsurance Limited’s sole discretion.';
        const pg16Statement6 ='22. Fraudulent/Unfounded Claims: ';
        const pg16paragraph6 ='If any claim under this policy is in any respect fraudulent, false, intentionally exaggerated, or unfounded or if any false declaration or statement shall be made in support thereof then, all benefits paid and/or payable in relation to that claim shall be forfeited and are recoverable by Birdview Microinsurance Limited. In addition, all cover in respect of the Insured person shall be cancelled with immediate effect i.e., upon detection of the fraudulent claims without refund of premiums, and the member shall no longer be eligible for cover for any future periods. Under Section 204B of the Insurance (Amendment) Act 2019, insurance fraud is a legal offence and Birdview Microinsurance Limited reserves the right to institute legal charges and/or proceedings against the Insured member(s).';
        doc.setFont("Helvetica", "bold"); 
        const pg16Statement1Split = doc.splitTextToSize(pg16Statement1, maxParagraphWidth);
        doc.text(pg16Statement1Split, 25, 40);
        doc.setFont("Helvetica", "normal");
        const pg16paragraph1Split = doc.splitTextToSize(pg16paragraph1, maxParagraphWidth);
        doc.text(pg16paragraph1Split, 29, 45);
        doc.setFont("Helvetica", "bold"); 
        const pg16Statement2Split = doc.splitTextToSize(pg16Statement2, maxParagraphWidth);
        doc.text(pg16Statement2Split, 25, 64);
        doc.setFont("Helvetica", "normal");
        const pg16paragraph2Split = doc.splitTextToSize(pg16paragraph2, maxParagraphWidth);
        doc.text(pg16paragraph2Split, 29, 70);
        doc.setFont("Helvetica", "bold");
        const pg16Statement3Split = doc.splitTextToSize(pg16Statement3, maxParagraphWidth);
        doc.text(pg16Statement3Split, 25, 80);
        doc.setFont("Helvetica", "normal");
        const pg16paragraph3Split = doc.splitTextToSize(pg16paragraph3, maxParagraphWidth);
        doc.text(pg16paragraph3Split, 29, 85);
        doc.setFont("Helvetica", "bold");
        const pg16Statement4Split = doc.splitTextToSize(pg16Statement4, maxParagraphWidth);
        doc.text(pg16Statement4Split, 25, 130);
        doc.setFont("Helvetica", "normal");
        const pg16paragraph4Split = doc.splitTextToSize(pg16paragraph4, maxParagraphWidth);
        doc.text(pg16paragraph4Split, 29, 135);
        doc.setFont("Helvetica", "bold");
        const pg16Statement5Split = doc.splitTextToSize(pg16Statement5, maxParagraphWidth);
        doc.text(pg16Statement5Split, 25, 145);
        doc.setFont("Helvetica", "normal");
        const pg16paragraph5Split = doc.splitTextToSize(pg16paragraph5, maxParagraphWidth);
        doc.text(pg16paragraph5Split, 29, 150);
        doc.setFont("Helvetica", "bold");
        const pg16Statement6Split = doc.splitTextToSize(pg16Statement6, maxParagraphWidth);
        doc.text(pg16Statement6Split, 25, 205);
        doc.setFont("Helvetica", "normal");
        const pg16paragraph6Split = doc.splitTextToSize(pg16paragraph6, maxParagraphWidth);
        doc.text(pg16paragraph6Split, 29, 210);

         // Move to next page
         doc.addPage();

          // Page 17: Policy Data Page
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
        doc.setLineWidth(1);  
        doc.line(10, 34 ,maxWidth,34);
        doc.setFontSize(11);
        const pg17Statement1 ='23. Taxes: ';
        const pg17paragraph1 ='We reserve the right to reflect any changes in insurance premium or other government levies as may be imposed on us.';
        const pg17Statement2 ='24. Notices:';
        const pg17paragraph2 ='Any notice, direction or instruction given under this policy shall be in writing and delivered by hand or post   to:- ';
        const pg17paragraph3 ='The Principal Officer';
        const pg17paragraph4 ='Birdview Microinsurance Limited';
        const pg17paragraph5 ='Ground Floor, Fidelity Center, Waiyaki Way, Westlands, Nairobi, Kenya';
        const pg17paragraph6 ='P.O. Box 2000, Nairobi, Kenya';
        const pg17paragraph7 ='Nairobi';
        const pg17paragraph8 ='In addition, Birdview Microinsurance Limited will send the administrator and insured members other information through electronic means with respect to your policy from time to time.';
        const pg17paragraph9 ='This insurance is made and accepted subject to all the provisions, conditions and warranties set forth herein and, in any forms, or endorsements attached hereto all of which are to be considered as incorporated herein, and any provisions or conditions appearing in any forms or endorsements attached hereto which alter the insurance provisions stated above shall supersede such insurance provisions in so far as they are inconsistent therewith.';
        const pg17Heading1 ='SECTION 5';
        const pg17subHeading1 ='COMPLAINT PROCEDURE';
        const pg17paragraph10 ='The scheme administration provides for service level standards which outline the complaints procedures and processes. In the event that the above process fails to address the issues raised and to ensure customer satisfaction, complaints can be communicated via the employer through the following contacts:';
        const pg17paragraph11 ='Principal Officer';
        const pg17paragraph12 ='Birdview Microinsurance Limited';
        const pg17paragraph13 ='P.O. Box 45157, 00200';
        const pg17paragraph14 ='Nairobi';
        const pg17paragraph15 ='KENYA';
        const pg17paragraph16 ='Email: customerservice@birdviewinsurance.com';

        doc.setFont("Helvetica", "bold"); 
        const pg17Statement1Split = doc.splitTextToSize(pg17Statement1, maxParagraphWidth);
        doc.text(pg17Statement1Split, 25, 40);
        doc.setFont("Helvetica", "normal");
        const pg17paragraph1Split = doc.splitTextToSize(pg17paragraph1, maxParagraphWidth);
        doc.text(pg17paragraph1Split, 29, 45);
        doc.setFont("Helvetica", "bold");
        const pg17Statement2Split = doc.splitTextToSize(pg17Statement2, maxParagraphWidth);
        doc.text(pg17Statement2Split, 25, 55);
        doc.setFont("Helvetica", "normal");
        const pg17paragraph2Split = doc.splitTextToSize(pg17paragraph2, maxParagraphWidth);
        doc.text(pg17paragraph2Split, 29, 60);
        const pg17paragraph3Split = doc.splitTextToSize(pg17paragraph3, maxParagraphWidth);
        doc.text(pg17paragraph3Split, 29,70);
        const pg17paragraph4Split = doc.splitTextToSize(pg17paragraph4, maxParagraphWidth);
        doc.text(pg17paragraph4Split, 29, 75);
        const pg17paragraph5Split = doc.splitTextToSize(pg17paragraph5, maxParagraphWidth);
        doc.text(pg17paragraph5Split, 29, 80);
        const pg17paragraph6Split = doc.splitTextToSize(pg17paragraph6, maxParagraphWidth);
        doc.text(pg17paragraph6Split, 29, 85);
        const pg17paragraph7Split = doc.splitTextToSize(pg17paragraph7, maxParagraphWidth);
        doc.text(pg17paragraph7Split, 29, 90);
        const pg17paragraph8Split = doc.splitTextToSize(pg17paragraph8, maxParagraphWidth);
        doc.text(pg17paragraph8Split, 29, 100);
        const pg17paragraph9Split = doc.splitTextToSize(pg17paragraph9, maxParagraphWidth);
        doc.text(pg17paragraph9Split, 29, 110);
        doc.line(10, 140 ,maxWidth,140);
        const pg17Heading1Split = doc.splitTextToSize(pg17Heading1, maxParagraphWidth);
        doc.text(pg17Heading1Split, 13, 146);
        const pg17subHeading1Split = doc.splitTextToSize(pg17subHeading1, maxParagraphWidth);
        doc.text(pg17subHeading1Split, 50, 146);
        doc.line(10, 150 ,maxWidth,150);
        const pg17paragraph10Split = doc.splitTextToSize(pg17paragraph10, maxParagraphWidth);
        doc.text(pg17paragraph10Split, 13, 155);
        const pg17paragraph11Split = doc.splitTextToSize(pg17paragraph11, maxParagraphWidth);
        doc.text(pg17paragraph11Split,  13, 175);
        const pg17paragraph12Split = doc.splitTextToSize(pg17paragraph12, maxParagraphWidth);
        doc.text(pg17paragraph12Split,  13, 180);
        const pg17paragraph13Split = doc.splitTextToSize(pg17paragraph13, maxParagraphWidth);
        doc.text(pg17paragraph13Split,  13, 185);
        const pg17paragraph14Split = doc.splitTextToSize(pg17paragraph14, maxParagraphWidth);
        doc.text(pg17paragraph14Split,  13, 190);
        const pg17paragraph15Split = doc.splitTextToSize(pg17paragraph15, maxParagraphWidth);
        doc.text(pg17paragraph15Split,  13, 195);
        const pg17paragraph16Split = doc.splitTextToSize(pg17paragraph16, maxParagraphWidth);
        doc.text(pg17paragraph16Split,  13, 200);


         // Move to next page
         doc.addPage();

          // Page 18: Policy Data Page
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
        doc.setLineWidth(1);  
        doc.line(10, 34 ,maxWidth,34);
        doc.setFontSize(11);
        const pg18Heading1 ='SECTION 6';
        const pg18subHeading1 ='CLAIMS PROCEDURE';
        const pg18subHeading2 ='(A). Inpatient Pre-authorisation';
        const pg18paragraph1 ='Prior approval must be sought before accessing treatment for the benefits listed below.';
        const pg18paragraph2 ='Birdview Microinsurance Limited will then confirm eligibility, verify the benefit limits, and issue an approval to the provider authorising the treatment. ';
        const pg18paragraph3 ='For emergency admissions, Birdview Microinsurance Limited must be advised within 48 hours of admission in order to obtain authorisation before the patient leaves the hospital.';
        const pg18paragraph4 ='At the hospital and before discharge members will be required to completed and sign a Birdview Microinsurance Limited claim form.';
        const pg18paragraph5 ='Failure to preauthorise for treatment may make invalidate a claim.';
        const pg18paragraph6 ='Customary and reasonable rates will be applied at all times.';
        const pg18Statement1 ='Benefits requiring Preauthorisation of Treatment';
        const pg18paragraph7 ='The following benefits need to be preauthorised in advance of treatment: -';
        const pg18list1 ='1. All Inpatient admissions';
        const pg18list2 ='2. All Day-case procedures';
        const pg18list3 ='3. Childbirth/Delivery admission ';
        const pg18list4 ='4. Radiotherapy & Chemotherapy ';
        const pg18list5 ='5. Home Nursing ';
        const pg18list6 ='6. All Evacuations (by road or air) ';
        const pg18list7 ='7. Out of country inpatient treatment ';
        const pg18list8 ='8. All therapy sessions; Not limited to Physiotherapy, hydrotherapy, occupational and speech therapy  ';
        const pg18list9 ='9. Advanced Radiology (CT Scans/MRI’s, PET Scan) ';
        const pg18list10 ='10. All High valued outpatient diagnostics, prescriptions & procedures as determined by Birdview Microinsurance Limited. ';
        const pg18list11 ='11. Dental and Optical treatment ';
        const pg18list12 ='12. All other pain management modalities: Not limited to injections, procedures, and related therapies.';
        const pg18subHeading3 ='(B). Medical Helpline';
        const pg18paragraph8 ='All members can access our medical emergency lines (+254 742 222 888) which are available 24 hours a day, 365 days a year.  Members will need to provide some verification details. ';
        const pg18subHeading4 ='(C). Outpatient Claims';
        const pg18subHeading5 ='Use of Credit facilities';
        const pg18paragraph9 ='The member can access outpatient treatment on credit by presenting the Birdview Microinsurance membership card at the service providers. The service provider will verify the identity of the member and the eligible benefits and treatment will be rendered. The provider may request additional identification e.g., National Identity Card.';
        const pg18paragraph10 ='The member or (guardian where applicable) must complete and sign the Birdview Microinsurance claim form (available at the service provider’s facility). The attending Physician must also complete and sign the claim form. A separate claim form is required for each treatment and each person.';
        const pg18subHeading6 ='Reimbursement claims';
        const pg18paragraph11 ='For reimbursement of eligible medical expenses incurred as a result of an illness or accident a member should submit a medical claim form with supporting documents.The claim form must be fully completed and signed by both the member and treating Physician.';
      
        doc.setFont("Helvetica", "bold"); 
        const pg18Heading1Split = doc.splitTextToSize(pg18Heading1, maxParagraphWidth);
        doc.text(pg18Heading1Split, 13, 41);
        const pg18subHeading1Split = doc.splitTextToSize(pg18subHeading1, maxParagraphWidth);
        doc.text(pg18subHeading1Split, 50, 41);
        doc.line(10, 45 ,maxWidth,45);
        const pg18subHeading2Split = doc.splitTextToSize(pg18subHeading2, maxParagraphWidth);
        doc.text(pg18subHeading2Split, 13, 50);
        doc.setFont("Helvetica", "normal");
        const pg18paragraph1Split = doc.splitTextToSize(pg18paragraph1, maxParagraphWidth);
        doc.text(pg18paragraph1Split, 17, 55);
        const pg18paragraph2Split = doc.splitTextToSize(pg18paragraph2, maxParagraphWidth);
        doc.text(pg18paragraph2Split, 17, 60);
        const pg18paragraph3Split = doc.splitTextToSize(pg18paragraph3, maxParagraphWidth);
        doc.text(pg18paragraph3Split, 17, 70 );
        const pg18paragraph4Split = doc.splitTextToSize(pg18paragraph4, maxParagraphWidth);
        doc.text(pg18paragraph4Split, 17, 80);
        const pg18paragraph5Split = doc.splitTextToSize(pg18paragraph5, maxParagraphWidth);
        doc.text(pg18paragraph5Split, 17, 90);
        const pg18paragraph6Split = doc.splitTextToSize(pg18paragraph6, maxParagraphWidth);
        doc.text(pg18paragraph6Split, 17, 95);
        doc.setFont("Helvetica", "bold"); 
        const pg18Statement1Split = doc.splitTextToSize(pg18Statement1, maxParagraphWidth);
        doc.text(pg18Statement1Split, 23, 100);
        doc.setFont("Helvetica", "normal"); 
        const pg18paragraph7Split = doc.splitTextToSize(pg18paragraph7, maxParagraphWidth);
        doc.text(pg18paragraph7Split,23, 105);
        const pg18list1Split = doc.splitTextToSize(pg18list1, maxParagraphWidth);
        doc.text(pg18list1Split,25, 110);
        const pg18list2Split = doc.splitTextToSize(pg18list2, maxParagraphWidth);
        doc.text(pg18list2Split,25, 115);
        const pg18list3Split = doc.splitTextToSize(pg18list3, maxParagraphWidth);
        doc.text(pg18list3Split,25, 120);
        const pg18list4Split = doc.splitTextToSize(pg18list4, maxParagraphWidth);
        doc.text(pg18list4Split,25, 125);
        const pg18list5Split = doc.splitTextToSize(pg18list5, maxParagraphWidth);
        doc.text(pg18list5Split,25, 130);
        const pg18list6Split = doc.splitTextToSize(pg18list6, maxParagraphWidth);
        doc.text(pg18list6Split,25, 135);
        const pg18list7Split = doc.splitTextToSize(pg18list7, maxParagraphWidth);
        doc.text(pg18list7Split,25, 140);
        const pg18list8Split = doc.splitTextToSize(pg18list8, maxParagraphWidth);
        doc.text(pg18list8Split,25, 145);
        const pg18list9Split = doc.splitTextToSize(pg18list9, maxParagraphWidth);
        doc.text(pg18list9Split,25, 155);
        const pg18list10Split = doc.splitTextToSize(pg18list10, maxParagraphWidth);
        doc.text(pg18list10Split,25, 160);
        const pg18list11Split = doc.splitTextToSize(pg18list11, maxParagraphWidth);
        doc.text(pg18list11Split,25, 170);
        const pg18list12Split = doc.splitTextToSize(pg18list12, maxParagraphWidth);
        doc.text(pg18list12Split,25, 175);
        const pg18subHeading3Split = doc.splitTextToSize(pg18subHeading3, maxParagraphWidth);
        doc.text(pg18subHeading3Split, 13, 185);
        const pg18paragraph8Split = doc.splitTextToSize(pg18paragraph8, maxParagraphWidth);
        doc.text(pg18paragraph8Split, 17, 190);
        doc.setFont("Helvetica", "bold"); 
        const pg18subHeading4Split = doc.splitTextToSize(pg18subHeading4, maxParagraphWidth);
        doc.text(pg18subHeading4Split, 13, 200);
        const pg18subHeading5Split = doc.splitTextToSize(pg18subHeading5, maxParagraphWidth);
        doc.text(pg18subHeading5Split, 13, 205);
        doc.setFont("Helvetica", "normal"); 
        const pg18paragraph9Split = doc.splitTextToSize(pg18paragraph9, maxParagraphWidth);
        doc.text(pg18paragraph9Split, 17, 210);
        const pg18paragraph10Split = doc.splitTextToSize(pg18paragraph10, maxParagraphWidth);
        doc.text(pg18paragraph10Split, 17, 230);
        doc.setFont("Helvetica", "bold"); 
        const pg18subHeading6Split = doc.splitTextToSize(pg18subHeading6, maxParagraphWidth);
        doc.text(pg18subHeading6Split, 13, 245);
        doc.setFont("Helvetica", "normal"); 
        const pg18paragraph11Split = doc.splitTextToSize(pg18paragraph11, maxParagraphWidth);
        doc.text(pg18paragraph11Split, 17, 250);

        // Move to next page
        doc.addPage();

          // Page 19: Policy Data Page
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
        doc.setLineWidth(1);  
        doc.line(10, 34 ,maxWidth,34);
        doc.setFontSize(11);
        const pg19paragraph1 ='Original invoices, receipts and other supporting documents including laboratory test requests and results pertaining to the claim must be submitted together with the claim form.';
        const pg19paragraph2 ='Where a specialist has been consulted, a referral letter from the General Practitioner referring the member to the specialist will be required.';
        const pg19subHeading1 ='(D). Other Claims';
        const pg19paragraph3 ='Completed benefit claim form Other required documents as stipulated on the product brochure';
        const pg19subHeading2 ='(e). Claims Declinature';
        const pg19paragraph4 ='Where the Insurer alleges that any medical expense is not covered by the policy, the burden of proving that such expense is covered shall be upon the Member.';
        const pg19Heading1 ='SECTION 7';
        const pg19subHeading4 ='PROPOSAL AND DECLARATION (ATTACHMENT)';
        const pg19paragraph1Split = doc.splitTextToSize(pg19paragraph1, maxParagraphWidth);
        doc.text(pg19paragraph1Split, 17, 40);
        const pg19paragraph2Split = doc.splitTextToSize(pg19paragraph2, maxParagraphWidth);
        doc.text(pg19paragraph2Split, 17, 50);
        doc.setFont("Helvetica", "bold"); 
        const pg19subHeading1Split = doc.splitTextToSize(pg19subHeading1, maxParagraphWidth);
        doc.text(pg19subHeading1Split, 13, 60);
        doc.setFont("Helvetica", "normal"); 
        const pg19paragraph3Split = doc.splitTextToSize(pg19paragraph3, maxParagraphWidth);
        doc.text(pg19paragraph3Split, 17, 65);
        doc.setFont("Helvetica", "bold");
        const pg19subHeading2Split = doc.splitTextToSize(pg19subHeading2, maxParagraphWidth);
        doc.text(pg19subHeading2Split, 13, 75);
        doc.setFont("Helvetica", "normal");
        const pg19paragraph4Split = doc.splitTextToSize(pg19paragraph4, maxParagraphWidth);
        doc.text(pg19paragraph4Split, 17, 80);
        doc.setFont("Helvetica", "bold"); 
        doc.line(10, 95,maxWidth,95);
        const pg19Heading1Split = doc.splitTextToSize(pg19Heading1, maxParagraphWidth);
        doc.text(pg19Heading1Split, 13, 101);
        const pg19subHeading4Split = doc.splitTextToSize(pg19subHeading4, maxParagraphWidth);
        doc.text(pg19subHeading4Split, 50, 101);
        doc.line(10, 105 ,maxWidth,105);

 
        // Move to next page
        doc.addPage();

        // Page 20:  
        doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
        doc.setLineWidth(1);  
        const pg20Heading1 ='SECTION 8';
        const pg20subHeading1 ='THE SCHEDULE OF BENEFITS (ATTACHMENT)';
        
        doc.line(10, 34 ,maxWidth,34);
        const pg20Heading1Split = doc.splitTextToSize(pg20Heading1, maxParagraphWidth);
        doc.text(pg20Heading1Split, 13, 41);
        const pg20subHeading1Split = doc.splitTextToSize(pg20subHeading1, maxParagraphWidth);
        doc.text(pg20subHeading1Split, 50, 41);
        doc.line(10, 45 ,maxWidth,45);

        const pg20pageWidth = doc.internal.pageSize.getWidth(); // Get full width of the page
        const pg20pageHeight = doc.internal.pageSize.getHeight(); // Get full height of the page
        const pg20pageMargin = 10; // Margin from the sides
        const pg20tableWidth = pg20pageWidth - pg20pageMargin * 2; // Total width of the table (accounting for the margins)
        const pg20leftColumnWidth = pg20tableWidth * 0.4; // 40% for the first column
        const pg20midColumnWidth = pg20tableWidth * 0.2; // 20% for middle column
        const pg20rightColumnWidth = pg20tableWidth * 0.2; // 20% for right columns
        let pg20startX = pg20pageMargin; // Start position on the X-axis (with margin)
        let pg20startY = 50; // Starting Y position for the table
        const pg20rowHeight = 10; // Row height
        const pg20pageMarginTop = 30; // Top margin for the new page
        const pg20pageMarginBottom = 10; // Bottom margin to ensure content doesn't overflow page

        // Define the table rows data
        const pg20benefitsData = [
            { left: 'Overall Inpatient limit', middle: '200,000', right: '300,000', extra: '500,000' },
            { left: 'Mode of Identification', middle: 'Smart Cards', right: 'Smart Cards', extra: 'Smart Cards' },
            { left: 'Territorial Limit', middle: 'East Africa', right: 'East Africa', extra: 'East Africa' },
            { left: 'Hospital Bed Accommodation', middle: 'General ward bed', right: 'General ward bed', extra: 'General ward bed' },
            { left: 'Accident Waiting Period', middle: '0 days', right: '1 days', extra: '2 days' },
            { left: 'Dependant Age Limit – Lower', middle: '18 Years', right: '18 Years', extra: '18 Years' },
            { left: 'Adult Age Limit - Upper', middle: '80 Years', right: '80 Years', extra: '80 Years' },
            { left: 'Adult Age Limit Extension on renewal', middle: '85 Years', right: '85 Years', extra: '85 Years' },
            { left: 'Dependant Age Limit Extension with proof of Schooling', middle: '25 Years', right: '25 Years', extra: '25 Years' },
            { left: 'Pre-existing conditions, gynaecological, Hernias, Haemorrhoids, organ transplant, HIV/AIDS and related conditions (1 year waiting period)', middle: '100,000', right: '150,000', extra: '250,000' },
            { left: 'Maternity Cover including all Caesarean sections, Normal delivery (1 year waiting period)', middle: '50,000', right: '60,000', extra: '75,000' },
            { left: 'Post Hospitalization Treatment', middle: 'Up to Kshs.10,000', right: 'Up to Kshs.15,000', extra: 'Up to Kshs.17,500' },
            { left: 'Inpatient Gynaecological Conditions', middle: 'Covered', right: 'Covered', extra: 'Covered' },
            { left: 'Road Ambulance', middle: 'Covered within IP', right: 'Covered within IP', extra: 'Covered within IP' },
            { left: 'Ambulance Services', middle: 'Covered within IP', right: 'Covered within IP', extra: 'Covered within IP' },
            { left: 'Air Evacuation', middle: 'Covered within IP', right: 'Covered within IP', extra: 'Covered within IP' },
            { left: 'Internal and External medical appliances including crutches, hearing aids (subject to preauthorization)', middle: '40,000', right: '50,000', extra: '75,000' },
            { left: 'Inpatient non-accident Dental', middle: '50,000', right: '50,000', extra: '50,000' },
            { left: 'Inpatient non-accident Ophthalmology (1 year waiting period)', middle: '50,000', right: '50,000', extra: '50,000' },
            { left: 'Lodger Benefit', middle: 'Up to 10 years', right: 'Up to 10 years', extra: 'Up to 10 years' },
            { left: 'Psychiatric Hospitalization', middle: '40,000', right: '60,000', extra: '100,000' },
            { left: 'Cancer treatment (1 year waiting period)', middle: '100,000', right: '100,000', extra: '100,000' },
            { left: 'Prematurity (1 year waiting period for maternity)', middle: '100,000', right: '100,000', extra: '100,000' },
        ];

        // Function to handle wrapping text inside a cell
        function pg20wrapTextInCell(text, maxWidth) {
            return doc.splitTextToSize(text, maxWidth);
        }

        // Loop through the data to add rows with borders
        pg20benefitsData.forEach((row) => {
            const pg20wrappedLeftText = pg20wrapTextInCell(row.left, pg20leftColumnWidth - 4); // Wrap left column text
            const pg20wrappedMiddleText = pg20wrapTextInCell(row.middle, pg20midColumnWidth - 4); // Wrap middle column text
            const pg20wrappedRightText = pg20wrapTextInCell(row.right, pg20rightColumnWidth - 4); // Wrap right column text
            const pg20wrappedExtraText = pg20wrapTextInCell(row.extra, pg20rightColumnWidth - 4); // Wrap extra column text

            // Calculate required height based on the wrapped text
            const pg20maxLines = Math.max(pg20wrappedLeftText.length, pg20wrappedMiddleText.length, pg20wrappedRightText.length, pg20wrappedExtraText.length); // Take the maximum number of lines
            const pg20cellHeight = pg20rowHeight * pg20maxLines; // Adjust cell height based on the content

            // Check if the current Y position exceeds the page height
            if (pg20startY + pg20cellHeight > pg20pageHeight - pg20pageMarginBottom) {
                doc.addPage(); // Add a new page if content overflows
                pg20startY = pg20pageMarginTop; // Reset Y position for the new page
            }
            doc.setLineWidth(0.2);
            // Draw the table borders
            doc.rect(pg20startX, pg20startY, pg20leftColumnWidth, pg20cellHeight); // Left column border
            doc.rect(pg20startX + pg20leftColumnWidth, pg20startY, pg20midColumnWidth, pg20cellHeight); // Middle column border
            doc.rect(pg20startX + pg20leftColumnWidth + pg20midColumnWidth, pg20startY, pg20rightColumnWidth, pg20cellHeight); // Right column border
            doc.rect(pg20startX + pg20leftColumnWidth + pg20midColumnWidth + pg20rightColumnWidth, pg20startY, pg20rightColumnWidth, pg20cellHeight); // Extra column border

            // Add the text
            doc.text(pg20wrappedLeftText, pg20startX + 2, pg20startY + 7); // Left column
            doc.text(pg20wrappedMiddleText, pg20startX + pg20leftColumnWidth + 2, pg20startY + 7); // Middle column
            doc.text(pg20wrappedRightText, pg20startX + pg20leftColumnWidth + pg20midColumnWidth + 2, pg20startY + 7); // Right column
            doc.text(pg20wrappedExtraText, pg20startX + pg20leftColumnWidth + pg20midColumnWidth + pg20rightColumnWidth + 2, pg20startY + 7); // Extra column

            // Update the startY position for the next row
            pg20startY += pg20cellHeight;
        });


          // Move to next page
          doc.addPage();
          // Page:22  
          doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
          doc.setLineWidth(0.5);  // Set line width to a smaller value
          doc.setLineWidth(1); 
          doc.line(10, 34 ,maxWidth,34);

          
          doc.setFontSize(12);
          doc.text('DENTAL BENEFITS', 105, 20, { align: 'center' });
          doc.setFontSize(9);

          const pg21_pageWidth = doc.internal.pageSize.getWidth(); // Get full width of the page
          const pg21_pageHeight = doc.internal.pageSize.getHeight(); // Get full height of the page
          const pg21_pageMargin = 10; // Margin from the sides
          const pg21_tableWidth = pg21_pageWidth - pg21_pageMargin * 2; // Total width of the table (accounting for the margins)
          const pg21_leftColumnWidth = pg21_tableWidth * 0.5; // 50% for the first column
          const pg21_midColumnWidth = pg21_tableWidth * 0.15; // 15% for middle column
          const pg21_rightColumnWidth = pg21_tableWidth * 0.15; // 15% for right columns
          const pg21_extraColumnWidth = pg21_tableWidth * 0.20; // 20% for extra column
          let pg21_startX = pg21_pageMargin; // Start position on the X-axis (with margin)
          let pg21_startY = 45; // Starting Y position for the table
          const pg21_rowHeight = 10; // Row height
          const pg21_pageMarginTop = 30; // Top margin for the new page
          const pg21_pageMarginBottom = 10; // Bottom margin to ensure content doesn't overflow page

          // Define the table rows data for Dental Benefits
          const pg21_dentalData = [
              { left: 'Overall Limit - (kshs.) per person only for Individual policies and can be per family for group policies', middle: '5,000', right: '7,500', extra: '10,000' },
              { left: 'Dental consultations and gum diseases', middle: 'Covered to full limit', right: 'Covered to full limit', extra: 'Covered to full limit' },
              { left: 'Extractions', middle: 'Covered to full limit', right: 'Covered to full limit', extra: 'Covered to full limit' },
              { left: 'Fillings (except precious metals)', middle: 'Covered to full limit', right: 'Covered to full limit', extra: 'Covered to full limit' },
              { left: 'Scaling', middle: 'Covered to full limit', right: 'Covered to full limit', extra: 'Covered to full limit' },
              { left: 'Dental X-Rays', middle: 'Covered to full limit', right: 'Covered to full limit', extra: 'Covered to full limit' },
              { left: 'Dental Prescriptions', middle: 'Covered to full limit', right: 'Covered to full limit', extra: 'Covered to full limit' },
          ];

         

          // Loop through the data to add rows with borders
          pg21_dentalData.forEach((row) => {
              const pg21_wrappedLeftText = wrapTextInCell(row.left, pg21_leftColumnWidth - 4); // Wrap left column text
              const pg21_wrappedMiddleText = wrapTextInCell(row.middle, pg21_midColumnWidth - 4); // Wrap middle column text
              const pg21_wrappedRightText = wrapTextInCell(row.right, pg21_rightColumnWidth - 4); // Wrap right column text
              const pg21_wrappedExtraText = wrapTextInCell(row.extra, pg21_extraColumnWidth - 4); // Wrap extra column text

              // Calculate required height based on the wrapped text
              const pg21_maxLines = Math.max(pg21_wrappedLeftText.length, pg21_wrappedMiddleText.length, pg21_wrappedRightText.length, pg21_wrappedExtraText.length); // Take the maximum number of lines
              const pg21_cellHeight = pg21_rowHeight * pg21_maxLines; // Adjust cell height based on the content

              // Check if the current Y position exceeds the page height
              if (pg21_startY + pg21_cellHeight > pg21_pageHeight - pg21_pageMarginBottom) {
                  doc.addPage(); // Add a new page if content overflows
                  pg21_startY = pg21_pageMarginTop; // Reset Y position for the new page
              }

              // Draw the table borders with smaller line width
              doc.setLineWidth(0.3); // Set the line width for the borders
              doc.rect(pg21_startX, pg21_startY, pg21_leftColumnWidth, pg21_cellHeight); // Left column border
              doc.rect(pg21_startX + pg21_leftColumnWidth, pg21_startY, pg21_midColumnWidth, pg21_cellHeight); // Middle column border
              doc.rect(pg21_startX + pg21_leftColumnWidth + pg21_midColumnWidth, pg21_startY, pg21_rightColumnWidth, pg21_cellHeight); // Right column border
              doc.rect(pg21_startX + pg21_leftColumnWidth + pg21_midColumnWidth + pg21_rightColumnWidth, pg21_startY, pg21_extraColumnWidth, pg21_cellHeight); // Extra column border

              // Add the text
              doc.text(pg21_wrappedLeftText, pg21_startX + 2, pg21_startY + 7); // Left column
              doc.text(pg21_wrappedMiddleText, pg21_startX + pg21_leftColumnWidth + 2, pg21_startY + 7); // Middle column
              doc.text(pg21_wrappedRightText, pg21_startX + pg21_leftColumnWidth + pg21_midColumnWidth + 2, pg21_startY + 7); // Right column
              doc.text(pg21_wrappedExtraText, pg21_startX + pg21_leftColumnWidth + pg21_midColumnWidth + pg21_rightColumnWidth + 2, pg21_startY + 7); // Extra column

              // Update the startY position for the next row
              pg21_startY += pg21_cellHeight;
          });


              // Move to next page
              doc.addPage();
              // Page:23  
              doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
              doc.setLineWidth(0.5);  // Set line width to a smaller value
              doc.setLineWidth(1); 
              doc.line(10, 34 ,maxWidth,34);

              
              doc.setFontSize(12);
              doc.text('REPATRIATION AND EVACUATION', 105, 20, { align: 'center' });
              doc.setFontSize(9);

              const pg23_pageWidth = doc.internal.pageSize.getWidth(); // Get full width of the page
              const pg23_pageMargin = 10; // Margin from the sides
              const pg23_tableWidth = pg23_pageWidth - pg23_pageMargin * 2; // Total width of the table
              let pg23_startY = 45; // Starting Y position for the table
              const pg23_rowHeight = 10; // Row height

              // Define the table rows data for Repatriation and Evacuation
              const pg23_repatriationData = [
                  { limit: '100,000', premium: '5,390' },
                  { limit: '200,000', premium: '10,770' }
              ];

              // Draw the header for the Repatriation and Evacuation table
              doc.setLineWidth(0.3);
              doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, pg23_rowHeight); // Table border
              doc.text('Limit per Person', pg23_pageMargin + 5, pg23_startY + 7); // Header
              doc.text('Premium per Person', pg23_pageMargin + pg23_tableWidth / 2 + 5, pg23_startY + 7); // Header

              // Update the startY position for the next row
              pg23_startY += pg23_rowHeight;

              // Loop through the data to add rows for Repatriation and Evacuation
              pg23_repatriationData.forEach((row) => {
                  // Draw the table borders
                  doc.setLineWidth(0.3);
                  doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, pg23_rowHeight); // Table border

                  // Add the text
                  doc.text(row.limit, pg23_pageMargin + 5, pg23_startY + 7); // Limit per person
                  doc.text(row.premium, pg23_pageMargin + pg23_tableWidth / 2 + 5, pg23_startY + 7); // Premium per person

                  // Update the startY position for the next row
                  pg23_startY += pg23_rowHeight;
              });

              // Move to next page
              doc.addPage();
              // Page:24 HOSPITAL CASH Table
              doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
              doc.setLineWidth(0.5);  // Set line width to a smaller value
              doc.setLineWidth(1); 
              doc.line(10, 34 ,maxWidth,34);

              // HOSPITAL CASH Benefits Table
              doc.setFontSize(12);
              doc.text('HOSPITAL CASH', 105, 20, { align: 'center' });
              doc.setFontSize(9);

              const pg23_cashData = [
                  { dailyCash: '2,000', premium: '930' },
                  { dailyCash: '2,500', premium: '1,160' },
                  { dailyCash: '3,000', premium: '1,390' },
                  { dailyCash: '3,500', premium: '1,620' },
                  { dailyCash: '4,000', premium: '1,850' },
                  { dailyCash: '5,000', premium: '2,310' },
              ];

              pg23_startY = 45; // Reset starting Y position for the Hospital Cash table

              // Draw the header for the Hospital Cash table
              doc.setLineWidth(0.3);
              doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, pg23_rowHeight); // Table border
              doc.text('Daily Cash Payment', pg23_pageMargin + 5, pg23_startY + 7); // Header
              doc.text('Premium per Year', pg23_pageMargin + pg23_tableWidth / 2 + 5, pg23_startY + 7); // Header

              // Update the startY position for the next row
              pg23_startY += pg23_rowHeight;

              // Loop through the data to add rows for Hospital Cash
              pg23_cashData.forEach((row) => {
                  // Draw the table borders
                  doc.setLineWidth(0.3);
                  doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, pg23_rowHeight); // Table border

                  // Add the text
                  doc.text(row.dailyCash, pg23_pageMargin + 5, pg23_startY + 7); // Daily cash payment during admission
                  doc.text(row.premium, pg23_pageMargin + pg23_tableWidth / 2 + 5, pg23_startY + 7); // Premium per person per year

                  // Update the startY position for the next row
                  pg23_startY += pg23_rowHeight;
              });

               // Move to next page
               doc.addPage();
               // Page:25
               doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
               doc.setLineWidth(0.5);  // Set line width to a smaller value
               doc.setLineWidth(1); 
               doc.line(10, 34 ,maxWidth,34);
               
               doc.setFontSize(12);
               doc.text('LAST EXPENSE - FAMILY POLICY', 105, 20, { align: 'center' });
               doc.setFontSize(9);

              // Define the table rows data for Last Expense
              const pg23_lastExpenseData = [
                  { plan: 'Plan 1', principal: '50,000', spouse: '50,000', child: '50,000', premium: '570' },
                  { plan: 'Plan 2', principal: '100,000', spouse: '100,000', child: '100,000', premium: '1,140' },
                  { plan: 'Plan 3', principal: '200,000', spouse: '200,000', child: '200,000', premium: '2,280' },
                  { plan: 'Plan 4', principal: '250,000', spouse: '250,000', child: '250,000', premium: '3,300' },
                  { plan: 'Plan 5', principal: '300,000', spouse: '300,000', child: '300,000', premium: '3,970' },
                  { plan: 'Plan 6', principal: '500,000', spouse: '500,000', child: '500,000', premium: '6,600' },
              ];

              // Reset starting Y position for Last Expense table
              pg23_startY = 45;

              // Draw the header for the Last Expense table
              doc.setLineWidth(0.3);
              doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, pg23_rowHeight); // Table border
              doc.text('Plan', pg23_pageMargin + 5, pg23_startY + 7); // Header
              doc.text('Principal', pg23_pageMargin + pg23_tableWidth / 6 + 5, pg23_startY + 7); // Header
              doc.text('Spouse', pg23_pageMargin + (pg23_tableWidth / 6) * 2 + 5, pg23_startY + 7); // Header
              doc.text('Benefit per Child', pg23_pageMargin + (pg23_tableWidth / 6) * 3 + 5, pg23_startY + 7); // Header
              doc.text('Premium per Family', 141  , pg23_startY + 7); // Header

              // Update the startY position for the next row
              pg23_startY += pg23_rowHeight;

               

              // Loop through the data to add rows for Last Expense
              pg23_lastExpenseData.forEach((row) => {
                  // Draw the table borders
                  doc.setLineWidth(0.3);
                  doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, pg23_rowHeight); // Table border

                  // Define column widths
                  const planWidth = pg23_tableWidth / 6; // Width for each column
                  const principalWidth = planWidth; // Same for principal
                  const spouseWidth = planWidth; // Same for spouse
                  const childWidth = planWidth; // Same for child
                  const premiumWidth = planWidth; // Same for premium

                  // Wrap text for each cell
                  const wrappedPlan = wrapTextInCell(row.plan, planWidth - 10); // Subtract some padding for aesthetics
                  const wrappedPrincipal = wrapTextInCell(row.principal, principalWidth - 10);
                  const wrappedSpouse = wrapTextInCell(row.spouse, spouseWidth - 10);
                  const wrappedChild = wrapTextInCell(row.child, childWidth - 10);
                  const wrappedPremium = wrapTextInCell(row.premium, premiumWidth - 10);

                  // Calculate max height needed for the current row
                  const maxLines = Math.max(wrappedPlan.length, wrappedPrincipal.length, wrappedSpouse.length, wrappedChild.length, wrappedPremium.length);
                  const cellHeight = pg23_rowHeight * maxLines; // Adjust cell height based on content

                  // Update the table height for the current row
                  doc.rect(pg23_pageMargin, pg23_startY, pg23_tableWidth, cellHeight); // Update table border height

                  // Add the text to the table
                  doc.text(wrappedPlan, pg23_pageMargin + 5, pg23_startY + 7); // Plan
                  doc.text(wrappedPrincipal, pg23_pageMargin + planWidth + 5, pg23_startY + 7); // Principal
                  doc.text(wrappedSpouse, pg23_pageMargin + planWidth * 2 + 5, pg23_startY + 7); // Spouse
                  doc.text(wrappedChild, pg23_pageMargin + planWidth * 3 + 5, pg23_startY + 7); // Benefit per child
                  doc.text(wrappedPremium, pg23_pageMargin + planWidth * 4 + 5, pg23_startY + 7); // Premium per family

                  // Update the startY position for the next row
                  pg23_startY += cellHeight; // Increment based on the row height
              });

              

                 // Move to next page
                doc.addPage();
                // Page:26  
                doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
                doc.setLineWidth(0.5);  // Set line width to a smaller value
                doc.setLineWidth(1); 
                doc.line(10, 34 ,maxWidth,34);
                
                doc.setFontSize(12);
                doc.text('LAST EXPENSE – INDIVIDUAL POLICY', 105, 20, { align: 'center' });
                doc.setFontSize(9);

                // Define the Individual Plans data
                const pg24_individualPlans = [
                    { plan: 'Plan 1', benefit: '50,000', premium: '300' },
                    { plan: 'Plan 2', benefit: '100,000', premium: '600' },
                    { plan: 'Plan 3', benefit: '200,000', premium: '1,200' },
                    { plan: 'Plan 4', benefit: '250,000', premium: '1,570' },
                    { plan: 'Plan 5', benefit: '300,000', premium: '1,890' },
                    { plan: 'Plan 6', benefit: '500,000', premium: '3,140' },
                ];

                // Set table parameters
                const pg24_startY = 45; // Starting Y position for the Individual Policy table
                const pg24_tableWidth = 180; // Total width of the table
                const pg24_rowHeight = 10; // Row height

                // Draw the header for the Individual Policy table
                doc.setLineWidth(0.3);
                doc.rect(10, pg24_startY, pg24_tableWidth, pg24_rowHeight); // Table border
                doc.text('Plan', 12, pg24_startY + 7); // Header
                doc.text('Benefit Policyholder', 40, pg24_startY + 7); // Header
                doc.text('Premium per Policyholder', 110, pg24_startY + 7); // Header

                // Update startY position for the data rows
                let pg24_currentY = pg24_startY + pg24_rowHeight;

                // Loop through the data to add rows for Individual Policy
                pg24_individualPlans.forEach((row) => {
                    // Draw the table borders
                    doc.setLineWidth(0.3);
                    doc.rect(10, pg24_currentY, pg24_tableWidth, pg24_rowHeight); // Table border

                    // Add the text
                    doc.text(row.plan, 12, pg24_currentY + 7); // Plan
                    doc.text(row.benefit, 40, pg24_currentY + 7); // Benefit policyholder
                    doc.text(row.premium, 110, pg24_currentY + 7); // Premium per policyholder

                    // Update the currentY position for the next row
                    pg24_currentY += pg24_rowHeight;
                });

                 
                 // Move to next page
                 doc.addPage();
                 // Page:27  
                 doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
                 doc.setLineWidth(0.5);  // Set line width to a smaller value
                 doc.setLineWidth(1); 
                 doc.line(10, 34 ,maxWidth,34);
                 
                 doc.setFontSize(12);
                 doc.text('LAST EXPENSE - PARENTS / PARENTS IN LAW', 105, 20, { align: 'center' });
                 doc.setFontSize(9);

                // Define the Parents Plans data
                const pg24_parentsPlans = [
                    { plan: 'Plan 1', benefit: '50,000', premium: '1,000' },
                    { plan: 'Plan 2', benefit: '100,000', premium: '1,650' },
                    { plan: 'Plan 3', benefit: '200,000', premium: '3,290' },
                    { plan: 'Plan 4', benefit: '250,000', premium: '4,120' },
                    { plan: 'Plan 5', benefit: '300,000', premium: '4,940' },
                    { plan: 'Plan 6', benefit: '500,000', premium: '8,230' },
                ];

                // Reset starting Y position for the Parents Policy table
                const pg24_parentsStartY = 45;

                // Draw the header for the Parents Policy table
                doc.setLineWidth(0.3);
                doc.rect(10, pg24_parentsStartY, pg24_tableWidth, pg24_rowHeight); // Table border
                doc.text('Plan', 12, pg24_parentsStartY + 7); // Header
                doc.text('Benefit per Person', 40, pg24_parentsStartY + 7); // Header
                doc.text('Premium per Person', 110, pg24_parentsStartY + 7); // Header

                // Update the currentY position for the data rows
                let pg24_parentsCurrentY = pg24_parentsStartY + pg24_rowHeight;

                // Loop through the data to add rows for Parents Policy
                pg24_parentsPlans.forEach((row) => {
                    // Draw the table borders
                    doc.setLineWidth(0.3);
                    doc.rect(10, pg24_parentsCurrentY, pg24_tableWidth, pg24_rowHeight); // Table border

                    // Add the text
                    doc.text(row.plan, 12, pg24_parentsCurrentY + 7); // Plan
                    doc.text(row.benefit, 40, pg24_parentsCurrentY + 7); // Benefit per person
                    doc.text(row.premium, 110, pg24_parentsCurrentY + 7); // Premium per person

                    // Update the currentY position for the next row
                    pg24_parentsCurrentY += pg24_rowHeight;
                });

                

                  // Move to next page
                  doc.addPage();
                  // Page:28  
                  doc.addImage(img, 'JPEG', 10, 10, imgWidth, imgHeight); // x, y, width, height
                  doc.setLineWidth(0.5);  // Set line width to a smaller value
                  doc.setLineWidth(1); 
                  doc.line(10, 34 ,maxWidth,34);
                  
                  doc.setFontSize(12);
                  doc.text('OUTPATIENT BENEFITS', 105, 20, { align: 'center' });
                  doc.setFontSize(9);

                  // Define the outpatient benefits data
                  const outpatientBenefitsData = [
                      {
                          left: 'Overall Limit - (kshs.) per person only for Individual policies and can be per family for group policies',
                          right: '50,000',
                      },
                      {
                          left: 'ARV Drugs Payable',
                          right: 'Covered up to full limit',
                      },
                      {
                          left: 'General Medical Check-Up',
                          right: 'Kshs.5,000',
                      },
                      {
                          left: 'Co-payment',
                          right: 'None',
                      },
                      {
                          left: 'KEPI & baby friendly Regime Immunizations',
                          right: 'Covered up to Kshs.5,000',
                      },
                      {
                          left: 'Pre-existing and/or chronic conditions, gynecological conditions, Hernias, Haemorrhoids, Thyroidectomy, Adenoidectomy, congenital, organ transplant, HIV/AIDS and related conditions existing/not existing and/or not diagnosed at the time of joining. (1 year waiting period for Individual Policies)',
                          right: 'Covered up to full limit',
                      },
                      {
                          left: 'Pre-natal & Post-natal outpatient treatment (1 year waiting period for Individual Policies)',
                          right: 'Covered up to full limit',
                      },
                  ];

                  // Table structure
                  const outpatientPageWidth = doc.internal.pageSize.getWidth();
                  const outpatientPageMargin = 10;
                  const outpatientTableWidth = outpatientPageWidth - outpatientPageMargin * 2;
                  const outpatientLeftColumnWidth = outpatientTableWidth * 0.6; // 60% for the left column
                  const outpatientRightColumnWidth = outpatientTableWidth * 0.4; // 40% for the right column
                  let outpatientStartX = outpatientPageMargin;
                  let outpatientStartY = 45; // Starting Y position for the table
                  const outpatientRowHeight = 10; // Row height

                
                  // Loop through the data to add rows with borders
                  outpatientBenefitsData.forEach((row) => {
                      const wrappedLeftText = wrapTextInCell(row.left, outpatientLeftColumnWidth - 4); // Wrap left column text
                      const wrappedRightText = wrapTextInCell(row.right, outpatientRightColumnWidth - 4); // Wrap right column text

                      // Calculate required height based on the wrapped text
                      const maxLines = Math.max(wrappedLeftText.length, wrappedRightText.length); // Take the maximum number of lines
                      const cellHeight = outpatientRowHeight * maxLines; // Adjust cell height based on the content

                      // Draw the table borders
                      doc.setLineWidth(0.2);
                      doc.rect(outpatientStartX, outpatientStartY, outpatientLeftColumnWidth, cellHeight); // Left column border
                      doc.rect(outpatientStartX + outpatientLeftColumnWidth, outpatientStartY, outpatientRightColumnWidth, cellHeight); // Right column border

                      // Add the text
                      doc.text(wrappedLeftText, outpatientStartX + 2, outpatientStartY + 7); // Left column
                      doc.text(wrappedRightText, outpatientStartX + outpatientLeftColumnWidth + 2, outpatientStartY + 7); // Right column

                      // Update the startY position for the next row
                      outpatientStartY += cellHeight;
                  });

                 

   

    // 3. Generate the PDF and convert it to a blob
    const pdfBlob = doc.output('blob');

    // set Email
    setRecipientEmail(holderEmail);

    // 4. Create a FormData object to send the PDF
    const formData = new FormData();
    formData.append('file', pdfBlob, 'generated.pdf');
    formData.append('email', recipientEmail); // Use static email

     
 if(processingType === "SendMail"){
        try {
          setLoaderIcon(true);
          // 5. Send the PDF to the API using axios
          const response = await axios.post('https://sendmail.birdviewinsurance.com/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          // 6. Handle the API response
          console.log('PDF sent successfully:', response.data);
          setResponseMessage(response.data.message); // Update response message
          setErrorMessage(''); // Clear any previous error message
          setCheckMailDelivery(true)
          setLoaderIcon(false);

        } catch (error) {
          console.error('Error sending PDF:', error);
          setLoaderIcon(false);
          // Update error message based on the response if available
          if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
          } else {
            setErrorMessage('An unexpected error occurred. Please try again later.',error);
          }
          setResponseMessage(''); // Clear any previous response message
        }
 } else if (processingType ==="download") {
        //  Generate the PDF and download it
        try {

          // Download Policy Document
          doc.save("policyDocument.pdf");
          setResponseMessage('Policy Document downloaded successfully'); 

        } catch (error) {
         
          if (error) {
            setErrorMessage(error);
          } 
          setResponseMessage(''); // Clear any previous response message
        }



      }


  };

  return (
        <div className='p-4 flex justify-center text-center'>
          <div>
          <Button
                variant="contained"
                color="error"  
                onClick={() => {generatePDF(processState)}}
            >{buttonName}</Button>
            <div className='mt-4 text-center' >
            {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            </div>
        </div>
  );
};  

export default Step5PolicyDodument;
