import Link from 'next/link';

export const metadata = {
  title: 'Solar savings estimate | Renewable Ireland',
  robots: { index: false, follow: false },
};

export default function ROICalculatorPage() {
  return (
    <main style={{ maxWidth: 720, margin: '8rem auto', padding: '0 1.5rem' }}>
      <h1>Solar savings estimate</h1>
      <p>We are reviewing the calculator assumptions before publishing estimates. A written proposal can only follow a survey of your property and current usage.</p>
      <p><Link href="/">Request a quote from Renewable Ireland</Link></p>
    </main>
  );
}
