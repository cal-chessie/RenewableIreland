import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solar Referral Programme | Share Solar, Earn €200 | Renewable Ireland',
  description:
    'Refer a friend to Renewable Ireland and you both save €200. Share your unique referral link via WhatsApp, email, or social media. Track your referrals in real time.',
  alternates: { canonical: '/referral' },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Renewable Ireland' }],
  openGraph: {
    title: 'Solar Referral Programme | Share Solar, Earn €200 | Renewable Ireland',
    description:
      'Refer a friend to Renewable Ireland and you both save €200 on solar panel installation. Share your unique referral link today.',
    url: 'https://renewableireland.ie/referral',
    siteName: 'Renewable Ireland',
    images: [
      {
        url: 'https://renewableireland.ie/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Renewable Ireland Solar Referral Programme',
      },
    ],
    locale: 'en_IE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Referral Programme | Share Solar, Earn €200',
    description:
      'Refer a friend to Renewable Ireland and you both save €200 on solar panel installation.',
    images: ['https://renewableireland.ie/og-image.jpg'],
  },
};

/* JSON-LD: WebPage schema */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Solar Referral Programme — Renewable Ireland',
  description:
    'Refer a friend to Renewable Ireland and you both save €200. Share your unique referral link via WhatsApp, email, or social media.',
  url: 'https://renewableireland.ie/referral',
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

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
