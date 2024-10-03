import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const forgotSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});

export const newPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    // .oneOf([Yup.ref("newPassword"), null], "Passwords must match with new password")
    // .required("Please enter your password"),
});
