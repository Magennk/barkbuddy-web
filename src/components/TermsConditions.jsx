import React from "react";
import { Typography } from "@mui/material";
import "../css/TermsConditions.css"; // Separate CSS for styling

const TermsConditions = () => {
  return (
    <div className="terms-container">
      <Typography variant="h5" className="terms-header">
        Terms & Conditions
      </Typography>
      <Typography variant="body1" className="terms-text">
        Welcome to our dog meetings platform!
        <br />
        <br />
        By registering, you agree to the following terms and conditions to
        ensure a safe, enjoyable experience for all:
      </Typography>
      <ul className="terms-list">
        <li>
          <strong>Eligibility:</strong> Only dog owners who are 18 years or
          older may create a profile.
        </li>
        <li>
          <strong>Profile Information:</strong> All information provided during
          registration, including your dog’s details and preferences, must be
          accurate and up-to-date. Any misrepresentation of your dog or your
          intentions may lead to profile suspension.
        </li>
        <li>
          <strong>Safety and Responsibility:</strong> While our platform aims to
          connect dog owners for friendly meet-ups, it is the responsibility of
          each owner to ensure a safe environment during any interaction. Please
          take precautions when arranging and attending meetings, and supervise
          your dog at all times.
        </li>
        <li>
          <strong>Code of Conduct:</strong> We expect all users to act
          respectfully. Any inappropriate behavior or harassment toward other
          users will result in immediate termination of the account.
        </li>
        <li>
          <strong>Privacy:</strong> We respect your privacy and will not share
          personal information without your consent. For more details, please
          review our Privacy Policy.
        </li>
      </ul>
      <Typography variant="body1" className="terms-footer">
        By creating an account, you agree to adhere to these terms and accept
        the community guidelines that support safe and friendly interactions for
        all users.
        <br />
        <br />
        Thank you for joining, and happy meeting!
      </Typography>
    </div>
  );
};

export default TermsConditions;
