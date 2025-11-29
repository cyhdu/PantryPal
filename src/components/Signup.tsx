import logo from "../assets/logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TermsModal from "./TermsModal";
import "./Signup.css";

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:3000/api/users/signup", {
        name,
        email,
        password1,
        password2,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="background">
      {/* Logo centered above everything */}
      <div className="container">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <form className="signup" onSubmit={handleSubmit}>
          <h2 className="create-account">Sign Up</h2>

          <label className="input-label">Username</label>
          <input
            className="input-box"
            type="text"
            autoComplete="off"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />

          <label className="input-label">Email</label>
          <input
            className="input-box"
            type="email"
            autoComplete="off"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="input-label">Password</label>
          <input
            className="input-box"
            type="password"
            autoComplete="off"
            placeholder="Enter Password"
            onChange={(e) => setPassword1(e.target.value)}
          />

          <label className="input-label">Confirm Password</label>
          <input
            className="input-box"
            type="password"
            autoComplete="off"
            placeholder="Re-enter Password"
            onChange={(e) => setPassword2(e.target.value)}
          />

          <p className="message">
            <span>By continuing, you agree to the</span>
            <span> </span>
            <span onClick={() => setShowTerms(true)} className="link">
              Terms of Use and Privacy Policy
            </span>
          </p>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
      </div>
      <TermsModal show={showTerms} onClose={() => setShowTerms(false)} />
    </div>
  );
};

export default Signup;
