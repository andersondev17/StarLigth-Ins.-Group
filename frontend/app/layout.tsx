import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],

});

export const metadata: Metadata = {
  title: "StarLight Insurance",
  description: "A landing page for StarLight Insurance",
  icons: {
    icon: '/img/logo.png',
    shortcut: '/img/logo.png',
    apple: '/img/logo.png'
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {

  return (
    <html lang="en" >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased pattern`}
      >
        {children}
      </body>
    </html>
  );
}
export default RootLayout;
