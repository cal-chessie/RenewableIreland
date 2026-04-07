import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCounty, countySlugs, getAccentCSSVars } from "@/data/counties";
import CountyBodyStyles from "@/components/county/CountyBodyStyles";

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
      "theme-color": county.accentColor,
    },
  };
}

export default async function CountyLayout({ children, params }: Props) {
  const { county: slug } = await params;
  const county = getCounty(slug);
  if (!county) notFound();

  const accentVars = getAccentCSSVars(county.accentColor, county.accentHover);

  return (
    <>
      <CountyBodyStyles />
      <div id="county-root" style={{ background: '#F7F7F2', minHeight: '100vh', ...accentVars as React.CSSProperties }}>
        {children}
      </div>
    </>
  );
}
