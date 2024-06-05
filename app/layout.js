import { auth } from "@/auth";
import { Footer } from "@/components/component/footer";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import DesktopSidebar from "@/components/DesktopSidebar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Raichur Hardware",
  description: "Most trusted hardware store in Raichur",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
