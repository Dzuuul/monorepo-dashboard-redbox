import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../../styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login | Dashboard",
  description: "Halaman login aplikasi dashboard",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${plusJakartaSans.variable} min-h-screen magicpattern transition-colors duration-300 relative`}
    >
      {children}
    </div>
  );
}
