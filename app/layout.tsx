import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AntdWrapper from "@/components/AntdWrapper";
import { Toaster } from "react-hot-toast";

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
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            style: {
              background: "#333",
              color: "white",
            },
          }}
        />
        <AntdWrapper>{children}</AntdWrapper>
      </body>
    </html>
  );
}
