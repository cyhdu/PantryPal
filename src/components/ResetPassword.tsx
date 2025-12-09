import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "./Reset.css";

export const ResetPassword = () => {
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords must match!");
      return;
    }

    axios
      .post("https://pantrypal-p1re.onrender.com/api/users/resetpassword", {
        name,
        newPassword,
        confirmPassword,
      })
      .then(() => {
        alert("Password reset successfully!");
        navigate("/login");
      })

      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message); // show the backend message
          console.log("Error:", err.response.data.message);
        } else {
          alert("Reset failed.");
          console.log(err);
        }
      });
  };

  return (
    <div className="background">
      <div className="container">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <form className="reset-form" onSubmit={handleReset}>
          <h2 className="title">Reset Password</h2>

          <label className="input-label">Username</label>
          <input
            className="input-box"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="input-label">New Password</label>
          <input
            type="password"
            className="input-box"
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label className="input-label">Confirm New Password</label>
          <input
            className="input-box"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" className="reset-btn">
            Reset Password
          </button>
          <Link to="/login">
            <button type="button" className="return-btn">
              Return to Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
