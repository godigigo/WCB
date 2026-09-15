import { Outfit, Fraunces } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
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

export const metadata = {
  title: "Women's Care of Bradenton | Compassionate Women's Healthcare",
  description:
    "A lifetime of compassionate care for women in Bradenton, Florida. Board-certified expertise in family practice and gynecology since 2018.",
  keywords: [
    "women's healthcare",
    "gynecology",
    "Bradenton Florida",
    "well woman exams",
    "infertility support",
    "family practice",
  ],
  authors: [{ name: "Women's Care of Bradenton" }],
  openGraph: {
    title: "Women's Care of Bradenton",
    description:
      "A lifetime of compassionate care for women in Bradenton, Florida.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-beige text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>

      {/* Google Tag Manager */}
      <GoogleTagManager gtmId="GTM-KM2HQXFX" />

      {/* Existing Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZFQH4NN9WS"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZFQH4NN9WS');
        `}
      </Script>
    </html>
  );
}