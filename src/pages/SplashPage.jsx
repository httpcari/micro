import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SQUARE_COLORS = ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"];

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin", { replace: true });
    }, 2400);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        fontFamily:
          "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      <style>{`
        @keyframes msSquarePulse {
          0% { opacity: 0; transform: scale(0.4); }
          35% { opacity: 1; transform: scale(1.08); }
          50% { transform: scale(1); }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes msTextFade {
          0% { opacity: 0; transform: translateY(6px); }
          30% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        .ms-square {
          animation: msSquarePulse 2.2s ease-in-out forwards;
        }
        .ms-text {
          animation: msTextFade 2.2s ease-in-out forwards;
        }
      `}</style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28px 28px",
          gridTemplateRows: "28px 28px",
          gap: "6px",
          marginBottom: "22px",
        }}
      >
        {SQUARE_COLORS.map((color, i) => (
          <div
            key={color}
            className="ms-square"
            style={{
              width: "28px",
              height: "28px",
              background: color,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      <div
        className="ms-text"
        style={{
          fontSize: "22px",
          color: "#5e5e5e",
          fontWeight: 600,
          letterSpacing: "0.2px",
          animationDelay: "0.2s",
        }}
      >
        Microsoft
      </div>
    </div>
  );
}
