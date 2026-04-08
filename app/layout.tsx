import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Akuma Store CR | Rompecabezas · Llaveros · Figuras",
  description: "Balato.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
