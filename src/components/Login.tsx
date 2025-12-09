// @ts-nocheck
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";
import TermsModal from "./TermsModal";
import axios from "axios";
import "./Login.css";
import ToastMessage from "./ToastMessage";

export const Login = () => {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Custom toast (your own component)
  const [toastData, setToastData] = useState(null);

  const [showTerms, setShowTerms] = useState(false);

  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToastData({ message, type });
  };

  /* -----------------------------
      LOAD REMEMBER ME DATA
     ----------------------------- */
  useEffect(() => {
    const savedChecked = localStorage.getItem("rememberMe");
    if (savedChecked === "true") {
      const savedEmail = localStorage.getItem("savedEmail");
      setChecked(true);
      setEmail(savedEmail || "");
    }
  }, []);

  useEffect(() => {
    if (checked) {
      localStorage.setItem("savedEmail", email);
    }
  }, [email, checked]);

  /* -----------------------------
       SHOW LOGOUT MESSAGE
     ----------------------------- */
  useEffect(() => {
    const msg = localStorage.getItem("logoutMessage");
    if (msg) {
      showToast(msg, "success");
      localStorage.removeItem("logoutMessage");
    }
  }, []);

  /* -----------------------------
        REMEMBER ME TOGGLE
     ----------------------------- */
  const handleRememberToggle = (value) => {
    setChecked(value);
    localStorage.setItem("rememberMe", value ? "true" : "false");

    if (!value) {
      localStorage.removeItem("savedEmail");
    }
  };

  /* -----------------------------
                 LOGIN
     ----------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://pantrypal-p1re.onrender.com/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        showToast("Logged in successfully!", "success");

        const { userId, token } = res.data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
        }

        if (checked) {
          localStorage.setItem("savedEmail", email);
        }

        setTimeout(() => {
          navigate("/insight", {
            state: { userId, email },
          });
        }, 300);
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          showToast(err.response.data.message, "error");
        } else {
          showToast("Something went wrong.", "error");
        }
      });
  };

  return (
    <div className="background">
      {/* Toast */}
      {toastData && (
        <ToastMessage
          message={toastData.message}
          type={toastData.type}
          onClose={() => setToastData(null)}
        />
      )}

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
            <span className="checkmark"></span>
            Remember me
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
