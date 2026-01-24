import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "How long will my trip be?",
  description: "Calculate travel duration between two cities in different timezones with automatic DST handling.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="background-cloud"></div>
        {children}
        <footer className="site-footer">
          <p>HLWMTB @ {year}</p>
        </footer>
      </body>
    </html>
  );
}
