import "@/styles/globals.css";

import { Inter as FontSans } from "next/font/google";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata = {
  description: "ekşi sözlük - kutsal bilgi kaynağı",
  title: "Ekşi Sözlük",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen overflow-x-hidden bg-background font-sans antialiased", fontSans.variable)}>
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}
