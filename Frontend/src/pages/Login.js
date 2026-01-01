// pages/Login.js - SIMPLE WORKING VERSION
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔄 Login attempt started");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      console.log("📤 Sending request to backend...");
      
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log("📥 Response status:", response.status);
      
      const data = await response.json();
      console.log("📥 Response data:", data);
      
      if (!response.ok) {
        throw new Error(data.error || `Login failed (${response.status})`);
      }
      
      if (!data.token) {
        throw new Error("No token received from server");
      }
      
      console.log("✅ Login successful!");
      console.log("💾 Storing token:", data.token.substring(0, 20) + "...");
      
      // Store everything
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Navigate home
      console.log("🏠 Navigating to home page...");
      navigate("/");
      
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-page">
        <div className="login-card card">
          <h1>Login</h1>
          
          {error && (
            <div style={{
              background: "#ffebee",
              color: "#c62828",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px"
            }}>
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              style={{ marginBottom: "20px", width: "100%", padding: "10px" }}
            />
            
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: loading ? "#ccc" : "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p>
              <a href="/register" style={{ color: "#666" }}>
                Don't have an account? Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;