import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 8 characters"),
  terms: Yup.boolean().oneOf([true], "Must accept terms and conditions"),
});
