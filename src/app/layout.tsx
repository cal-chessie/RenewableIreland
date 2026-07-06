import type { Metadata } from "next";
import { Barlow_Condensed, Barlow } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
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

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://renewableireland.ie/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Solar Panels Ireland",
      item: "https://renewableireland.ie/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://solarpilot.ie" crossOrigin="" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdBreadcrumb),
          }}
        />
      </head>
      <body
        className={`${barlowCondensed.variable} ${barlow.variable}`}
        style={{ margin: 0 }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
