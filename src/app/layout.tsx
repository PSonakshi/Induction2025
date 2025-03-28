export const metadata = {
  title: "Induction",
  description: "Induction program for first year students only.",
  icons: {
    icon: "/favicon_io/favicon.ico",
  },
};

import "./globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
