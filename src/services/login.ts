import { LoginFormValues } from "../../entities/authentites";

export const loginUser = async (values: LoginFormValues) => {
  const response = await fetch("http://localhost:5001/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.msg || "Registration failed");
  }

  return response.json();
};
