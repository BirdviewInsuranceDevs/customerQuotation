import React, { useState, useEffect } from "react";
import {  Select,  Autocomplete,  MenuItem,  FormControl,  InputLabel,  TextField,  Checkbox,  FormControlLabel,  Button, Dialog,  DialogActions,  DialogContent,  DialogTitle, FormHelperText, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
const Step1PersonalData = ({
  today,
  formDataStep1CustomerPersonalDetails,
  setFormDataStep1CustomerPersonalDetails,
  errors,
  dependantCount,
  setErrors,
  getDependantData,
  checkedAddProductItemsEvacuationRepatriation,
  checkedAddProductItemsLastExpense,
  checkedAddProductItemsMedical,
  checkedAddProductItemsHospitalCash,
  checkedAddProductItemsPersonalAccident,
}) => {
  const [openDependantaInforIcon , setOpenDependantaInforIcon] = useState(false);
  const [editIndexStep1, setEditIndexStep1] = useState(null);
  const [openUpdateUserFormDialogStep1, setOpenUpdateUserFormDialogStep1] =  useState(false);
  const [ formDataUpdateDependantDetailsDialogStep1, setFormDataUpdateDependantDetailsDialogStep1 ] = useState(null);
  const [dependantErrors, setDependantErrors] = useState({});
  const [policyNumberHolder, setPolicyNumberHolder] = useState(null);

  // handle open Dependant Icon   
  const usedPolicyNumbers = new Set(); // Set to store generated policy numbers

  function generatePolicyNumber() {
    const now = new Date(); 
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const millisecond = String(now.getMilliseconds()).padStart(3, '0');
    
    // Generate a random number between 100000 and 999999 for additional uniqueness
    const randomPart = Math.floor(100 + Math.random() * 900000);
  
    // Combine everything into the final policy number
    const policyNumber = `${year}${month}${day}${hour}${minute}${second}${millisecond}${randomPart}`;
    
    // Check for uniqueness
    if (usedPolicyNumbers.has(policyNumber)) {
      // If the policy number exists, generate a new one
      return generatePolicyNumber();
    }
  
       // Otherwise, add the new policy number to the Set
        usedPolicyNumbers.add(policyNumber);
        
        return policyNumber;
    }
    
    useEffect(() => {
        setPolicyNumberHolder(generatePolicyNumber());
    }, [ setPolicyNumberHolder,setFormDataStep1CustomerPersonalDetails]);

  const handleOpenDependantaInforIcon = () => {
    setOpenDependantaInforIcon((prev) => !prev);
  };

  const initialDependantDetails = () => { 
    // If no valid saved data, create default data
    return Array.from({ length: dependantCount }, (_, index) => ({
        principalNo: policyNumberHolder,
        dependantNo: index + 1,
        firstName: "",
        middleName: "",
        surname: "",
        dob: "",
        relationship: "",
        product: {
            evacuationRepatriation:checkedAddProductItemsEvacuationRepatriation,
            lastExpense: checkedAddProductItemsLastExpense,
            medical: checkedAddProductItemsMedical,
            hospitalCash: checkedAddProductItemsHospitalCash,
            personalAccident:  checkedAddProductItemsPersonalAccident,
        },
        evacuationRepatriation: false,
        lastExpense: false,
        medical: false,
        hospitalCash: false,
        personalAccident: false,
    }));
};

  

  const [DependantDetailsStep1, setDependantDetailsStep1] = useState(
    initialDependantDetails()
  );

  useEffect(() => {
    const savedDataString = localStorage.getItem("step2");
    let existingDependants = [];
  
    // Check if saved data exists
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      if (savedData.dependantPersonalData && Array.isArray(savedData.dependantPersonalData)) {
        existingDependants = savedData.dependantPersonalData;
      }
    }
  
    setDependantDetailsStep1((prevDependantDetails) => {
      // Create a copy of the existing details
      const updatedDetails = [...existingDependants];


  
      // If we need to increase the count
      if (dependantCount > updatedDetails.length) {
        const newEntries = Array.from(
          { length: dependantCount - updatedDetails.length },
          (_, index) => ({
            principalNo: policyNumberHolder,
            dependantNo: updatedDetails.length + index + 1,
            firstName: "",
            middleName: "",
            surname: "",
            dob: "",
            relationship: "",
            productMedical: {
           
            },
            evacuationRepatriation: false,
            lastExpense: false,
            medical: false,
            hospitalCash: false,
            personalAccident: false,
          })
        );
        updatedDetails.push(...newEntries); // Add new entries
      } 
      // If we need to decrease the count
      else if (dependantCount < updatedDetails.length) {
        updatedDetails.splice(dependantCount); // Remove excess entries
      }
  
      // Renumber dependantNo to keep it sequential
      return updatedDetails.map((dependant, index) => ({
        ...dependant,
        dependantNo: index + 1,
      }));
    });
  }, [
    dependantCount,
    checkedAddProductItemsEvacuationRepatriation,
    checkedAddProductItemsLastExpense,
    checkedAddProductItemsMedical,
    checkedAddProductItemsHospitalCash,
    checkedAddProductItemsPersonalAccident,
  ]);
  

  useEffect(() => {
   
    getDependantData(DependantDetailsStep1);
  }, [DependantDetailsStep1, getDependantData]); 
   
  useEffect(() => {
    setDependantDetailsStep1((prevDependantDetails) =>
      prevDependantDetails.map((dependant) => ({
        ...dependant,
        productMedical: {
          
        },
      }))
    );
  }, [
    checkedAddProductItemsEvacuationRepatriation,
    checkedAddProductItemsLastExpense,
    checkedAddProductItemsMedical,
    checkedAddProductItemsHospitalCash,
    checkedAddProductItemsPersonalAccident,
  ]);
  
 
  const handleClickEditDependantDetails = (index) => {
    setFormDataUpdateDependantDetailsDialogStep1(DependantDetailsStep1[index]);
    setEditIndexStep1(index);
    setOpenUpdateUserFormDialogStep1(true);
    setDependantErrors({});
  };

  const handleDeleteUpdateDialogStep1 = (index) => {
    const updatedDependantDetails = DependantDetailsStep1.filter(
      (_, i) => i !== index
    ).map((dependant, newIndex) => ({
      ...dependant,
      dependantNo: newIndex + 1,
    }));
  
    setDependantDetailsStep1(updatedDependantDetails);
  };
  

  const handleCloseupdateDialogStep1 = () => {
    setOpenUpdateUserFormDialogStep1(false);
    setEditIndexStep1(null);
    setFormDataUpdateDependantDetailsDialogStep1(null);
    setDependantErrors({});
  };

  const handleChangeDialogsDependantDetails = (e) => {
    setFormDataUpdateDependantDetailsDialogStep1({
      ...formDataUpdateDependantDetailsDialogStep1,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveDependantDetails = () => {
    const newErrors = {};
    if (!formDataUpdateDependantDetailsDialogStep1?.firstName)
      newErrors.firstName = "First Name is required";
    if (!formDataUpdateDependantDetailsDialogStep1?.surname)
      newErrors.surname = "Surname is required";
    if (!formDataUpdateDependantDetailsDialogStep1?.dob)
      newErrors.dob = "Date of Birth is required";
    if (!formDataUpdateDependantDetailsDialogStep1?.relationship)
      newErrors.relationship = "Relationship is required";
    if (Object.keys(newErrors).length > 0) {
      setDependantErrors(newErrors);
      return;
    }
    const updatedDependantDetails = [...DependantDetailsStep1];
    updatedDependantDetails[editIndexStep1] =
      formDataUpdateDependantDetailsDialogStep1;
    setDependantDetailsStep1(updatedDependantDetails);
    handleCloseupdateDialogStep1();
  };  
       
    const countries = [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo',
        'Congo, Democratic Republic of the',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        'Eswatini',
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Korea, North',
        'Korea, South',
        'Kosovo',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
    ];

    return (
        <div>
            {/* Personal Details Section */}
            <div className="shadow-div mb-4">
                <div className='mb-4'>
                    <h5 className='font-semibold'>Customer Personal Details</h5>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 mb-2 gap-2">
                    {/* Title */}
                    <div className="flex-1">
                    <FormControl fullWidth variant="outlined" error={!!errors.title}>
                        <InputLabel   required id="title-label">Title</InputLabel>
                        <Select
                            labelId="title-label"
                            label="Title"
                          
                            value={formDataStep1CustomerPersonalDetails.title}
                            onChange={(e) => {
                            setFormDataStep1CustomerPersonalDetails({
                                ...formDataStep1CustomerPersonalDetails,
                                title: e.target.value,
                            });

                            // Corrected the condition to check for `errors.title`
                            if (errors.title) {
                                setErrors({ ...errors, title: '' });
                            }
                            }}
                        >
                            <MenuItem value="Mr">Mr</MenuItem>
                            <MenuItem value="Ms">Ms</MenuItem>
                            <MenuItem value="Mrs">Mrs</MenuItem>
                            <MenuItem value="Dr">Mrs</MenuItem>
                            <MenuItem value="Prof">Mrs</MenuItem>
                        </Select>

                        {errors.title && (
                            <FormHelperText sx={{ fontSize: '0.75rem', color: 'error.main' }}>
                            {errors.title}
                            </FormHelperText>
                        )}
                        </FormControl>

                    </div>

                    {/* First Name */}
                    <div className="flex-1">
                        <TextField label="First Name" variant="outlined" fullWidth required
                            value={formDataStep1CustomerPersonalDetails.firstName}
                            onChange={(e) => {
                            setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, firstName: e.target.value });
                            if (errors.firstName) {
                                setErrors({ ...errors, firstName: '' });
                            }
                            }}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </div>

                    {/* Middle Name */}
                    <div className="flex-1">
                        <TextField label="Middle Name" variant="outlined" fullWidth 
                          value={formDataStep1CustomerPersonalDetails.middleName}
                          onChange={(e) => {
                          setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, middleName : e.target.value });
                          }} />
                    </div>

                    {/* Surname */}
                    <div className="flex-1">
                        <TextField label="Surname" variant="outlined" fullWidth required
                          value={formDataStep1CustomerPersonalDetails.surname}
                          onChange={(e) => {
                          setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, surname: e.target.value });
                          if (errors.surname) {
                              setErrors({ ...errors, surname: '' });
                          }
                          }}
                          error={!!errors.surname}
                          helperText={errors.surname}
                        />
                    </div>

                    {/* DOB */}
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
                                inputProps: { max: today },
                            }}
                            required

                            value={formDataStep1CustomerPersonalDetails.dob}
              
                            onChange={(e) => {
                              const newDate = e.target.value;
                              setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails,dob: newDate });
                              if (errors.dob) {
                                setErrors({ ...errors, dob: '' });
                              }
                            }}

                            error={!!errors.dob}
                            helperText={errors.dob}
              
                        />
                    </div>

                    {/* Gender */}
                    <div className="flex-1">
                        <FormControl fullWidth variant="outlined" error={!!errors.gender} >
                            <InputLabel   required id="gender-label">Gender</InputLabel>
                            <Select labelId="gender-label" label="Gender" required
                             value={formDataStep1CustomerPersonalDetails.gender}
                             onChange={(e) => {
                                 setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, gender  : e.target.value });
                                 if (errors.gender) {
                                   setErrors({ ...errors, gender: '' });
                                 }
                               }}
                            
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                            {errors.gender && (
                                <FormHelperText sx={{ fontSize: '0.75rem', color: 'error.main' }}>
                                {errors.gender}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </div>

                    {/* Nationality */}
                    <div className="flex-1">
                       <Autocomplete
                        disablePortal
                        options={countries}
                        value={formDataStep1CustomerPersonalDetails.nationality}
                        onChange={(e, value) => {
                            setFormDataStep1CustomerPersonalDetails({ 
                            ...formDataStep1CustomerPersonalDetails, 
                            nationality: value 
                            });
                            if (errors.nationality) {
                            setErrors({ ...errors, nationality: '' });
                            }
                        }}
                        renderInput={(params) => (
                            <TextField 
                            {...params} 
                            label="Country of Nationality"
                            required 
                            error={!!errors.nationality}
                            helperText={errors.nationality}
                            />
                        )}
                        />

                    </div>

                    {/* Country of Residence */}
                    <div className="flex-1">
                    <Autocomplete
                        options={countries}
                        value={formDataStep1CustomerPersonalDetails.countryofResidence}
                        disablePortal
                        onChange={(e, value) => {
                            setFormDataStep1CustomerPersonalDetails({ 
                            ...formDataStep1CustomerPersonalDetails, 
                            countryofResidence: value 
                            });
                            if (errors.countryofResidence) {
                            setErrors({ ...errors, countryofResidence: '' });
                            }
                        }}
                        isOptionEqualToValue={(option, value) => option.label === value.label} 
                        renderInput={(params) => (
                            <TextField 
                            {...params} 
                            label="Country of Residence" 
                            variant="outlined" 
                            fullWidth 
                            required 
                            error={!!errors.countryofResidence}
                            helperText={errors.countryofResidence}
                            />
                        )}
                        />
                    </div>

                    {/* National ID/Passport No */}
                    <div className="flex-1">
                        <TextField label="National ID/Passport No" variant="outlined" fullWidth required
                        
                        value={formDataStep1CustomerPersonalDetails.nationalIDPassportNo}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, nationalIDPassportNo: e.target.value });
                        if (errors.nationalIDPassportNo) {
                            setErrors({ ...errors, nationalIDPassportNo: '' });
                        }
                        }}
                        error={!!errors.nationalIDPassportNo}
                        helperText={errors.nationalIDPassportNo}
                        />
                    </div>

                    {/* NHIF */}
                    <div className="flex-1">
                        <TextField label="NHIF" variant="outlined" fullWidth 
                        value={formDataStep1CustomerPersonalDetails.nhif}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, nhif: e.target.value });
                        }}
                        />
                    </div>

                    {/* PIN */}
                    <div className="flex-1">
                        <TextField label="PIN" variant="outlined" fullWidth
                        value={formDataStep1CustomerPersonalDetails.pin}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, pin: e.target.value });
                        }}
                         />
                    </div>

                    {/* Employer */}
                    <div className="flex-1">
                        <TextField label="Employer" variant="outlined" fullWidth
                        value={formDataStep1CustomerPersonalDetails.employer}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, employer: e.target.value });
                        }}
                         />
                    </div>

                    {/* Postal Address */}
                    <div className="flex-1">
                        <TextField label="Postal Address" variant="outlined" fullWidth
                        value={formDataStep1CustomerPersonalDetails.postalAddress}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, postalAddress: e.target.value });
                        }}
                        />
                    </div>

                    {/* Code */}
                    <div className="flex-1">
                        <TextField label="Code" variant="outlined" fullWidth
                        value={formDataStep1CustomerPersonalDetails.code}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, code: e.target.value });
                        }}
                        
                        />
                    </div>

                    {/* Town */}
                    <div className="flex-1">
                        <TextField label="Town" variant="outlined" fullWidth required 
                        value={formDataStep1CustomerPersonalDetails.town}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, town: e.target.value });
                        if (errors.town) {
                            setErrors({ ...errors, town: '' });
                        }
                        }}
                        error={!!errors.town}
                        helperText={errors.town}
                        
                        />
                    </div>

                    {/* Occupation */}
                    <div className="flex-1">
                        <TextField label="Occupation" variant="outlined" fullWidth
                        value={formDataStep1CustomerPersonalDetails.occupation}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, occupation: e.target.value });
                        }}
                        
                        />
                    </div>

                    {/* Physical Address */}
                    <div className="flex-1">
                        <TextField label="Physical Address" variant="outlined" fullWidth
                        value={formDataStep1CustomerPersonalDetails.physicalAddress}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, physicalAddress: e.target.value });
                        }}
                         />
                    </div>

                    {/* Mobile No */}
                    <div className="flex-1">
                        <TextField label="Mobile No" variant="outlined" fullWidth required
                        value={formDataStep1CustomerPersonalDetails.mobileNo}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, mobileNo: e.target.value });
                        if (errors.mobileNo) {
                            setErrors({ ...errors,mobileNo: '' });
                        }
                        }}
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo}
                        
                        />
                    </div>

                    {/* Other Phone */}
                    <div className="flex-1">
                        <TextField label="Other Phone" variant="outlined" fullWidth
                         value={formDataStep1CustomerPersonalDetails.otherPhone}
                         onChange={(e) => {
                         setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails,otherPhone: e.target.value });
                         }}
                        
                        />
                    </div>

                    {/* Email */}
                    <div className="flex-1">
                        <TextField label="Email" variant="outlined" fullWidth required 
                        value={formDataStep1CustomerPersonalDetails.email}
                        onChange={(e) => {
                        setFormDataStep1CustomerPersonalDetails({ ...formDataStep1CustomerPersonalDetails, email: e.target.value });
                        if (errors.email) {
                            setErrors({ ...errors,email: '' });
                        }
                        }}
                        error={!!errors.email}
                        helperText={errors.email}
                        />
                    </div>
                </div>
            </div>

            {/* Dependants Table */}
            {(checkedAddProductItemsMedical || checkedAddProductItemsHospitalCash) &&
            <div className="shadow-div mt-4">
                 <div className='mb-4'>
                    <h5 className='font-semibold'>   Dependant Details  <span onClick={handleOpenDependantaInforIcon}>   <InfoIcon className='text-blue-900' style={{color:'#157EBc'}} />  </span>  </h5>
                     <Tooltip title="Applicable To Medical and Hospital cash!" open={openDependantaInforIcon} onClose={() => setOpenDependantaInforIcon(false)} arrow>  <span />  </Tooltip>
                </div>

                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-600 text-white" >
                        <tr>
                        <th className="py-2 px-4 text-center border-b">Principal No</th>
                        <th className="py-2 px-4 text-center border-b">Dependant No</th>
                        <th className="py-2 px-4 text-center border-b">First Name</th>
                        <th className="py-2 px-4 text-center border-b">Middle Name</th>
                        <th className="py-2 px-4 text-center border-b">Surname</th>
                        <th className="py-2 px-4 text-center border-b">DOB</th>
                        <th className="py-2 px-4 text-center border-b">Relationship</th>
                        {checkedAddProductItemsEvacuationRepatriation && <th className="py-2 px-4 text-center border-b">Evacuation & Repatriation</th>}
                        {checkedAddProductItemsLastExpense && <th className="py-2 px-4 text-center border-b">Last Expense</th>}
                        {checkedAddProductItemsMedical && <th className="py-2 px-4 text-center border-b">Medical</th>}
                        {checkedAddProductItemsHospitalCash && <th className="py-2 px-4 text-center border-b">Hospital Cash</th>}
                        {checkedAddProductItemsPersonalAccident && <th className="py-2 px-4 text-center border-b">Personal Accident</th>}
                        <th className="py-2 px-4 text-center border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DependantDetailsStep1.map((dependant, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 text-center border-b">{dependant.principalNo}</td>
                            <td className="py-2 px-4 text-center border-b">{dependant.dependantNo}</td>
                            <td className="py-2 px-4 text-center border-b">{dependant.firstName}</td>
                            <td className="py-2 px-4 text-center border-b">{dependant.middleName}</td>
                            <td className="py-2 px-4 text-center border-b">{dependant.surname}</td>
                            <td className="py-2 px-4 text-center border-b">{dependant.dob}</td>
                            <td className="py-2 px-4 text-center border-b">{dependant.relationship}</td>
                            {checkedAddProductItemsEvacuationRepatriation && (
                            <td className="py-2 px-4 text-center border-b">
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dependant.evacuationRepatriation}
                                    disabled
                                    />
                                }
                                label=""
                                />
                            </td>
                            )}
                            {checkedAddProductItemsLastExpense && (
                            <td className="py-2 px-4 text-center border-b">
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dependant.lastExpense}
                                    disabled
                                    />
                                }
                                label=""
                                />
                            </td>
                            )}
                            {checkedAddProductItemsMedical && (
                            <td className="py-2 px-4 text-center border-b">
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dependant.medical}
                                    disabled
                                    />
                                }
                                label=""
                                />
                            </td>
                            )}
                            {checkedAddProductItemsHospitalCash && (
                            <td className="py-2 px-4 text-center border-b">
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dependant.hospitalCash}
                                    disabled
                                    />
                                }
                                label=""
                                />
                            </td>
                            )}
                            {checkedAddProductItemsPersonalAccident && (
                            <td className="py-2 px-4 text-center border-b">
                                <FormControlLabel
                                control={
                                    <Checkbox
                                    checked={dependant.personalAccident}
                                    disabled
                                    />
                                }
                                label=""
                                />
                            </td>
                            )}
                            <td className="py-2 px-4 text-center border-b">
                            <div className="flex justify-center space-x-2">
                                <Button
                                color="primary"
                                onClick={() => handleClickEditDependantDetails(index)}
                                >
                                Edit
                                </Button>
                                <DeleteIcon
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => handleDeleteUpdateDialogStep1(index)}
                                />
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>

                </div>
            </div>
             }
            {/* Dialog for editing dependant details */}
            <Dialog open={openUpdateUserFormDialogStep1} onClose={handleCloseupdateDialogStep1}>
                <DialogTitle>Edit Dependant</DialogTitle>
                <DialogContent>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formDataUpdateDependantDetailsDialogStep1?.firstName || ''}
                        onChange={handleChangeDialogsDependantDetails}
                        fullWidth
                        margin="dense"
                        error={!!dependantErrors.firstName}
                        helperText={dependantErrors.firstName}
                    />
                    <TextField
                        label="Middle Name"
                        name="middleName"
                        value={formDataUpdateDependantDetailsDialogStep1?.middleName || ''}
                        onChange={handleChangeDialogsDependantDetails}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Surname"
                        name="surname"
                        value={formDataUpdateDependantDetailsDialogStep1?.surname || ''}
                        onChange={handleChangeDialogsDependantDetails}
                        fullWidth
                        margin="dense"
                        error={!!dependantErrors.surname}
                        helperText={dependantErrors.surname}
                    />
                    <TextField
                        label="DOB"
                        name="dob"
                        type="date"
                        value={formDataUpdateDependantDetailsDialogStep1?.dob || ''}
                        onChange={handleChangeDialogsDependantDetails}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            inputProps: { max: today },
                        }}
                        error={!!dependantErrors.dob}
                        helperText={dependantErrors.dob}
                    />
                    <FormControl fullWidth margin="dense" error={!!dependantErrors.relationship}>
                    <InputLabel id="relationship-label">Relationship</InputLabel>
                    <Select
                        labelId="relationship-label"
                        name="relationship"
                        value={formDataUpdateDependantDetailsDialogStep1?.relationship || ''}
                        onChange={handleChangeDialogsDependantDetails}
                        label="Relationship">
                        <MenuItem value="Child">Child</MenuItem>
                        <MenuItem value="Spouse">Spouse</MenuItem>
                        {/* Add other options if needed */}
                    </Select>
                    {dependantErrors.relationship && <FormHelperText>{dependantErrors.relationship}</FormHelperText>}
                </FormControl>

                       {checkedAddProductItemsEvacuationRepatriation && (
                            <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formDataUpdateDependantDetailsDialogStep1?.evacuationRepatriation || false}
                                    onChange={() => setFormDataUpdateDependantDetailsDialogStep1({ ...formDataUpdateDependantDetailsDialogStep1, evacuationRepatriation: !formDataUpdateDependantDetailsDialogStep1?.evacuationRepatriation })}
                                />
                            }
                               label="Evacuation & Repatriation"
                            />
                       )}

                        {checkedAddProductItemsLastExpense && (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formDataUpdateDependantDetailsDialogStep1?.lastExpense || false}
                                    onChange={() => setFormDataUpdateDependantDetailsDialogStep1({ ...formDataUpdateDependantDetailsDialogStep1, lastExpense: !formDataUpdateDependantDetailsDialogStep1?.lastExpense })}
                                />
                            }
                            label="Last Expense"
                        />)}

                        {checkedAddProductItemsMedical && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="medical"
                                         checked={formDataUpdateDependantDetailsDialogStep1?.medical || false}
                                         onChange={() => setFormDataUpdateDependantDetailsDialogStep1({ ...formDataUpdateDependantDetailsDialogStep1, medical: !formDataUpdateDependantDetailsDialogStep1?.medical })}
                                    />
                                }
                                label="Medical"
                            />
                        )}

                       {checkedAddProductItemsHospitalCash && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="hospitalCash"
                                        checked={formDataUpdateDependantDetailsDialogStep1?.hospitalCash || false}
                                        onChange={() => setFormDataUpdateDependantDetailsDialogStep1({ ...formDataUpdateDependantDetailsDialogStep1, hospitalCash: !formDataUpdateDependantDetailsDialogStep1?.hospitalCash })}
                                    />
                                }
                                label="Hospital Cash"
                            />
                        )}

                         {checkedAddProductItemsPersonalAccident && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="personalAccident"
                                        checked={formDataUpdateDependantDetailsDialogStep1?.personalAccident || false}
                                        onChange={() => setFormDataUpdateDependantDetailsDialogStep1({ ...formDataUpdateDependantDetailsDialogStep1, personalAccident: !formDataUpdateDependantDetailsDialogStep1?.personalAccident })}
                                    />
                                }
                                label="Personal Accident"
                            />
                        )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseupdateDialogStep1} color="primary">Cancel</Button>
                    <Button onClick={handleSaveDependantDetails} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Step1PersonalData;