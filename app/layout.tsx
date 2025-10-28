import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./../components/theme-provider";
import GoogleAnalytics from "./../components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Master",
  description: "A Process Management Visulaizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/favicon.ico" />
      </head>
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
