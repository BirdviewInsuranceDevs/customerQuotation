import React, { useEffect, useState } from 'react';

const Step3PolicySummaryHospitalCash = ({setHospitalCashTotalPremium}) => {
    const [coverAmount, setCoverAmount] = useState();
    const [policyStartDate, setPolicyStartDate] = useState();
    const [endPolicyStartDate, setEndPolicyStartDate] = useState();
    const [premium, setPremium] = useState();
    const [itl, setItl] = useState();
    const [ipcf, setIpcf] = useState();
    const stampDuty = 40;
    const [totalPayedPremium, setTotalPayedPremium] = useState();
    const [coverType, setCoverType] = useState();
    const [dependantCount, setDependantCount] = useState();
    const [paymentCurrencyType, setPaymentCurrencyType] = useState();
    const [paymentCurrencyRate, setPaymentCurrencyRate] = useState();

    
   

    
    useEffect(() => {
        // Retrieve the stored data from local storage
        const data = JSON.parse(localStorage.getItem('QuotationData'));

        // Check if hospital cash is active
        const hospitalCashActive = data?.hospitalCash?.isActive;

        // Check Currency Rate and Assig Rate
        setPaymentCurrencyRate(data?.contactAndCurrencyData?.currencyRate)

        // Check the currency type and assign the appropriate symbol
        const currencySymbol = (currency) => {
            switch (currency) {
                case 'KES':
                return 'Ksh.';
                case 'USD':
                return '$';
                case 'EUR':
                return '€';
                case 'GBP':
                return '£';
                default:
                return 'Ksh.';  
            }
            };
    
            // Use the currency check before setting the payment currency type
            const currencyType = currencySymbol(data?.contactAndCurrencyData?.currency);
            setPaymentCurrencyType(currencyType);
    
        
    
        if (hospitalCashActive) {
            // Extract hospital cash details and set cover amount and policy start date
            const hospitalCash = data.hospitalCash;
            setCoverAmount(hospitalCash.coverAmount);
            setCoverType(hospitalCash.coverType);
            let dependantCountCheck = 0;

    
            const policyStartDate = new Date(hospitalCash.policyStartDate);
            setPolicyStartDate(policyStartDate.toISOString().split('T')[0]);
    
            // Calculate end policy date
            const endDate = new Date(policyStartDate);
            endDate.setFullYear(endDate.getFullYear() + 1);
            setEndPolicyStartDate(endDate.toISOString().split('T')[0]); // format as 'YYYY-MM-DD'
    
            // Get the holder's Premium amount
            let totalPremium = Number(hospitalCash.premium) || 0; // Ensure it's a number
            const medicalConditions = data?.medicalConditions || [];
    
            // Sum up the additional charges based on the medical condition load rates
            let additionalCharges = 0;
    
            medicalConditions.forEach(condition => {
                if (condition.action === "Load" && condition.rate) {
                    // Parse the rate as a percentage
                    const loadRate = parseFloat(condition.rate) / 100;
                    additionalCharges += totalPremium * loadRate; // Use totalPremium here
                }
            });
    
            // Add holder's additional charges to the total premium
            totalPremium += additionalCharges;
    
            // Check if there are dependants and calculate their premiums
            const dependants = data?.dependantPersonalData || []; // Assuming this is the array of dependants
    
            dependants.forEach(dep => {
                const dependantPremium = Number(dep?.hospitalCashData?.premium) || 0; // Ensure it's a number
                
                  // Calculate the Number of Dependants
                if (dependantPremium !== 0 ) {
                    dependantCountCheck++;
                }
    
                if (coverType === "per-family") {
                    // If the dependant has medical conditions, calculate additional charges
                    if (dep.medicalConditions && dep.medicalConditions.length > 0) {
                        let dependantAdditionalCharges = 0;
    
                        dep.medicalConditions.forEach(condition => {
                            if (condition.action === "Load" && condition.rate) {
                                // Parse the rate as a percentage
                                const loadRate = parseFloat(condition.rate) / 100;
                                dependantAdditionalCharges += dependantPremium * loadRate;
                            }
                        });
    
                        // Sum up each dependant's premium with their additional charges
                        totalPremium += dependantPremium + dependantAdditionalCharges;
                      
                    } 

                } else if (coverType === "per-person") {
                    // If the dependant has medical conditions, calculate additional charges
                    if (dep.medicalConditions && dep.medicalConditions.length > 0) {
                        let dependantAdditionalCharges = 0;
    
                        dep.medicalConditions.forEach(condition => {
                            if (condition.action === "Load" && condition.rate) {
                                // Parse the rate as a percentage
                                const loadRate = parseFloat(condition.rate) / 100;
                                dependantAdditionalCharges += dependantPremium * loadRate;
                            }
                        });
    
                        // Sum up each dependant's premium with their additional charges
                        totalPremium += dependantPremium + dependantAdditionalCharges;

                    } else {
                        totalPremium += dependantPremium ; // Add base premium if no additional charges
                        

                    }
                }
            });
    
            // Calculate the ITL amount based on the total premium
            const itlRate = 0.002;
            const itlAmount = totalPremium * itlRate;
            setItl(itlAmount);
    
            // Calculate the IPCF amount based on the total premium
            const ipcfRate = 0.0025;
            const ipcfAmount = totalPremium * ipcfRate;
            setIpcf(ipcfAmount);
    
            // Set the final total premium
            setPremium(totalPremium);
    
            // Calculate the total paid premium by adding the stamp duty
            setTotalPayedPremium(Number(totalPremium) + Number(stampDuty * paymentCurrencyRate) + Number(ipcfAmount) + Number(itl)); // Ensure ipcfAmount is used
            setHospitalCashTotalPremium(Number(totalPremium) + Number(stampDuty * paymentCurrencyRate) + Number(ipcfAmount) + Number(itl)); 
            // Update the current Dependants
            setDependantCount(dependantCountCheck);

        }
    }, [setPremium, stampDuty, setIpcf, setItl, itl]);
    
    

    return (
        <><style>
        {`
          .shadow-div { background-color: white; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); border-radius: 8px; padding: 16px; }
         
        `}
      </style>
        <div className="p-4 bg-white shadow-md shadow-div  rounded-md m-2  ">
            <h3 className="sm:text-sm md:text-lg font-semibold mb-4">Policy Summary: Hospital cash </h3>

            {/* Policy Summary Section */}
            <div className=" ">
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Product</div>
                    <div className="sm:w-full md:w-2/3">Hospital cash</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Cover Period</div>
                    <div className="sm:w-full md:w-2/3">{policyStartDate} to {endPolicyStartDate}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Cover Type</div>
                    <div className="sm:w-full md:w-2/3">  {coverType}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Dependants Count</div>
                    <div className="sm:w-full md:w-2/3"> {dependantCount}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Benefit Limits</div>
                    <div className="sm:w-full md:w-2/3">{paymentCurrencyType} {coverAmount}</div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Summary of Exclusions</div>
                    <div className="sm:w-full md:w-2/3">
                        <ul className="list-disc pl-5">
                            <li>Outpatient treatment except dental and optical if purchased.</li>
                            <li>Extreme sports, hazardous activities, or races.</li>
                            <li>Genetic disorders, genetic testing, and related conditions.</li>
                            <li>Navel, Military or air force, injuries or war, civil commotion, riots, and strikes.</li>
                            <li>Alternative treatments like herbal and acupuncture.</li>
                            <li>Intoxication, drunkenness, intentional self-injury, suicide or attempted suicide.</li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Waiting Periods</div>
                    <div className="sm:w-full md:w-2/3">
                        General waiting period of 30 days and 1 year waiting period for Maternity, Congenital,
                        Prematurity, Pre-existing and/or chronic conditions, HIV/AIDS and related conditions.
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Your Obligations</div>
                    <div className="sm:w-full md:w-2/3">
                        Take reasonable care to answer all questions carefully and accurately and disclose all material facts as not doing so could mean that the policy is invalid and all or part of a claim may not be paid. Make sure you check that all the information on your Policy Document is correct. Contact us if anything needs to be changed.
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Policy Renewal</div>
                    <div className="sm:w-full md:w-2/3">
                        Policy renewal is subject to satisfactory claims performance. We will email or write to you before the renewal date to confirm the premium required for the next year’s cover conditions.
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Claiming Procedure</div>
                    <div className="sm:w-full md:w-2/3">
                        Prior approval must be sought before accessing treatment for all inpatient treatment, day cases, dental and optical benefits. Please refer to the policy document for more details.
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Complaints</div>
                    <div className="sm:w-full md:w-2/3">
                        Complaints can be communicated through the following contacts: Principal Officer, Birdview Micro Insurance, P.O.Box 45157 - 00200 City Square, Nairobi, Kenya. Email: customerservice@birdviewmicroinsurance.com
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-300 pb-2">
                    <div className="font-bold sm:w-full md:w-1/3">Policy Document</div>
                    <div className="sm:w-full md:w-2/3">
                        A policy document shall be sent to your preferred address/email within 3 working days of cover commencement.
                    </div>
                </div>
            </div>
           <p> You are required to pay the full premium as shown in the table below within 7 days of the date of this policy summary. Payment of premium signifies acceptance of the terms and conditions, and cover will commence on receipt of full premium.</p>
            {/* Premium Summary Section */}
            <div className="mt-4">
                <h4 className="text-lg font-bold mb-2">Premium Summary</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Premium</div>
                        <div>{paymentCurrencyType} {premium}</div>
                    </div>
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">ITL</div>
                        <div>{paymentCurrencyType} {itl}</div>
                    </div>
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">IPCF</div>
                        <div>{paymentCurrencyType} {ipcf}</div>
                    </div>
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Stamp Duty</div>
                        <div>{paymentCurrencyType}  {paymentCurrencyRate * stampDuty}</div>
                    </div>
                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                        <div className="font-bold">Total</div>
                        <div className="font-bold">{paymentCurrencyType} {Number(totalPayedPremium)}</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Step3PolicySummaryHospitalCash;
