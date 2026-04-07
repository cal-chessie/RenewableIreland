import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCounty, countySlugs } from "@/data/counties";
import "./page.module.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ county: string }>;
};

export async function generateStaticParams() {
  return countySlugs.map((slug) => ({ county: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) return {};

  const title = `Solar ${county.name} | Solar Panel Installers in ${county.name}, ${county.region}`;
  const description = `${county.accreditation} accredited solar panel installers in ${county.name}. Residential, commercial and agricultural solar systems. Get your free quote today.`;
  const url = `https://${county.domain}/`;
  const ogLocale = county.country === "GB" ? "en_GB" : "en_IE";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: `Solar ${county.name}`,
      locale: ogLocale,
      images: [
        {
          url: `https://${county.domain}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Solar panel installation in ${county.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Solar ${county.name} | Solar Panel Installers`,
      description: `${county.accreditation} accredited solar panel installers in ${county.name}. Free quote.`,
      images: [`https://${county.domain}/images/og-image.jpg`],
    },
    other: {
      "theme-color": "#E10600",
    },
  };
}

export default async function CountyLayout({ children, params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#050505", color: "#f0f0f0" }}>
        {children}
      </body>
    </html>
  );
}
