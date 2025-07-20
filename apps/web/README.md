# 🚀 Dashboard UI - Next.js 15

Dashboard ini adalah antarmuka pengguna (User Interface) yang dibangun dengan Next.js 15. Dirancang untuk menampilkan dan memvisualisasikan miliaran data secara efisien melalui komunikasi dengan API Dashboard. Fokus utama adalah performa, skalabilitas, dan pengalaman pengguna yang optimal, memanfaatkan fitur-fitur terbaru dari Next.js dan React.

---

## 🛠️ Tech Stack & Frameworks

Berikut adalah _framework_ dan _library_ utama yang digunakan untuk membangun Dashboard ini:

- **Next.js 15 (dengan React 19):** Framework React full-stack untuk aplikasi web yang _scalable_ dan _performant_. Kita akan memanfaatkan secara maksimal **React Server Components (RSC)** dan **Server Actions** untuk _fetching_ data di sisi _server_ dan meminimalkan JavaScript di _client_.
- **TypeScript:** Untuk _type safety_ yang kuat, meningkatkan _developer experience_ dan mengurangi _error_ dalam _codebase_ besar.
- **Tailwind CSS:** Framework CSS _utility-first_ untuk membangun UI dengan cepat dan efisien.
- **Shadcn/ui:** Kumpulan komponen UI berbasis Tailwind CSS dan Radix UI, memberikan komponen yang _accessible_, _customizable_, dan siap pakai.
- **TanStack Query (React Query):** Untuk manajemen _state_ _server-side_ yang efisien, _caching_, _revalidation_, dan sinkronisasi data dari API. Ini penting untuk mengelola data dalam jumlah besar dengan baik.
- **Zustand (atau Redux Toolkit/Jotai):** Untuk manajemen _client-side state_ yang ringan dan efisien, hanya untuk _state_ yang benar-benar global di _client_.
- **React Hook Form & Zod:** Untuk manajemen _form_ yang efisien dan validasi skema yang kuat.
- **Recharts / Nivo / Echarts (Opsional - untuk Visualisasi Data):** Jika ada kebutuhan untuk menampilkan grafik atau _chart_ yang kompleks. Pilih salah satu yang paling sesuai dengan kebutuhan visualisasi dan performa.
- **TanStack Virtual (React Virtual):** **Wajib** untuk _virtualisasi_ daftar atau tabel panjang yang menampilkan ribuan/puluhan ribu baris data. Ini memastikan performa yang mulus dengan hanya me-_render_ elemen yang terlihat di _viewport_.
- **Lucide React:** Library ikon yang ringan dan _type-safe_ untuk ikon-ikon UI yang konsisten.

---

## ✨ Fitur Utama

- **Penyajian Data Skala Besar:** Mampu menampilkan miliaran data dengan paginasi dan virtualisasi yang efisien.
- **Performa Unggul:** Memanfaatkan React Server Components dan _server-side rendering_ untuk _fast initial page loads_ dan _Time to Interactive_ (TTI) yang cepat.
- **Pengalaman Pengguna Interaktif:** Desain responsif dan komponen UI yang _accessible_.
- **Manajemen Data Canggih:** _Caching_ dan _revalidation_ data dari API untuk pengalaman yang mulus.
- **Validasi Formulir yang Kuat:** Memastikan integritas data saat _input_ dari pengguna.
- **Sistem Autentikasi yang User-Friendly:** Form login dengan fitur show/hide password dan validasi real-time.

---

## 🔐 Komponen Autentikasi

### Login Form (`components/login-form.tsx`)

Komponen login form yang modern dan user-friendly dengan fitur-fitur berikut:

#### Fitur Utama:

- **Input dengan Adornment:** Input field dengan ikon di awal (startAdornment) dan akhir (endAdornment)
- **Show/Hide Password:** Toggle untuk menampilkan atau menyembunyikan password
- **Theme Toggle:** Tombol untuk beralih antara mode light dan dark
- **Form Validation:** Validasi form dengan `noValidate` dan custom handling
- **Responsive Design:** Layout yang responsif untuk desktop dan mobile
- **Zod Validation:** Validasi schema yang kuat dengan error handling yang user-friendly

