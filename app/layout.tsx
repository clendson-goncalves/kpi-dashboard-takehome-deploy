import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "KPI Dashboard",
  description: "Browse for assets needed to report and present analysis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="overflow-y-scroll font-sans">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
