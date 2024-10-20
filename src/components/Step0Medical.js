import React ,{useEffect} from "react";
import { Alert } from '@mui/material'; 
import { TextField } from '@mui/material';
import { Table, TableBody, TableCell,FormControl,Select, MenuItem, FormHelperText ,TableContainer, InputLabel,TableHead, TableRow, Paper  } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeselectIcon from '@mui/icons-material/Deselect';


const Step0Medical = ({
        conversionRates,
        contactAndLoginsAndCurrency,
        formDataStep0Medical,
        setFormDataStep0Medical,
        errors,
        setErrors,
        MedicalPlans 
      }) => {  

        const today = new Date().toISOString().split('T')[0] 

        useEffect(() => {
          computeRatesOnSelect(
            formDataStep0Medical[`selectedPlanInpatient`],
            formDataStep0Medical.dependantCount,
            MedicalPlans,
            formDataStep0Medical.coverType,
            "Inpatient"
          );
        computeRatesOnSelect(
          formDataStep0Medical[`selectedPlanOutpatient`],
          formDataStep0Medical.dependantCount,
          MedicalPlans,
          formDataStep0Medical.coverType,
          "Outpatient"
          );

        computeRatesOnSelect(
          formDataStep0Medical[`selectedPlanDental`],
          formDataStep0Medical.dependantCount,
          MedicalPlans,
          formDataStep0Medical.coverType,
          "Dental"
          );

         computeRatesOnSelect(
            formDataStep0Medical[`selectedPlanOptical`],
            formDataStep0Medical.dependantCount,
            MedicalPlans,
            formDataStep0Medical.coverType,
            "Optical"
            );
          
        }, [
          formDataStep0Medical[`selectedPlanInpatient`], 
          formDataStep0Medical[`selectedPlanOutpatient`],
          formDataStep0Medical[`selectedPlanDental`],
          formDataStep0Medical[`selectedPlanOptical`],
          formDataStep0Medical.dependantCount,
          MedicalPlans,
          formDataStep0Medical.coverType                
        ]);
        const renderCategory = (category, plans, selectedPlan,dependantCount,coverType,MedicalPlans) => (
          <>
            <TableRow sx={{ backgroundColor: 'gray.700', color: 'white' }}>
              <TableCell colSpan={5} align="center" sx={{ fontWeight: 'bold' }}>
                {category} Plans
     
              </TableCell>
            </TableRow>
            {plans.map((plan) => (
              <TableRow
                key={plan.id}
                sx={{
                  backgroundColor: plan.id === selectedPlan ? '#388e3c' : 'inherit',
                  color: plan.id === selectedPlan ? 'white' : 'inherit',
                  cursor: 'pointer', // Add a cursor style for better UX
                }}
                onClick={() => {
                  setFormDataStep0Medical((prevData) => ({
                    ...prevData,
                    [`selectedPlan${category}`]: plan.id,
                  }));
                  computeRatesOnSelect(selectedPlan,dependantCount,MedicalPlans,coverType,category);
                }}
                >
                <TableCell align="center"  sx={{ padding: '7px', color: plan.id === selectedPlan ? 'white' : 'inherit' }}>{plan.plan}</TableCell>
                <TableCell align="center"  sx={{ padding: '7px', color: plan.id === selectedPlan ? 'white' : 'inherit' }}>{plan.benefit}</TableCell>
                <TableCell align="center"  sx={{ padding: '7px', color: plan.id === selectedPlan ? 'white' : 'inherit' }}>{convertAmount(plan.coverAmount)}</TableCell>
                <TableCell align="center"  sx={{ padding: '7px', color: plan.id === selectedPlan ? 'white' : 'inherit' }}>{convertAmount(plan.premium)}</TableCell>
                <TableCell align="center"  sx={{ padding: '7px', color: plan.id === selectedPlan ? 'white' : 'inherit' }}>
              
                   {  plan.id === formDataStep0Medical[`selectedPlan${category}`] ? (
                    <CheckCircleOutlineIcon sx={{ color: 'white' }} />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                 
                </TableCell>
              </TableRow>
            ))}
          </>
        );
        
          // convertor Function
          const convertAmount = (amount) => {
              //  Convert to number
              const amountclean = parseInt(amount);
            // Convert to selected currency
            let convertedAmount ='';
            if(contactAndLoginsAndCurrency.currency === 'KES' ){ 
             convertedAmount =`Ksh. ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString() }`;
            }
            else if(contactAndLoginsAndCurrency.currency === 'USD' ){ 
             convertedAmount =`$ ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString()}`;
      
            }
            else if(contactAndLoginsAndCurrency.currency === 'EUR' ){ 
             convertedAmount =`€ ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString()}`;
      
            }
            else if(contactAndLoginsAndCurrency.currency === 'GBP' ){ 
             convertedAmount =`£ ${Number((amountclean * conversionRates[contactAndLoginsAndCurrency.currency]).toFixed(2)).toLocaleString()}`;
      
            }
            return convertedAmount;
          };


          const computeRatesOnSelect = (selectedPlanId,dependantCount,MedicalPlans,coverType,category) =>{
             let selectedPlan= null;
             selectedPlan = MedicalPlans.find(plan => plan.id === selectedPlanId);
           
            if(coverType === 'per-person'){
            if (selectedPlan) {
              const totalAmount = conversionRates[contactAndLoginsAndCurrency.currency] *  ((0.0025 * Number(Number(selectedPlan.premium))) + (0.002 * Number(Number(selectedPlan.premium))) + (Number(dependantCount) === 0 ? Number(selectedPlan.premium) : ((Number(selectedPlan.premium)) * (Number(dependantCount) + 1 ))  ) +(40));
             
              setFormDataStep0Medical(prevState => ({
                ...prevState,
                [`totalAmount${category}`]:totalAmount
              })); 

              const { coverAmount, premium } = selectedPlan;   
              setFormDataStep0Medical(prevState => ({
                ...prevState,
                coverAmount: Number(coverAmount),    
                [`premium${category}`]:  (Number(premium)  * conversionRates[contactAndLoginsAndCurrency.currency] ),
                [`coverAmount${category}`]: Number((coverAmount * conversionRates[contactAndLoginsAndCurrency.currency])),
                
              }));

              const premiumDisplay = conversionRates[contactAndLoginsAndCurrency.currency] * ((Number(dependantCount) === 0 ? Number(selectedPlan.premium) : ((Number(selectedPlan.premium)) * (Number(dependantCount) + 1 ))  ));
              setFormDataStep0Medical(prevState => ({
                ...prevState,
                [`premiumDisplay${category}`]:premiumDisplay
              })); 


            }
          } else {
            if (selectedPlan) {
              const totalAmount = conversionRates[contactAndLoginsAndCurrency.currency] *  ((0.0025 * Number(Number(selectedPlan.premium))) + (0.002 * Number(Number(selectedPlan.premium))) + ((Number(dependantCount) === 0 || !dependantCount) ? Number(selectedPlan.premium) : (Number(selectedPlan.premium)) ) +(40));
             
              setFormDataStep0Medical(prevState => ({
                ...prevState,
                [`totalAmount${category}`]:totalAmount
              })); 

              const { coverAmount, premium } = selectedPlan;   
              setFormDataStep0Medical(prevState => ({
                ...prevState,
                coverAmount: Number(coverAmount),    
                [`premium${category}`]: Number((premium * conversionRates[contactAndLoginsAndCurrency.currency]) ),
                [`coverAmount${category}`]: Number((coverAmount * conversionRates[contactAndLoginsAndCurrency.currency])),

              }));
              

              const premiumDisplay = conversionRates[contactAndLoginsAndCurrency.currency] *  (Number(selectedPlan.premium)) ;
              setFormDataStep0Medical(prevState => ({
                ...prevState,
                [`premiumDisplay${category}`]:premiumDisplay
              })); 
             }
              } }


            
              // Deselect all selected plans

              const handleDeselectPlans = () =>{
                setFormDataStep0Medical(prevState => ({
                 ...prevState,
                  selectedPlanInpatient: null,
                  selectedPlanOutpatient: null,
                  selectedPlanDental: null,
                  selectedPlanOptical: null,
                  totalAmountInpatient: null,
                  totalAmountOutpatient: null,
                  totalAmountDental: null,
                  totalAmountOptical: null,
                  premiumInpatient: null,
                  premiumOutpatient: null,
                  premiumDental: null,
                  premiumOptical: null,
                  coverAmountInpatient: null,
                  coverAmountOutpatient: null,
                  coverAmountDental: null,
                  coverAmountOptical: null,
                  premiumDisplayInpatient: null,
                  premiumDisplayOutpatient: null,
                  premiumDisplayDental: null,
                  premiumDisplayOptical: null,
                }));
              }
          
         
      
    return (
      <div className="bg-white p-2 shadow-div shadow-3xl  mt-1">
        <form className="mt-4">
          <hr className="my-4 bg-gray-900"   />
          <div className='mb-4'>
            
            <h5 className='font-semibold'>Medical</h5>  
          </div>
  
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-2 gap-2">
            {/* Cover Type */}
          <div className="flex-1">
              <FormControl fullWidth variant="outlined" error={!!errors.coverType}>
                <InputLabel id="cover-type-label">Cover Type</InputLabel>
                <Select
                  labelId="cover-type-label"
                  id="cover-type"
                  label="Cover Type"
                  value={formDataStep0Medical.coverType}
                  onChange={(e) => {
                    setFormDataStep0Medical({ ...formDataStep0Medical, coverType: e.target.value });
                    if (errors.coverType) {
                      setErrors({ ...errors, coverType: '' });
                    }
                  }}
                >
                  <MenuItem value="per-person">Per-person Cover</MenuItem>
                  <MenuItem value="per-family">Per-family Cover (Shared)</MenuItem>
                </Select>
                {errors.coverType && (
                  <FormHelperText sx={{ fontSize: '0.75rem', color: 'error.main' }}>
                    {errors.coverType}
                  </FormHelperText>
                )}
              </FormControl>
            </div>
  
            {/* Dependant Count */}
              <div className="flex-1">
                <TextField
                  required
                  id="dependant-count"
                  label="Dependant Count"
                  variant="outlined"
                  fullWidth
                  type="number"
                   
                  value={formDataStep0Medical.dependantCount}
                  onChange={(e) => {
                    setFormDataStep0Medical({ ...formDataStep0Medical, dependantCount: e.target.value });
                    if (errors.dependantCount) {
                      setErrors({ ...errors, dependantCount: '' });
                    }
                  }}
                  error={!!errors.dependantCount}
                  helperText={errors.dependantCount}
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                />
              </div>
          
              {/* Policy Start Date */}
             <div className="flex-1">
                <TextField
                  label="DOB"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputProps: { min: today }, // Assuming `today` is a valid date string like 'YYYY-MM-DD'
                  }}
                  required
                  value={formDataStep0Medical?.policyStartDate || ''} // Use an empty string if null/undefined
                  onChange={(event) => {
                    const newValue = event.target.value; // Get the string value from the event
                    setFormDataStep0Medical({
                      ...formDataStep0Medical,
                      policyStartDate: newValue,
                    });

                    // Clear error if a valid date is selected
                    if (errors.policyStartDate) {
                      setErrors({ ...errors, policyStartDate: '' });
                    }
                  }}
                  error={!!errors.policyStartDate}
                  helperText={errors.policyStartDate} // Show the actual error message
                />
              </div>


          </div>
  
          {/* Product Options Table */}
          <div className="mt-6">
            <h5 className="font-semibold mb-2">Product Options</h5>
            <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: '#157EBC', color: 'white' }}>
                  <TableCell  align="center" sx={{ color: 'white', fontWeight: 'bold',padding: '8px' }}>Plan</TableCell>
                  <TableCell  align="center" sx={{ color: 'white', fontWeight: 'bold',padding: '8px' }}>Benefit</TableCell>
                  <TableCell  align="center" sx={{ color: 'white', fontWeight: 'bold' ,padding: '8px'}}>Cover Amount</TableCell>
                  <TableCell  align="center" sx={{ color: 'white', fontWeight: 'bold',padding: '8px' }}>Premium (Base)</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', padding: '8px' }}>
                                                {(formDataStep0Medical.selectedPlanInpatient === null &&
                                                  formDataStep0Medical.selectedPlanOutpatient === null &&
                                                  formDataStep0Medical.selectedPlanInpatient === null &&
                                                  formDataStep0Medical.selectedPlanDental === null  &&
                                                  formDataStep0Medical.selectedPlanOptical === null)
                                                  ? (
                                                    'Select'
                                                  ) : (
                                                    <DeselectIcon onClick={handleDeselectPlans} className=" mr-4" />
                                                  )}
                                                </TableCell>
                </TableRow>
              </TableHead>
              
              <TableBody>
                {renderCategory('Inpatient', MedicalPlans.filter(plan => plan.benefit === 'Inpatient'), formDataStep0Medical.selectedPlanInpatient, formDataStep0Medical.dependantCount,formDataStep0Medical.coverType,MedicalPlans)}
                {renderCategory('Outpatient', MedicalPlans.filter(plan => plan.benefit === 'Outpatient'), formDataStep0Medical.selectedPlanOutpatient, formDataStep0Medical.dependantCount,formDataStep0Medical.coverType,MedicalPlans)}
                {renderCategory('Dental', MedicalPlans.filter(plan => plan.benefit === 'Dental'), formDataStep0Medical.selectedPlanDental, formDataStep0Medical.dependantCount,formDataStep0Medical.coverType,MedicalPlans)}
                {renderCategory('Optical', MedicalPlans.filter(plan => plan.benefit === 'Optical'), formDataStep0Medical.selectedPlanOptical, formDataStep0Medical.dependantCount,formDataStep0Medical.coverType,MedicalPlans)}
              </TableBody>
            </Table>
          </TableContainer>
            {errors.selectedPlan && (
                <Alert severity="error">
                {errors.selectedPlan}
               </Alert>
            )}
            </div>
  
          {/* Container for two-column layout on large screens */}
          <div className="mt-6 flex flex-col lg:flex-row lg:gap-6">
            
            {/* Product Summary */}
            {formDataStep0Medical.selectedPlanInpatient && (
                <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white lg:w-1/2">
                    <div className="border-b border-gray-300 pb-2 mb-2">
                    <h5 className=" font-semibold mb-4">Premium Summary</h5>
                    </div>
                    <div className="flex flex-col gap-4 text-sm text-gray-700">
                    {/* Display summary based on selected plan and benefit */}
                    {MedicalPlans.filter(plan => plan.id === formDataStep0Medical.selectedPlanInpatient).map(plan => (
                        <div key={plan.id}>
                        <h3 className="font-medium font-semibold   ">{plan.benefit} Premium Summary</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-700 border-t">
                            <div className="flex justify-between border-b pt-2 border-gray-300 pb-2 mb-2">
                            <span className="font-medium">Premium</span>
                            <span>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the premium amount with thousands separators
                                  const formattedPremium = Number(formDataStep0Medical["premiumDisplayInpatient"]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedPremium}
                                    </>
                                  );
                                })()}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">ITL</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.002 * Number(formDataStep0Medical["premiumDisplayInpatient"]))  || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">PCF</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.0025 * Number(formDataStep0Medical["premiumDisplayInpatient"]))   || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                              <span className="font-medium">Stamp Duty</span>
                              <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * 40 || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="font-medium">TOTAL</span>
                            <span><b>Ksh { Number(formDataStep0Medical[`totalAmountInpatient`]).toLocaleString() || 'N/A'}</b></span>

                            <span>
                              <b>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the total amount with thousands separators
                                  const formattedTotalAmount = Number(formDataStep0Medical[`totalAmountInpatient`]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedTotalAmount}
                                    </>
                                  );
                                })()}
                              </b>
                            </span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}


              {formDataStep0Medical.selectedPlanOutpatient && (
                <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white lg:w-1/2">
                    <div className="border-b border-gray-300 pb-2 mb-2">
                    <h5 className=" font-semibold mb-4">Premium Summary</h5>

                    </div>
                    <div className="flex flex-col gap-4 text-sm text-gray-700">
                    {/* Display summary based on selected plan and benefit */}
                    {MedicalPlans.filter(plan => plan.id === formDataStep0Medical.selectedPlanOutpatient).map(plan => (
                        <div key={plan.id}>
                        <h3 className="font-medium font-semibold   ">{plan.benefit} Premium Summary</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-700 border-t">
                            <div className="flex justify-between border-b pt-2 border-gray-300 pb-2 mb-2">
                            <span className="font-medium">Premium</span>
                            <span>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the premium amount with thousands separators
                                  const formattedPremium = Number(formDataStep0Medical["premiumDisplayOutpatient"]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedPremium}
                                    </>
                                  );
                                })()}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">ITL</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.002 * Number(formDataStep0Medical["premiumDisplayOutpatient"]))  || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">PCF</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.0025 * Number(formDataStep0Medical["premiumDisplayOutpatient"]))   || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                              <span className="font-medium">Stamp Duty</span>
                              <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * 40 || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="font-medium">TOTAL</span>

                            <span>
                              <b>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the total amount with thousands separators
                                  const formattedTotalAmount = Number(formDataStep0Medical[`totalAmountOutpatient`]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedTotalAmount}
                                    </>
                                  );
                                })()}
                              </b>
                            </span>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}


            {formDataStep0Medical.selectedPlanDental && (
                <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white lg:w-1/2">
                    <div className="border-b border-gray-300 pb-2 mb-2">
                    <h5 className=" font-semibold mb-4">Premium Summary</h5>

                    </div>
                    <div className="flex flex-col gap-4 text-sm text-gray-700">
                    {/* Display summary based on selected plan and benefit */}
                    {MedicalPlans.filter(plan => plan.id === formDataStep0Medical.selectedPlanDental).map(plan => (
                        <div key={plan.id}>
                        <h3 className="font-medium font-semibold   ">{plan.benefit} Premium Summary</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-700 border-t">
                            <div className="flex justify-between border-b pt-2 border-gray-300 pb-2 mb-2">
                            <span className="font-medium">Premium</span>
                            <span>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the premium amount with thousands separators
                                  const formattedPremium = Number(formDataStep0Medical["premiumDisplayDental"]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedPremium}
                                    </>
                                  );
                                })()}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">ITL</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.002 * Number(formDataStep0Medical["premiumDisplayDental"]))  || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">PCF</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.0025 * Number(formDataStep0Medical["premiumDisplayDental"]))   || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                              <span className="font-medium">Stamp Duty</span>
                              <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * 40 || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="font-medium">TOTAL</span>
                            <span>
                              <b>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the total amount with thousands separators
                                  const formattedTotalAmount = Number(formDataStep0Medical[`totalAmountDental`]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedTotalAmount}
                                    </>
                                  );
                                })()}
                              </b>
                            </span>
                             </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}


              {formDataStep0Medical.selectedPlanOptical && (
                <div className="flex flex-col p-4 border rounded-lg shadow-md bg-white lg:w-1/2">
                    <div className="border-b border-gray-300 pb-2 mb-2">
                    <h5 className=" font-semibold mb-4">Premium Summary</h5>

                    </div>
                    <div className="flex flex-col gap-4 text-sm text-gray-700">
                    {/* Display summary based on selected plan and benefit */}
                    {MedicalPlans.filter(plan => plan.id === formDataStep0Medical.selectedPlanOptical).map(plan => (
                        <div key={plan.id}>
                        <h3 className="font-medium font-semibold   ">{plan.benefit} Premium Summary</h3>
                        <div className="flex flex-col gap-2 text-sm text-gray-700 border-t">
                            <div className="flex justify-between border-b pt-2 border-gray-300 pb-2 mb-2">
                            <span className="font-medium">Premium</span>
                            <span>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the premium amount with thousands separators
                                  const formattedPremium = Number(formDataStep0Medical["premiumDisplayOptical"]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedPremium}
                                    </>
                                  );
                                })()}
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">ITL</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.002 * Number(formDataStep0Medical["premiumDisplayOptical"]))  || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                            <span className="font-medium">PCF</span>
                            <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * (0.0025 * Number(formDataStep0Medical["premiumDisplayOptical"]))   || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                              <span className="font-medium">Stamp Duty</span>
                              <span>{  conversionRates[contactAndLoginsAndCurrency.currency] * 40 || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                            <span className="font-medium">TOTAL</span>
                            <span>
                              <b>
                                {(() => {
                                  // Map currency codes to their symbols
                                  const currencySymbols = {
                                    KES: 'Ksh.',
                                    USD: '$',
                                    EUR: '€',
                                    GBP: '£',
                                  };

                                  // Get the currency symbol based on the current currency
                                  const currencySymbol = currencySymbols[contactAndLoginsAndCurrency.currency] || '';

                                  // Format the total amount with thousands separators
                                  const formattedTotalAmount = Number(formDataStep0Medical[`totalAmountOptical`]).toLocaleString() || 'N/A';

                                  return (
                                    <>
                                      {currencySymbol} {formattedTotalAmount}
                                    </>
                                  );
                                })()}
                              </b>
                            </span> </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}

  
            {/* Disclaimer */}
            <div className={`lg:w-1/2 ${formDataStep0Medical.selectedPlan ? 'lg:pl-6' : ''}`}>
              <p className="text-sm text-gray-600 mt-6 lg:mt-0">
                <b>DISCLAIMER:</b> The premium shown is approximate and should be used for illustrative and general information purposes only. The final premium amount may change and will be determined accurately after further assessment.
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  };

 export default Step0Medical;