import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ThemeRegistry from "./theme-registry";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import { AuthProvider } from "../context/AuthContext";

const roboto = localFont({

variable: "--font-roboto",
  src: [
    {
      path: "../assets/fonts/Roboto-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Roboto-Italic-VariableFont_wdth,wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
});


export const metadata: Metadata = {
  title: "Personal Finance App",
  description: "Personal Finance and Bill Splitting Assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="antialiased">
        <ThemeRegistry>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
