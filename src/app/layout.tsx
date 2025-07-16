import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const roboto = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match Sales - Frontend Technical Test",
  description:
    "Aplicação de teste técnico para a vaga de Frontend na Match Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // O supressHydrationWarning é necessário por conta do NextThemes, que faz a troca de tema no lado do cliente.
    // Isso cause um erro de hidratação, mas o ideal duramente o desenvolvimento é que o supressHydrationWarning não seja usado.
    // Para evitar de passar erros de hidratação despercebidos.
    <html suppressHydrationWarning lang="pt-BR">
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
