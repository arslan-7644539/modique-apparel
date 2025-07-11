import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarNavigation from "@/components/sidebar-navigation";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import StoreProvider from "@/lib/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Modique Apparel",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Providers>
            <SidebarNavigation />
            {children}
            <Footer />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
