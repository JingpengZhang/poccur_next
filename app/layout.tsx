import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdWrapper from "@/components/AntdWrapper";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-20">
        <Toaster
          toastOptions={{
            style: {
              background: "#333",
              color: "white",
            },
          }}
        />
        <Navigation />
        <AntdWrapper>{children}</AntdWrapper>
      </body>
    </html>
  );
}
