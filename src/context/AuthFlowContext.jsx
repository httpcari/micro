import { createContext, useContext, useState } from "react";

const AuthFlowContext = createContext(null);

export function AuthFlowProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthFlowContext.Provider value={{ email, setEmail, password, setPassword }}>
      {children}
    </AuthFlowContext.Provider>
  );
}

export function useAuthFlow() {
  const ctx = useContext(AuthFlowContext);
  if (!ctx) {
    throw new Error("useAuthFlow must be used within an AuthFlowProvider");
  }
  return ctx;
}
