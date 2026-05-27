import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from 'react-hot-toast';

const Signup = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      navigate("/");
    }

  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
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

      await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );

      toast.success("Signup Successful");

      navigate("/login");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signup Failed";
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
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            />

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
            Create Account
          </button>

          <p className="auth-link">
            Already have an account? &nbsp;

            <Link to="/login">
              Sign In
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Signup;

