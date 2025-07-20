// 7. Pesan Error atau Notifikasi
export const ERROR_MESSAGES = {
  GENERIC_ERROR: "Terjadi kesalahan. Silakan coba lagi.",
  INVALID_CREDENTIALS: "Email atau kata sandi tidak valid.",
  REQUIRED_FIELD: (field: string) => `${field} wajib diisi.`,
};

// 8. Teks UI
export const UI_TEXT = {
  LOADING: "Memuat...",
  SUBMIT: "Kirim",
  CANCEL: "Batal",
  SAVE_CHANGES: "Simpan Perubahan",
  WELCOME_MESSAGE: (name: string) => `Selamat datang, ${name}!`,
}; 