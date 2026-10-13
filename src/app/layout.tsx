import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Landing pages para ofertas que precisam ser entendidas | Reven",
  description:
    "A Reven planeja, desenha e desenvolve landing pages a partir da oferta, do público e do próximo passo que a página precisa facilitar. Demonstração em rascunho.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#f4f0e8" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={dmSans.variable}>{children}</body>
    </html>
  );
}
