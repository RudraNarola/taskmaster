
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "./../components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Master",
  description: "A Process Management Visulaizer",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
