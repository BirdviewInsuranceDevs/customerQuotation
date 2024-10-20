import React, { useState,useEffect } from "react";
import { TextField, Checkbox, FormControlLabel, Radio, RadioGroup, FormLabel } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
const ProposerForm = ({setProposerHistoryData}) => {

     const data = JSON.parse(localStorage.getItem('QuotationData')) || {};


     const savedformData = data.proposerHistoryData || {
        "1": { question: "What actual duties do you perform?", answer: "", otherDetails: "" },
        "2a": { question: "Do you suffer from: (a) Any sight hearing or any other impairment?", answer: "", details: "" },
        "2b": { question: "Have you ever suffered any serious injury or illness?", answer: "", details: "" },
        "2c": { question: "Are you at present in sound health and free of any physical disability?", answer: "", details: "" },
        "3": { question: "Do you engage in hazardous sporting activities or pastimes?", answer: "", details: "" },
        "4": { question: "Are there any circumstances relating with your occupation, health conditions, habits, pastimes and pursuits which would increase the risk of accident or bodily injury to yourself?", answer: "", details: "" },
        "5": { question: "In your normal duties, do you use machinery of any kind?", answer: "", details: "" },
        "6": { question: "Do you have a Medical or have you previously had a Medical Insurance cover?", answer: "", details: "" },
        "7": { question: "Do you, in the course of your duties travel extensively by Air, Car or Motor Cycle?", answer: "", details: "" },
        "8": [ 
            { name: "", age: "", relationship: "",details: "" },
            { name: "", age: "", relationship: "",details: "" },
        ],
        "9": { question: "Cancelled your Policy?", answer: "", details: "" },
        "10a": { question: "Do you at present hold or pre?", answer: "", details: "" },
        "10b": { question: "Declined to insure you?", answer: "", details: "" },
        "10c": { question: "Declined to renew your Policy?", answer: "", details: "" },
        "10d": { question: "Imposed any special terms?", answer: "", details: "" },
        "10e": { question: "Declined any claim?", answer: "", details: "" },
    }


    const [formData, setFormData] =useState(savedformData);


    useEffect(() => {
        setProposerHistoryData(formData);

    }, [formData]);
 
    const handleCheckboxChange = (option) => {
        setFormData((prevData) => ({
            ...prevData,
            "1": { ...prevData["1"], answer: option, otherDetails: option === "other" ? prevData["1"].otherDetails : "" }
        }));
        setProposerHistoryData(formData);
    };

    const handleOtherDetailsChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            "1": { ...prevData["1"], otherDetails: value }
        }));
        setProposerHistoryData(formData);
    };

    const handleRadioChange = (e, key) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [key]: { ...prevData[key], answer: value }
        }));
        setProposerHistoryData(formData);
    };

    const handleDetailsChange = (e, key) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [key]: { ...prevData[key], details: value }
        }));
        setProposerHistoryData(formData);
    };

    const handleBeneficiaryChange = (index, field, value) => {
        const updatedBeneficiaries = [...formData["8"]];
        updatedBeneficiaries[index][field] = value;
        setFormData((prevData) => ({
            ...prevData,
            "8": updatedBeneficiaries,
        }));
        setProposerHistoryData(formData);
    };

   

    return ( 
        <div className="p-4 sm:p-2 md:p-4 lg:p-6 shadow-div shadow-3xl m-4">
              <hr/>
            <h3 className="text-lg font-semibold mb-4 text-center">PROPOSER HISTORY

                 <Tooltip
                    title={
                        <span>
                            <strong>Note:</strong> Please note that the following activities and others of a similar nature are not covered unless on a special arrangement, in which case additional premium will be charged: <br />
                            - Aqualung diving, boxing, climbing or mountaineering necessitating the use of ropes or guides, football (except amateur football), hang gliding, wild hunting, ice hockey, motor racing, motorcycle racing, parachuting, polo, potholing, power boating, racing other than on foot, rugby, show jumping, skiing or sledging, water skiing, ice skating, winter sports, wrestling including judo, karate, and any other unarmed combat, yachting outside territorial waters, and any other hazardous occupations/activities.
                        </span>
                    }
                    arrow
                    placement="right"
                    disableInteractive
                    >
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>



            </h3>
              <hr/>

            {/* Question 1 */}
            <div className="mb-4">
                <p>1. {formData["1"].question} (If more than one, state all)</p>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData["1"].answer === "officeDuties"}
                            onChange={() => handleCheckboxChange("officeDuties")}
                        />
                    }
                    label="Office duties"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData["1"].answer === "officeSiteVisits"}
                            onChange={() => handleCheckboxChange("officeSiteVisits")}
                        />
                    }
                    label="Office duties with site visits"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData["1"].answer === "supervisionWorking"}
                            onChange={() => handleCheckboxChange("supervisionWorking")}
                        />
                    }
                    label="Supervision and working"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData["1"].answer === "commercialTraveler"}
                            onChange={() => handleCheckboxChange("commercialTraveler")}
                        />
                    }
                    label="Commercial traveler (sales person/driver)"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData["1"].answer === "manualWorker"}
                            onChange={() => handleCheckboxChange("manualWorker")}
                        />
                    }
                    label="Manual worker"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData["1"].answer === "other"}
                            onChange={() => handleCheckboxChange("other")}
                        />
                    }
                    label="Other (please specify)"
                />
                {formData["1"].answer === "other" && (
                    <TextField
                        fullWidth
                        label="Please specify your duties"
                        variant="outlined"
                        value={formData["1"].otherDetails}
                        onChange={handleOtherDetailsChange}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 2a */}
            <div className="mb-4">
                <p>2a. {formData["2a"].question}</p>
                <RadioGroup row name="2a" value={formData["2a"].answer} onChange={(e) => handleRadioChange(e, "2a")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["2a"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="if YES explain briefly"
                        variant="outlined"
                        value={formData["2a"].details}
                        onChange={(e) => handleDetailsChange(e, "2a")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 2b */}
            <div className="mb-4">
                <p>2b. {formData["2b"].question}</p>
                <RadioGroup row name="2b" value={formData["2b"].answer} onChange={(e) => handleRadioChange(e, "2b")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["2b"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If YES, give details."
                        variant="outlined"
                        value={formData["2b"].details}
                        onChange={(e) => handleDetailsChange(e, "2b")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 2c */}
            <div className="mb-4">
                <p>2c. {formData["2c"].question}</p>
                <RadioGroup row name="2c" value={formData["2c"].answer} onChange={(e) => handleRadioChange(e, "2c")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["2c"].answer === "no" && (
                    <TextField
                        fullWidth
                        label="If NO, give details."
                        variant="outlined"
                        value={formData["2c"].details}
                        onChange={(e) => handleDetailsChange(e, "2c")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 3 */}
            <div className="mb-4">
                <p>3. {formData["3"].question}</p>
                <RadioGroup row name="3" value={formData["3"].answer} onChange={(e) => handleRadioChange(e, "3")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["3"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If YES, give details"
                        variant="outlined"
                        value={formData["3"].details}
                        onChange={(e) => handleDetailsChange(e, "3")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 4 */}
            <div className="mb-4">
                <p>4. {formData["4"].question}</p>
                <RadioGroup row name="4" value={formData["4"].answer} onChange={(e) => handleRadioChange(e, "4")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["4"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If YES, give details."
                        variant="outlined"
                        value={formData["4"].details}
                        onChange={(e) => handleDetailsChange(e, "4")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 5 */}
            <div className="mb-4">
                <p>5. {formData["5"].question}</p>
                <RadioGroup row name="5" value={formData["5"].answer} onChange={(e) => handleRadioChange(e, "5")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["5"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If YES, give details"
                        variant="outlined"
                        value={formData["5"].details}
                        onChange={(e) => handleDetailsChange(e, "5")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 6 */}
            <div className="mb-4">
                <p>6. {formData["6"].question}</p>
                <RadioGroup row name="6" value={formData["6"].answer} onChange={(e) => handleRadioChange(e, "6")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["6"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If YES, please explain"
                        variant="outlined"
                        value={formData["6"].details}
                        onChange={(e) => handleDetailsChange(e, "6")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Question 7 */}
            <div className="mb-4">
                <p>7. {formData["7"].question}</p>
                <RadioGroup row name="7" value={formData["7"].answer} onChange={(e) => handleRadioChange(e, "7")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["7"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If YES, please explain"
                        variant="outlined"
                        value={formData["7"].details}
                        onChange={(e) => handleDetailsChange(e, "7")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            {/* Beneficiary Section */}
            <div className="mb-4">

            <p>8.  Named Beneficiary {formData["8"].question}</p>
                {formData["8"].map((beneficiary, index) => (
                    <> 
                    <div key={index} className="mb-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        <TextField
                            fullWidth
                            label={`Beneficiary ${index + 1} Name`}
                            variant="outlined"
                            value={beneficiary.name}
                            onChange={(e) => handleBeneficiaryChange(index, "name", e.target.value)}
                            sx={{ mr: 2 }}
                        />
                        <TextField
                            fullWidth
                            label={`Beneficiary ${index + 1} Age`}
                            variant="outlined"
                            value={beneficiary.age}
                            onChange={(e) => handleBeneficiaryChange(index, "age", e.target.value)}
                            sx={{ mr: 2 }}

                        />
                        <TextField
                            select
                            fullWidth
                            label={`Beneficiary ${index + 1} Relationship`}
                            variant="outlined"
                            value={beneficiary.relationship}
                            onChange={(e) => handleBeneficiaryChange(index, 'relationship', e.target.value)}
                        >
                            <MenuItem value="spouse">Spouse</MenuItem>
                            <MenuItem value="child">Child</MenuItem>
                            <MenuItem value="parent">Parent</MenuItem>
                            <MenuItem value="sibling">Sibling</MenuItem>
                            <MenuItem value="friend">Friend</MenuItem>
                            {/* Add more static options as needed */}
                        </TextField>
                        
                    </div>
                        <TextField
                            fullWidth
                            label={`If beneficiary ${index + 1} is below 18 years, give name of appointed Guardian and address (Optional)`}
                            variant="outlined"
                            value={beneficiary.details}
                            onChange={(e) => handleBeneficiaryChange(index, "details", e.target.value)}
                            multiline
                            rows={3}
                            sx={{ mb: 2 }}
                        />
                    </>
                    
                ))}
              </div>

              <hr/>
              <h3 className="text-lg font-semibold mb-4  text-center ">INSURANCE HISTORY</h3>
              <hr/>
 
                  {/* Question 9 */}
            <div className="mb-4">
                <p>9. {formData["9"].question}</p>
                <RadioGroup row name="9" value={formData["9"].answer} onChange={(e) => handleRadioChange(e, "9")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["9"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If yes, please give name of Insurer and Policy Number(s)"
                        variant="outlined"
                        value={formData["9"].details}
                        onChange={(e) => handleDetailsChange(e, "9")}
                        multiline
                        rows={3}
                    />
                )}
            </div>


            <div className="mb-4">
                <p> Has any Insurance Company ever;</p>
                <p>10a. {formData["10a"].question}</p>
                <RadioGroup row name="10a" value={formData["10a"].answer} onChange={(e) => handleRadioChange(e, "10a")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["10a"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If the answer for any of the above reasons is ‘YES’. Please give details."
                        variant="outlined"
                        value={formData["10a"].details}
                        onChange={(e) => handleDetailsChange(e, "10a")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            <div className="mb-4">
                <p>10b. {formData["10b"].question}</p>
                <RadioGroup row name="10b" value={formData["10b"].answer} onChange={(e) => handleRadioChange(e, "10b")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["10b"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If the answer for any of the above reasons is ‘YES’. Please give details."
                        variant="outlined"
                        value={formData["10b"].details}
                        onChange={(e) => handleDetailsChange(e, "10b")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            <div className="mb-4">
                <p>10c. {formData["10c"].question}</p>
                <RadioGroup row name="10b" value={formData["10c"].answer} onChange={(e) => handleRadioChange(e, "10c")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["10c"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If the answer for any of the above reasons is ‘YES’. Please give details."
                        variant="outlined"
                        value={formData["10c"].details}
                        onChange={(e) => handleDetailsChange(e, "10c")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            <div className="mb-4">
                <p>10d. {formData["10d"].question}</p>
                <RadioGroup row name="10b" value={formData["10d"].answer} onChange={(e) => handleRadioChange(e, "10d")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["10d"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If the answer for any of the above reasons is ‘YES’. Please give details."
                        variant="outlined"
                        value={formData["10d"].details}
                        onChange={(e) => handleDetailsChange(e, "10d")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

            
            <div className="mb-4">
                <p>10e. {formData["10e"].question}</p>
                <RadioGroup row name="10b" value={formData["10e"].answer} onChange={(e) => handleRadioChange(e, "10e")}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {formData["10e"].answer === "yes" && (
                    <TextField
                        fullWidth
                        label="If the answer for any of the above reasons is ‘YES’. Please give details."
                        variant="outlined"
                        value={formData["10e"].details}
                        onChange={(e) => handleDetailsChange(e, "10e")}
                        multiline
                        rows={3}
                    />
                )}
            </div>

             

        </div>
    );
};

export default ProposerForm;
