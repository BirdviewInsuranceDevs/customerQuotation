import React  from 'react';
import IconButton from '@mui/material/IconButton'; 
import CloseIcon from '@mui/icons-material/Close';  

const TermsAndConditions = ({setOpenTermsAndConditions}) => {
 


  const policyTerms = [
    {
      termNumber: 1,
      title: "Policy and Schedule One Contract",
      description: "This policy and the Schedule shall be read together as one contract and any word or expression to which a specific meaning has been attached in any part of this Policy or of the Schedule shall bear such specific meaning wherever it may appear."
    },
    {
      termNumber: 2,
      title: "Inception of Insurance",
      description: "No Insurance shall be in force or effective until the Proposal form has been accepted by the Company and the Insured has paid the premium."
    },
    {
      termNumber: 3,
      title: "Insured Persons",
      description: "An Insured Person shall be any person who, with the prior consent of the Insurer, shall have applied to the Company for membership by submitting an application form and a declaration of health and whose application shall have been accepted in writing by the Company. Dependants, if any, mentioned in the application for membership shall be deemed to fall within the definition of 'Insured Person', and the terms, conditions, limitations, and exceptions of this policy shall apply to every dependant as if a separate application form and declaration of health had been submitted to the Company in each case. Eligible for the main member and his/her legal dependants from the age of 65 to 80 years."
    },
    {
      termNumber: 4,
      title: "Evidence required by the Company",
      description: "Every person applying to be insured under this contract shall furnish to the Company at his own expense all such medical and other evidence as the Company may reasonably require and shall submit to medical examination by a Medical Officer to be appointed by the company if so required. During the term of the contract, the Company shall have the prerogative to require further medical examination and to have free access to medical records as may be deemed necessary."
    },
    {
      termNumber: 5,
      title: "Grace Period",
      description: "Thirty (30) days are allowed for payment of each renewal premium upon confirmation by the insured of renewal of cover. In the event of non-payment of premiums within the grace period, all the attached benefit cover shall lapse and become void."
    },
    {
      termNumber: 6,
      title: "Approved Hospitals and Physicians",
      description: "The Insurance expressed in this Policy shall be operative in respect of treatment received in any legally recognized hospital or from any legally registered medical practitioner registered with the Kenya Medical Practitioners and Dentists Board. Acupuncturists, Herbalists, Chiropractors, and other alternative medicine practitioners are not recognized under this policy."
    },
    {
      termNumber: 7,
      title: "Premiums",
      description: "All premiums are payable to the Company annually in advance. The premium payable in respect of Insured Persons shall be paid to the Company immediately such Insured Persons are accepted by the Company. The company reserves the right to suspend access to services on a credit basis if there is undue delay in premium payment."
    },
    {
      termNumber: 8,
      title: "Insured Persons included during the currency of the period of Insurance",
      description: "Full annual premium shall apply."
    },
    {
      termNumber: 9,
      title: "Change of cover of insured persons",
      description: "An Insured Person can only change their Benefit Option at policy renewal. Change of cover is subject to underwriting and acceptance by the company. Such upgrades will only be accepted within a period of thirty (30) days from the policy renewal or inception date. The Company reserves the right to decline any requested cover upgrades without giving reasons."
    },
    {
      termNumber: 10,
      title: "Company's Right to Decline Renewal",
      description: "The Company shall not be bound to renew this Policy nor give notice that it is due for renewal. The Company shall have the right to decline or qualify the terms of the Insurance in respect of all or any Insured Persons on giving to the Insured seven (7) days registered notice in writing prior to any Annual Renewal Date."
    },
    {
      termNumber: 11,
      title: "Cancellation",
      description: "Cancellation can only be done within 30 days from commencement date and shall attract a prorated premium refund for the remaining days to policy expiry subject to no claims incurred and/or reported less administration expenses at 15%. There will be no refund on cancellation by the member after 30 days from commencement date."
    },
    {
      termNumber: 12,
      title: "Reinstatement of Cover",
      description: "The policy will lapse on the eve of the renewal date. Any policy not renewed within 30 days after the renewal date will be subject to the terms and conditions of a new policy."
    },
    {
      termNumber: 13,
      title: "Notification of Claims",
      description: "In the event of any illness or accident giving rise to a claim under this Policy, the Insured shall as soon as possible send notification in writing to the Company and submit a duly completed claim form within sixty (60) days of the commencement of illness or the date of the accident. The Insured shall obtain and furnish the Company with all original bills, receipts, and other documents upon which a claim is based, and shall also give the Company any such additional information and assistance as the Company may require. The liability of the Company in respect of any contingency in any Period of Insurance giving rise to a claim hereunder shall be limited in respect of such claim to the period of three calendar months immediately following the next Annual Renewal Date and to the maximum benefits as stated in the Schedule."
    },
    {
      termNumber: 14,
      title: "Case Management",
      description: "The Medical treatment of a member as an In Patient shall be managed as described below: a) The service or treatment prescribed must be medically necessary. b) The service must have been preauthorized as per the Company Preauthorization procedures. c) The service, medication, or supplies that the member is charged must relate to the reason for the admission and any expenses for treatment that is unrelated to the reason for admission as indicated in the preauthorization form will be deemed unpayable by the Company."
    },
    {
      termNumber: 15,
      title: "Simultaneous Illness & Injuries",
      description: "All disorders or injuries existing simultaneously which are due to the same or related caused or any one accident shall be considered as one sickness or accidental bodily injury."
    },
    {
      termNumber: 16,
      title: "Arbitration",
      description: "a) Any dispute on matters involving a medical decision including reasonable and customary medical services and charges which cannot be settled by the parties may be referred to the arbitration of two qualified doctors to be agreed upon by the parties and in default of such agreements both to be nominated by the medical practitioners and dentist board. b) Any other disputes between the parties, not being medical matters, with reference to or in connection with any part of the contract regarding the construction, meaning or effect of any provision hereof, the duties of the parties hereunder which cannot be settled by the parties may be referred to a single arbitrator to be agreed upon between the parties and in default of agreement, one to be nominated by the Chartered Institute of Arbitrators of Kenya, with each party bearing its own costs of Arbitration."
    },
    {
      termNumber: 17,
      title: "Time Bar",
      description: "In the event of the Company disclaiming liability in respect of any claim hereunder, the Company shall not be liable in relation to such claim or possible claim after the expiry of 60 (sixty) days from the date of such disclaimer unless the disclaimer shall be the subject of pending legal proceedings or arbitration."
    },
    {
      termNumber: 18,
      title: "Jurisdiction",
      description: "Any legal proceedings instituted in connection with this Policy shall be brought before a court of competent jurisdiction in the Republic of Kenya."
    },
    {
      termNumber: 19,
      title: "Contribution Clause",
      description: "If at the time of any event in respect of which a claim arises, or which may be made under this policy, there is any other insurance effected by or on behalf of the insured covering defined events, the Company shall not be liable to pay or contribute more than its ratable proportion of any sum payable in respect of such event."
    },
    {
      termNumber: 20,
      title: "NHIF Membership",
      description: "Insured members must obtain NHIF membership as NHIF-related costs will not be paid under this cover."
    },
    {
      termNumber: 21,
      title: "Subrogation",
      description: "The insured member shall do and concur in doing and permit to be done all such acts and things as may be necessary or required by Birdview Microinsurance Limited, before or after indemnification, in enforcing or endorsing any rights or remedies, or of obtaining relief or indemnity, to which We are or would become entitled or subrogated."
    },
    {
      termNumber: 22,
      title: "Fraudulent/Unfounded Claims",
      description: "If any claim under this policy is in any respect fraudulent, false, intentionally exaggerated, or unfounded or if any false declaration or statement shall be made in support thereof then, all benefits paid and/or payable in relation to that claim shall be forfeited and are recoverable by Birdview Microinsurance Limited."
    },
    {
      termNumber: 23,
      title: "Taxes",
      description: "We reserve the right to reflect any changes in insurance premium or other government levies as may be imposed on us."
   
    }
  ];
  
  

  return (
    <div
      style={{
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        padding: '16px',
      }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-h-[500px] overflow-hidden w-[90%]    bg-gray-100 border border-gray-300 rounded-md shadow-lg"
    >
      <div className="p-4">
        <div className='flex justify-between'>
          <h1 className="text-xl font-semibold mb-4 sticky top-0 bg-gray-100 z-10">Terms and Conditions</h1>
          <IconButton 
            color="error" // Sets the icon color to red
            onClick={() => setOpenTermsAndConditions(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="overflow-y-scroll max-h-[400px]"> {/* Adjust max height as needed */}
          {policyTerms.map((term) => (
            <div key={term.termNumber} className="mb-4">
              <h2 className="text-lg font-semibold">{term.title}</h2>
              <p>{term.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

