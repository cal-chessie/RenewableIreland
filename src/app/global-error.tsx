'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IE">
      <body style={{
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#F7F7F2',
        fontFamily: "'Barlow', sans-serif",
        color: '#111',
      }}>
        <div style={{ textAlign: 'center', padding: 32 }}>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 48, fontWeight: 800, marginBottom: 8,
          }}>Something went wrong</h1>
          <p style={{ color: '#9A9A92', marginBottom: 24, fontSize: 16 }}>
            We hit an unexpected error. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: '#6DC93A', color: '#111', border: 'none',
              padding: '12px 32px', borderRadius: 12, fontSize: 16,
              fontWeight: 700, cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
