import { cn } from "@/lib/utils";
import "../globals.css";
import { Poppins } from "next/font/google";
export const metadata = {
  title: "Terra App",
};
const font = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  );
}
