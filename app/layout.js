import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: {
    default: "Raichur Hardware",
    template: "%s | Raichur Hardware",
  },
  description:
    "Most trusted hardware store in Raichur, with 1000+ products across categories including PVC, CPVC, SWR & ASTM Pipes, Drainage & Sewage Pipes, CPVC fittings, Agricultural Fittings, PVC Self-Fit Pipes, PVC Plain Pipes, PVC Self-Fit (slotted) Pipes, PVC U Column Pipes Coupler Type, ASTM Plumbing Pipes, CPVC Pipes, SWR Pipes, Self-Fit Pipes, Ring-Fit Pipes, Coupler & Union, Elbows, Tee(s), Reducer & Reducing Bush, End Cap & THRD End Plug, Threaded Adapters (MTA & FTA), Bends, Clip & Clamps, Tank & Hex Nipple, UPVC Valves, Converter Couplers, Reducer, End Cap, Bends & Transition Bush, Tank Nipple, CPVC Ball Valve, Flange with Gasket, Mixer, CPVC Fittings (SCH 40), CPVC Fittings (SCH 80), Elbow 90° (Plain and THRD), Elbow 45° (Plain), End Cap (Plain and THRD), Tail Piece, Butterfly Valve, Service Saddle (THRD), Reducing Bush, Single Y (Reducing & non-reducing), Bend (45° & 90°), Repairing Coupler (R/R), Single Y & Double Y, Bend (Double Socket), Tee (Double Socket), Gully Trap, Multi-Floor Trap, Nahani Trap, P-Trap & S-Trap, Vent Cowl, WC Connector, Socket Plug & Door Cap, Drip Irrigation, Sprinkle Irrigation, Subsurface Drip, PVC Ball Valves, Faucets, Shower, Thermostatic Mixers, Shower panel, Water heaters, Sanitary ware, Wellness, Shower enclosures, Flushing systems, Drains, Bath Accessories, Digital locks, Mortise locks, Rim locks, Cylindrical locks, Padlocks, Furniture locks, Home décor handles, Door controls, Door fittings, Wardrobe fittings, Bed fittings, Furniture fittings, Kitchen fittings, Luxury Kitchen Sinks, Quartz Kitchen Sinks, Stainless steel sinks, Open Well Pumps, Submersible Pumps, Monoblock Pumps, Jet Pumps, Sewage Pumps, Electric Induction Motors, CMBE And CMBE Twin, CM Single Booster, SCALA1 and SCALA2 booster, Shower and other Boosters, Overhead Water Tanks, Ball Valve, Gate Valve, Sluice Valve, Horizontal Check Valve, Vertical Check Valve, Cast Iron Manhole covers.",
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
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </SessionProvider>
  );
}