### 📁 Struktur File Zod Validation

#### 1. Schema Validasi (`lib/validations/auth.ts`)

File ini berisi semua schema validasi untuk autentikasi:

```tsx
import { z } from "zod";

// Schema untuk validasi login form
export const loginSchema = z.object({
  username: z.string().min(1, "Username tidak boleh kosong"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});

// Type untuk login form data
export type LoginFormData = z.infer<typeof loginSchema>;

// Utility function untuk validasi form
export const validateForm = <T,>(
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
```

#### 2. Custom Hook (`hooks/use-login-form.ts`)

Hook untuk mengelola state dan logic form login:

```tsx
import { useState, useCallback } from "react";
import {
  loginSchema,
  type LoginFormData,
  validateForm,
} from "@/lib/validations/auth";

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

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
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
        // API call logic here
        console.log("Login successful:", formData);
        return { success: true };
      } catch (error) {
        setErrors({ password: "Username atau password salah" });
        return { success: false, error };
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validateFormData]
  );

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
```

#### 3. Komponen Login (`components/login-form.tsx`)

Komponen yang menggunakan custom hook:

```tsx
import { useLoginForm } from "@/hooks/use-login-form";

export function LoginForm() {
  const {
    formData,
    errors,
    isSubmitting,
    showPassword,
    handleInputChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        value={formData.username}
        onChange={(e) => handleInputChange("username", e.target.value)}
        className={errors.username ? "border-destructive" : ""}
      />
      {errors.username && (
        <p className="text-sm text-destructive">{errors.username}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "LOGGING IN..." : "LOGIN"}
      </Button>
    </form>
  );
}
```

### 🎯 Cara Penggunaan Zod Validation

#### 1. Membuat Schema

```tsx
// lib/validations/user.ts
import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  age: z.number().min(18, "Usia minimal 18 tahun"),
});

export type UserData = z.infer<typeof userSchema>;
```

#### 2. Membuat Custom Hook

```tsx
// hooks/use-user-form.ts
import { useState, useCallback } from "react";
import {
  userSchema,
  type UserData,
  validateForm,
} from "@/lib/validations/user";

export const useUserForm = () => {
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    age: 0,
  });
  const [errors, setErrors] = useState<Partial<UserData>>({});

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const result = validateForm(userSchema, formData);

      if (result.success) {
        // Handle success
        console.log("Valid data:", result.data);
      } else {
        // Handle errors
        setErrors(result.errors);
      }
    },
    [formData]
  );

  return {
    formData,
    errors,
    handleSubmit,
    setFormData,
  };
};
```

#### 3. Menggunakan di Komponen

```tsx
// components/user-form.tsx
import { useUserForm } from "@/hooks/use-user-form";

export function UserForm() {
  const { formData, errors, handleSubmit, setFormData } = useUserForm();

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className={errors.name ? "border-destructive" : ""}
      />
      {errors.name && <p className="text-destructive">{errors.name}</p>}

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### 🔧 Utility Functions

#### validateForm Function

```tsx
// lib/validations/utils.ts
import { z } from "zod";

