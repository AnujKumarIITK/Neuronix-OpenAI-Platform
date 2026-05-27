import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">

      <div className="gradient1"></div>
      <div className="gradient2"></div>

      <div className="hero">

        <span className="badge">
          ✨ Powered by Advanced AI
        </span>

        <h1 style={{ marginBottom: "30px" }}>
          Meet <span>Neuronix AI</span>
        </h1>

        <p>
          Your intelligent AI assistant for coding,
          research, learning, productivity and
          problem solving.
        </p>

        <div className="heroButtons">

          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className="primaryBtn">
              Get Started →
            </button>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="secondaryBtn">
              Sign In
            </button>
          </Link>

        </div>

        <div className="stats">

          <div className="statCard">
            <h2>10K+</h2>
            <span>Prompts Generated</span>
          </div>

          <div className="statCard">
            <h2>99.9%</h2>
            <span>Availability</span>
          </div>

          <div className="statCard">
            <h2>24/7</h2>
            <span>AI Assistant</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Landing;

