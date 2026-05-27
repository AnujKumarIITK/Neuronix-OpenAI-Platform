import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";
import { toast } from 'react-hot-toast';

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      window.location.href = "/";
    }

  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      toast.success("Welcome back! Login Successful.");

      window.location.href = "/";

    } catch (error) {

      const errorMsg = error.response?.data?.message || "Login Failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">

          <div className="auth-brand">

              <span className="badge">
                  ✨ AI Powered Platform
              </span>

              <h1>
                  Welcome to
                  <span> Neuronix AI</span>
              </h1>

              <p>
                  Your intelligent assistant for coding,
                  research, productivity and learning.
              </p>

              <div className="feature-list">

                  <div>⚡ Instant AI Responses</div>

                  <div>🔒 Secure Authentication</div>

                  <div>🧠 Advanced Reasoning</div>

                  <div>🚀 Fast Performance</div>

              </div>

          </div>

      </div>

      <div className="auth-right">
        
        <form
          className="auth-form"
          onSubmit={handleSubmit}
          >

          <h1>Neuronix</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            />

          <button type="submit">
            Sign In
          </button>

          <p className="auth-link">
            Don't have an account? &nbsp;

            <Link to="/signup">
              Sign Up
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;






