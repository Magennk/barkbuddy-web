import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Thank you for registering with BarkBuddy!</h1>
      <p>Your account has been created successfully.</p>
      <Link to="/login">
        <button style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}>
          Click here to Login
        </button>
      </Link>
    </div>
  );
};

export default ThankYou;
