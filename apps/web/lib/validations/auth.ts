import { z } from "zod";

// Schema untuk validasi login form
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username tidak boleh kosong")
    .min(3, "Username minimal 3 karakter")
    .max(50, "Username maksimal 50 karakter")
    .regex(/^[a-zA-Z0-9_]+$/, "Username hanya boleh berisi huruf, angka, dan underscore"),
  password: z
    .string()
    .min(1, "Password tidak boleh kosong")
    .min(6, "Password minimal 6 karakter")
    .max(100, "Password maksimal 100 karakter"),
});

// Type untuk login form data
export type LoginFormData = z.infer<typeof loginSchema>;

// Schema untuk validasi register form (jika diperlukan di masa depan)
export const registerSchema = z
  .object({
    username: z.string().min(1, "Username tidak boleh kosong"),
    email: z
      .string()
      .email("Format email tidak valid")
      .min(1, "Email tidak boleh kosong"),
    password: z.string().min(1, "Password tidak boleh kosong"),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi password tidak boleh kosong"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

// Type untuk register form data
export type RegisterFormData = z.infer<typeof registerSchema>;

// Utility function untuk validasi form
export const validateForm = <T>(
  schema: z.ZodSchema<T>,
  data: T
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } => {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors };
    }
    return {
      success: false,
      errors: { general: "Terjadi kesalahan validasi" },
    };
  }
};

// Utility function untuk validasi field individual
export const validateField = (
  schema: z.ZodSchema<unknown>,
  field: string,
  value: string
): string | null => {
  try {
    // Create a partial object with only the field being validated
    const partialData = { [field]: value };
    schema.parse(partialData);
    return null; // Valid
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.issues.find((err) => err.path[0] === field);
      return fieldError ? fieldError.message : null;
    }
    return "Terjadi kesalahan validasi";
  }
};
