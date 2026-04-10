import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import WhatsAppWidgetLoader from "@/components/whatsapp/WhatsAppWidgetLoader";


const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "Solar Panels Ireland | Renewable Ireland | SEAI Grant €1,800",
  description:
    "Ireland's trusted solar panel installers. 2,847+ installs, 4.9★ rating, 1-day install from €4,500. SEAI €1,800 grant handled. Get your free quote today.",
  metadataBase: new URL("https://renewableireland.ie"),
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  authors: [{ name: "Renewable Ireland" }],
  openGraph: {
    title: "Solar Panels Ireland | Renewable Ireland | SEAI Grant €1,800",
    description:
      "Ireland's trusted solar panel installers. 2,847+ installs, 4.9★ rating, 1-day install from €4,500. SEAI €1,800 grant handled.",
    url: "https://renewableireland.ie/",
    siteName: "Renewable Ireland",
    images: [
      {
        url: "https://renewableireland.ie/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Renewable Ireland Solar Panels",
      },
    ],
    locale: "en_IE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Panels Ireland | Renewable Ireland | SEAI Grant €1,800",
    description:
      "Ireland's trusted solar panel installers. 2,847+ installs, 4.9★ rating, 1-day install from €4,500.",
    images: ["https://renewableireland.ie/og-image.jpg"],
  },
  other: {
    "theme-color": "#F7F7F2",
  },
};

// JSON-LD schemas
const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://renewableireland.ie/#organization",
  name: "Renewable Ireland",
  alternateName: "Renewable Ireland Solar",
  url: "https://renewableireland.ie",
  logo: {
    "@type": "ImageObject",
    url: "https://renewableireland.ie/logo.png",
    width: 300,
    height: 60,
    caption: "Renewable Ireland Logo",
  },
  description:
    "Ireland's leading solar panel installation company. SEAI registered, Safe Electric certified, with over 2,847 installations nationwide.",
  email: "hello@renewableireland.ie",
  telephone: "+353873958424",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+353873958424",
    contactType: "sales",
    areaServed: "IE",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.facebook.com/renewableireland",
    "https://www.instagram.com/renewableireland",
    "https://www.linkedin.com/company/renewableireland",
    "https://twitter.com/renewableireland",
    "https://www.youtube.com/@renewableireland",
  ],
  foundingDate: "2018",
  foundingLocation: { "@type": "Place", name: "Dublin, Ireland" },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 20,
    maxValue: 50,
  },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://renewableireland.ie/#localbusiness",
  name: "Renewable Ireland",
  image: "https://renewableireland.ie/og-image.jpg",
  url: "https://renewableireland.ie",
  telephone: "+353873958424",
  email: "hello@renewableireland.ie",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Unit 12, Sandyford Business Centre",
    addressLocality: "Dublin",
    addressRegion: "County Dublin",
    postalCode: "D18 A4K9",
    addressCountry: "IE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.2794, longitude: -6.2625 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  priceRange: "€4,500 - €6,500",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2847",
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Dublin" },
    { "@type": "AdministrativeArea", name: "Cork" },
    { "@type": "AdministrativeArea", name: "Galway" },
    { "@type": "AdministrativeArea", name: "Limerick" },
    { "@type": "AdministrativeArea", name: "Waterford" },
    { "@type": "AdministrativeArea", name: "Kildare" },
    { "@type": "AdministrativeArea", name: "Meath" },
    { "@type": "AdministrativeArea", name: "Wicklow" },
    { "@type": "AdministrativeArea", name: "Wexford" },
    { "@type": "AdministrativeArea", name: "Kilkenny" },
    { "@type": "AdministrativeArea", name: "Tipperary" },
    { "@type": "AdministrativeArea", name: "Clare" },
    { "@type": "AdministrativeArea", name: "Louth" },
    { "@type": "AdministrativeArea", name: "Westmeath" },
    { "@type": "AdministrativeArea", name: "Carlow" },
    { "@type": "AdministrativeArea", name: "Kerry" },
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://renewableireland.ie/#website",
  url: "https://renewableireland.ie",
  name: "Renewable Ireland",
  publisher: { "@id": "https://renewableireland.ie/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://renewableireland.ie/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IE" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://solarpilot.ie" crossOrigin="" />
        {/* Cursor elements injected via JS so React never tries to hydrate them */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){var d=document,c=function(id){var e=d.createElement('div');e.id=id;d.body.appendChild(e)};if(d.readyState==='loading'){d.addEventListener('DOMContentLoaded',function(){c('ricur');c('ritrail')})}else{c('ricur');c('ritrail')}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdLocalBusiness),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
      </head>
      <body
        className={barlowCondensed.variable}
        style={{ margin: 0, background: '#F7F7F2', color: '#111', colorScheme: 'light' }}
      >
        {/* CRITICAL: Inline style MUST appear before {children} so it's in the DOM
            before React streaming SSR creates <div hidden id="S:0">.
            External CSS chunks load too late — this is the only reliable fix. */}
        <style dangerouslySetInnerHTML={{ __html: "div[id^='S:']{display:block!important;visibility:visible!important;opacity:1!important;position:static!important;height:auto!important;width:auto!important;overflow:visible!important;pointer-events:auto!important}" }} />
        {children}
        <Suspense fallback={null}>
          <WhatsAppWidgetLoader />
        </Suspense>
      </body>
    </html>
  );
}
