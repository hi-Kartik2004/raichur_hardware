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
          <div className="grid grid-cols-12">
            <div className=" col-span-2 relative bg-muted border-r hidden lg:block">
              <div className="sticky top-2  ">
                <DesktopSidebar />
              </div>
            </div>
            <div className="lg:col-start-3 lg:col-span-11 col-span-full w-full">
              {children}
            </div>
          </div>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
