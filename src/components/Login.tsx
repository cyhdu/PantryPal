import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import TermsModal from "./TermsModal";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3000/api/users/login", {
        name,
        password,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="background">
      <div className="container">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <form className="section" onSubmit={handleSubmit}>
          <h2 className="login">Log In</h2>

          <label className="input-label">Username</label>
          <input
            className="input-box"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="input-label-password">
            <span className="password">Password</span>
            <span
              className="hide"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="input-box"
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span className="custom-check"></span>
            <span className="checkbox-text">Remember me</span>
          </label>
          <p className="message">
            <span>By continuing, you agree to the</span>
            <span> </span>
            <span className="link" onClick={() => setShowTerms(true)}>
              Terms of Use and Privacy Policy
            </span>
          </p>

          <button className="login-btn" type="submit">
            Log In
          </button>
          <Link to="/resetpassword">
            <span className="forget-password" style={{ cursor: "pointer" }}>
              Forgot Password?
            </span>
          </Link>
          <div className="new-to-pantry">
            <span className="text">New to PantryPal?</span>
          </div>
          <Link to="/signup">
            <button className="create-btn">Create an account</button>
          </Link>
        </form>
      </div>
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
};

export default Login;
