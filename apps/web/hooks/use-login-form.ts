import { useState, useCallback } from "react";
import {
  loginSchema,
  type LoginFormData,
  validateForm,
  validateField,
} from "../lib/validations/auth";

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof LoginFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Real-time validation
      const fieldError = validateField(loginSchema, field, value);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError || undefined,
      }));
    },
    []
  );

  const validateFormData = useCallback(() => {
    const result = validateForm(loginSchema, formData);

    if (result.success) {
      setErrors({});
      return true;
    } else {
      setErrors(result.errors);
      return false;
    }
  }, [formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateFormData()) {
        return;
      }

      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Handle successful login here
        console.log("Login successful:", formData);

        // Reset form
        setFormData({ username: "", password: "" });
        setErrors({});

        return { success: true };
      } catch (error) {
        console.error("Login failed:", error);
        setErrors({ password: "Username atau password salah" });
        return { success: false, error };
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateFormData]
  );

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ username: "", password: "" });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    showPassword,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
    resetForm,
  };
};
