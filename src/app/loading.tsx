export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#F7F7F2',
      fontFamily: "'Barlow Condensed', sans-serif",
    }}>
      <div style={{ textAlign: 'center', color: '#111' }}>
        <div style={{
          width: 40, height: 40, margin: '0 auto 16px',
          border: '3px solid #EAEAE4', borderTopColor: '#6DC93A',
          borderRadius: '50%', animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{ fontSize: 14, color: '#9A9A92', letterSpacing: '0.02em' }}>Loading…</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}
