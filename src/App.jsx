import { Routes, Route, Navigate } from "react-router-dom";
import { AuthFlowProvider } from "./context/AuthFlowContext.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SendingCodePage from "./pages/SendingCodePage.jsx";
import CodePage from "./pages/CodePage.jsx";

export default function App() {
  return (
    <AuthFlowProvider>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/sending" element={<SendingCodePage />} />
        <Route path="/verify" element={<CodePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthFlowProvider>
  );
}
