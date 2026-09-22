import { Outfit, Fraunces } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/* =========================
   SEO METADATA
========================= */

export const metadata = {
  metadataBase: new URL("https://www.womenscareofbradenton.com"),

  title: {
    default:
      "Women's Care of Bradenton | Women's Healthcare in Bradenton, FL",
    template: "%s | Women's Care of Bradenton",
  },

  description:
    "Women's Care of Bradenton provides compassionate women's healthcare, gynecology, well-woman exams, infertility care, and family practice in Bradenton, Florida.",

  keywords: [
    "women's healthcare Bradenton",
    "women's health Bradenton FL",
    "gynecologist Bradenton FL",
    "OB GYN Bradenton",
    "gynecology Bradenton",
    "well woman exam Bradenton",
    "women's health clinic Bradenton",
    "infertility care Bradenton",
    "menopause care Bradenton",
    "family practice Bradenton",
  ],

  authors: [
    {
      name: "Women's Care of Bradenton",
    },
  ],

  creator: "Women's Care of Bradenton",
  publisher: "Women's Care of Bradenton",

  /* Canonical URL */
  alternates: {
    canonical: "https://www.womenscareofbradenton.com/",
  },

  /* Search engine crawling */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* Open Graph */
  openGraph: {
    title:
      "Women's Care of Bradenton | Women's Healthcare in Bradenton, FL",

    description:
      "Compassionate women's healthcare, gynecology, well-woman exams, infertility care, and family practice in Bradenton, Florida.",

    url: "https://www.womenscareofbradenton.com/",

    siteName: "Women's Care of Bradenton",

    locale: "en_US",

    type: "website",
  },

  /* Twitter / X */
  twitter: {
    card: "summary",

    title:
      "Women's Care of Bradenton | Women's Healthcare in Bradenton, FL",

    description:
      "Compassionate women's healthcare and gynecology in Bradenton, Florida.",
  },

  category: "healthcare",
};

/* =========================
   STRUCTURED DATA
========================= */

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",

  name: "Women's Care of Bradenton",

  url: "https://www.womenscareofbradenton.com/",

  telephone: "+1-941-500-3100",

  address: {
    "@type": "PostalAddress",
    streetAddress: "4216 Cortez Rd W",
    addressLocality: "Bradenton",
    addressRegion: "FL",
    postalCode: "34210",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-beige text-foreground font-sans">

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <Analytics />
        <SpeedInsights />
      </body>

      {/* =========================
          GOOGLE TAG MANAGER
      ========================= */}

      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KM2HQXFX');
        `}
      </Script>

      {/* =========================
          GOOGLE ANALYTICS
      ========================= */}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6ZB6EGYTN1"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag(){
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-6ZB6EGYTN1');
        `}
      </Script>
    </html>
  );
}
