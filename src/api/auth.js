import api from "./axios";

export const signup = async (email, password) => {
  const response = await api.post("/signup", {
    email,
    password,
  });

  return response.data;
};

export const sendVerificationCode = async (email, code) => {
  const response = await api.post("/send-code", {
    email,
    code,
  });

  return response.data;
};
