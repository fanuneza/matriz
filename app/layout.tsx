import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://matriz.agenciachucao.cl";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Proyecto Matriz: Chile y la nueva matriz energética",
    template: "%s | Proyecto Matriz",
  },
  description:
    "Una exploración visual de la expansión renovable en Chile a partir de datos abiertos de la Comisión Nacional de Energía.",
  keywords: [
    "energía renovable Chile",
    "ERNC",
    "matriz energética",
    "solar fotovoltaica Chile",
    "energía eólica Chile",
    "Comisión Nacional de Energía",
    "net billing Chile",
    "transición energética",
    "datos CNE",
  ],
  authors: [{ name: "Fabián Núñez", url: "https://github.com/fanuneza" }],
  creator: "Fabián Núñez",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Chile y la nueva matriz energética",
    description:
      "Una exploración visual de la expansión renovable en Chile a partir de datos abiertos de la CNE.",
    url: BASE_URL,
    siteName: "Proyecto Matriz",
    locale: "es_CL",
    type: "article",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Proyecto Matriz: Chile y la nueva matriz energética",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chile y la nueva matriz energética",
    description:
      "Una exploración visual de la expansión renovable en Chile a partir de datos abiertos de la CNE.",
    images: ["/og-image.jpg"],
    creator: "@fanuneza",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Chile y la nueva matriz energética",
  description:
    "Una exploración visual de la expansión renovable en Chile a partir de datos abiertos de la Comisión Nacional de Energía.",
  url: BASE_URL,
  image: `${BASE_URL}/og-image.jpg`,
  author: {
    "@type": "Person",
    name: "Fabián Núñez",
    url: "https://github.com/fanuneza",
  },
  publisher: {
    "@type": "Person",
    name: "Fabián Núñez",
    url: "https://github.com/fanuneza",
  },
  inLanguage: "es-CL",
  about: [
    { "@type": "Thing", name: "Energía renovable" },
    { "@type": "Thing", name: "Transición energética" },
    { "@type": "Place", name: "Chile" },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9XSP6Z6MQW" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-9XSP6Z6MQW');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
