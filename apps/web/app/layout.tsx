import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Inter,
  Roboto,
  Open_Sans,
  Poppins,
  Nunito,
  Montserrat,
} from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { APP_DESC, APP_NAME } from "../lib/constants/app";
import { AnnouncementBarWrapper } from "../components/ui/announcement-bar-wrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${roboto.variable} ${openSans.variable} ${poppins.variable} ${nunito.variable} ${montserrat.variable} antialiased`}
      >
        <div id="announcement-root" />
        {/* AnnouncementBar di paling atas */}
        <AnnouncementBarWrapper />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
