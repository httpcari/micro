export default function AuthLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef0f6 0%, #e7e9f2 35%, #f3eef0 70%, #eceef5 100%)",
        padding: "24px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: "#000",
        }}
      />

      <div
        style={{
          width: "440px",
          maxWidth: "100%",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          padding: "44px 44px 36px",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>

      {/* {showSignInOptions && (
        <div
          style={{
            width: "440px",
            maxWidth: "100%",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            padding: "18px 24px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <KeyIconInline />
          <span style={{ fontSize: "15px", color: "#1b1b1b" }}>Sign-in options</span>
        </div>
      )} */}

      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "24px",
          display: "flex",
          gap: "20px",
          fontSize: "12.5px",
          color: "#444",
        }}
      >
        <a href="#" style={{ color: "#444", textDecoration: "none" }}>
          Terms of use
        </a>
        <a href="#" style={{ color: "#444", textDecoration: "none" }}>
          Privacy &amp; cookies
        </a>
        <span>•••</span>
      </div>
    </div>
  );
}

function KeyIconInline() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1b1b" strokeWidth="1.6">
      <circle cx="8" cy="15" r="3.2" />
      <path d="M10.3 12.7 19 4" strokeLinecap="round" />
      <path d="M15.5 7.5 18 10" strokeLinecap="round" />
      <path d="M17.2 5.8 19.7 8.3" strokeLinecap="round" />
    </svg>
  );
}
