import { RegisterFormValues } from "../../entities/authentites";

export const registerUser = async (values: RegisterFormValues) => {
  const response = await fetch("http://localhost:5001/api/auth/register", {
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
