
import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Eve's Boutique",
  description: "Discover Eve's Boutique — your ultimate destination for trendy fashion, curated collections, and seamless shopping.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
        <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

        <body className={`${outfit.className} antialiased text-gray-700`} >
        <ClerkProvider>
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </ClerkProvider>
        </body>
      </html>
  );
}