export const validateForm = <T,>(
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
```

### 📋 Best Practices

#### 1. Separation of Concerns

- **Schema:** Pisahkan di file `lib/validations/`
- **Logic:** Pisahkan di custom hooks
- **UI:** Pisahkan di komponen

#### 2. Reusable Schema

```tsx
// lib/validations/common.ts
export const emailSchema = z.string().email("Format email tidak valid");
export const passwordSchema = z.string().min(6, "Password minimal 6 karakter");

// Gunakan di schema lain
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
```

#### 3. Error Handling

```tsx
// Custom error messages
const customSchema = z.object({
  username: z.string().min(3, "Username terlalu pendek"),
  password: z.string().regex(/^(?=.*[A-Z])/, "Password harus ada huruf besar"),
});
```

#### 4. Type Safety

```tsx
// Type inference otomatis
type FormData = z.infer<typeof loginSchema>;
// FormData akan memiliki type: { username: string; password: string; }
```

### 🎨 Validasi Rules:

- **Username:**
  - Tidak boleh kosong
  - Minimal 1 karakter
- **Password:**
  - Tidak boleh kosong
  - Minimal 1 karakter
- **Real-time Validation:** Error hilang otomatis saat user mulai mengetik
- **Visual Feedback:** Input border merah saat ada error
- **Loading State:** Button berubah menjadi "LOGGING IN..." saat submit

### Input Component Enhancement (`components/ui/input.tsx`)

Komponen Input yang telah ditingkatkan dengan support untuk adornment:

#### Props Tambahan:

- `startAdornment?: React.ReactNode`: Elemen yang ditampilkan di awal input
- `endAdornment?: React.ReactNode`: Elemen yang ditampilkan di akhir input

#### Fitur:

- **Flexible Adornment:** Mendukung ikon, teks, atau komponen React apapun
- **Proper Spacing:** Otomatis menyesuaikan padding berdasarkan keberadaan adornment
- **Accessibility:** Tetap mempertahankan accessibility features
- **Type Safety:** Full TypeScript support dengan proper typing

---

## 🚀 Instalasi & Menjalankan Proyek

Pastikan Anda memiliki Node.js (versi 20.x atau lebih tinggi) dan npm/Yarn/pnpm terinstal di sistem Anda.

### 📋 Prerequisites

**Node.js 20+ Required!**

Jika menggunakan **nvm**:

```bash
nvm use
```

Jika belum install Node.js 20+:

1. Download dari [nodejs.org](https://nodejs.org)
2. Atau install via nvm: `nvm install 20.11.0`

### 🔧 Setup Project

1. **Clone repositori:**

   ```bash
   git clone https://github.com/your-username/dashboard-ui.git
   cd dashboard-ui
   ```

2. **Install dependensi:**

   ```bash
   pnpm install # Script akan otomatis validasi versi Node.js
   ```

3. **Jalankan aplikasi:**
   ```bash
   pnpm dev # Script akan otomatis validasi versi Node.js
   ```

### 🔍 Node.js Version Checker (`scripts/check-node-version.js`)

Script ini berfungsi untuk memvalidasi versi Node.js yang digunakan sebelum menjalankan aplikasi. Script ini otomatis dijalankan saat menjalankan `pnpm install` dan `pnpm dev`.

#### Fungsi Utama:

- **Version Validation:** Memastikan Node.js versi 20.11.0 atau lebih tinggi
- **Error Handling:** Menampilkan pesan error yang informatif jika versi tidak sesuai
- **User Guidance:** Memberikan instruksi untuk memperbaiki masalah versi
- **Color-coded Output:** Menggunakan warna untuk membedakan pesan error, warning, dan success

#### Cara Kerja:

```javascript
// Script akan mengecek versi Node.js yang sedang digunakan
const requiredVersion = "20.11.0";
const currentVersion = process.version;

// Jika versi tidak sesuai, akan menampilkan error dan exit
if (currentMajor < requiredMajor) {
  console.error("❌ Node.js version error");
  console.error(`Current: ${currentVersion}`);
  console.error(`Required: >=${requiredVersion}`);
  // Memberikan solusi untuk user
  process.exit(1);
}
```

#### Output Script:

- **✅ Success:** "Node.js version OK" dengan versi yang digunakan
- **❌ Error:** Pesan error dengan instruksi untuk memperbaiki

#### Mengapa Diperlukan:

- **Next.js 15:** Memerlukan Node.js 20+ untuk fitur terbaru
- **React 19:** Kompatibilitas dengan React versi terbaru
- **Performance:** Memastikan performa optimal dengan versi Node.js yang tepat
- **Developer Experience:** Mencegah error yang disebabkan oleh versi Node.js yang tidak kompatibel

### ⚠️ Troubleshooting

Jika mendapat error "Node.js version error":

- Pastikan menggunakan Node.js 20+
- Jalankan `nvm use` jika menggunakan nvm
- Download Node.js 20+ dari [nodejs.org](https://nodejs.org)
