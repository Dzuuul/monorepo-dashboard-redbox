import { z } from "zod";

// Schema untuk validasi login form
export const loginSchema = z.object({
  username: z.string().min(1, "Username tidak boleh kosong"),
  password: z.string().min(1, "Password tidak boleh kosong"),
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
      error.errors.forEach((err) => {
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
