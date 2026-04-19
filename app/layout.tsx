import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proyecto Matriz: Chile y la nueva matriz energética",
  description:
    "Una exploración visual de la expansión renovable en Chile a partir de datos abiertos de la Comisión Nacional de Energía.",
  openGraph: {
    title: "Chile y la nueva matriz energética",
    description:
      "Una exploración visual de la expansión renovable en Chile a partir de datos abiertos de la CNE.",
    locale: "es_CL",
    type: "article",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
