import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Metadata } from "next";
import {Allura, Nunito_Sans} from "next/font/google"
import { WalletContextProvider } from "@/content/wallet";


const nunito = Nunito_Sans({
  variable: '--font-nunito',
  weight: ['300', '600'],
  subsets: ['latin'],
});

const allura= Allura({
  variable: '--font-allura',
  weight: ['400'],
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "STICKY NFT MARKET",
  description: "FIND ALL DIGITAL ARTS"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WalletContextProvider>
      <body className={`${nunito.variable} ${allura.variable} antialiased bg-[#cec8bc] dark:bg-[#1A1C29]`}>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
           {children}
        </ThemeProvider>
      </body>
        </WalletContextProvider>
    </html>
  );
}