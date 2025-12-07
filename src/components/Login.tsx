import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import TermsModal from "./TermsModal";
import axios from "axios";
import "./Login.css";
import { toast } from "react-toastify";

export const Login = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showTerms, setShowTerms] = useState(false);

  const navigate = useNavigate();

  /* -----------------------------
      LOAD REMEMBER ME DATA ONCE
     ----------------------------- */
  useEffect(() => {
    const savedChecked = localStorage.getItem("rememberMe");
    if (savedChecked === "true") {
      const savedEmail = localStorage.getItem("savedEmail");
      setChecked(true);
      setEmail(savedEmail || "");
    }
  }, []);

  /* -----------------------------
      WHEN CHECKBOX CHANGES
     ----------------------------- */
  const handleRememberToggle = (value) => {
    setChecked(value);

    if (value) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("savedEmail");
    }
  };

  /* -----------------------------
              LOGIN
     ----------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:3000/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        toast.success("Logged in successfully!");
        console.log("Login response data:", res.data);

        const { userId, token } = res.data;
        
        if (token) {
           // Save token for authenticated requests
           localStorage.setItem("token", token);
           localStorage.setItem("userId", userId);
        } else {
           console.error("No token received from login API!");
        }

        if (checked) {
          localStorage.setItem("savedEmail", email);
        }

        navigate("/insight", {
          state: { userId, email },
        });
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("Something went wrong.");
        }
      });
  };

  return (
    <div className="background">
      <div className="container">
        <div className="logo-wrapper">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <form className="section" onSubmit={handleSubmit}>
          <h2 className="login">Log In</h2>

          <label className="input-label">Email</label>
          <input
            className="input-box"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => handleRememberToggle(e.target.checked)}
            />
            <span className="custom-check"></span>
            <span className="checkbox-text"> Remember me</span>
          </label>

          <p className="message">
            <span>By continuing, you agree to the </span>
            <span className="link" onClick={() => setShowTerms(true)}>
              Terms of Use and Privacy Policy
            </span>
          </p>

          <button className="login-btn" type="submit">
            Log In
          </button>

          <Link to="/resetpassword">
            <span className="forget-password">Forgot Password?</span>
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
