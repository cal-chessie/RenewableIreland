import type { Metadata } from 'next';
import ReferralLandingClient from './landing-client';

/* ===== Dynamic Metadata ===== */
type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const referralCode = code.toUpperCase();

  return {
    title: `${referralCode} — Solar Referral | €200 Off Your Installation | Renewable Ireland`,
    description:
      `You've been referred to Renewable Ireland! Claim your €200 discount on solar panel installation. SEAI grant of €1,800 included. 1-day install, 4.9★ rating.`,
    alternates: { canonical: `/referral/${referralCode}` },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: 'Renewable Ireland' }],
    openGraph: {
      title: `You're Invited — €200 Off Solar Panels | Renewable Ireland`,
      description:
        `A friend recommended Renewable Ireland for solar panels. Use their referral link to get €200 off your installation. Ireland's most trusted installer.`,
      url: `https://renewableireland.ie/referral/${referralCode}`,
      siteName: 'Renewable Ireland',
      images: [
        {
          url: 'https://renewableireland.ie/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Renewable Ireland — €200 Solar Referral Discount',
        },
      ],
      locale: 'en_IE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `You're Invited — €200 Off Solar Panels`,
      description:
        'A friend recommended Renewable Ireland. Use their referral link for €200 off your solar installation.',
      images: ['https://renewableireland.ie/og-image.jpg'],
    },
  };
}

/* JSON-LD: WebPage schema */
function getJsonLd(code: string) {
  const referralCode = code.toUpperCase();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Referral Link ${referralCode} — Renewable Ireland Solar`,
    description:
      'You have been referred to Renewable Ireland for solar panel installation. Claim your €200 discount.',
    url: `https://renewableireland.ie/referral/${referralCode}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Renewable Ireland',
      url: 'https://renewableireland.ie',
    },
    about: {
      '@type': 'Organization',
      name: 'Renewable Ireland',
      url: 'https://renewableireland.ie',
    },
  };
}

export default async function ReferralCodePage({ params }: Props) {
  const { code } = await params;
  const jsonLd = getJsonLd(code);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReferralLandingClient code={code} />
    </>
  );
}
