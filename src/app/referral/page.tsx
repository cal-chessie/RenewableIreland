import Link from 'next/link';

export const metadata = {
  title: 'Referral programme | Renewable Ireland',
  robots: { index: false, follow: false },
};

export default function ReferralPage() {
  return (
    <main style={{ maxWidth: 720, margin: '8rem auto', padding: '0 1.5rem' }}>
      <h1>Referral programme coming soon</h1>
      <p>We are finalising the programme terms and tracking before we invite customers to use it.</p>
      <p><Link href="/">Return to Renewable Ireland</Link></p>
    </main>
  );
}
