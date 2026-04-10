import { v8BodyHtml } from '@/lib/v8-body-content';
import fs from 'fs';
import path from 'path';
import { Suspense } from 'react';

// Read critical CSS at build time for inline injection
const criticalCss = fs.readFileSync(
  path.join(process.cwd(), 'public/v8-critical.css'),
  'utf8'
);

// Keyframes referenced by critical CSS animations but defined only in
// globals.css / deferred CSS.  Inline them here so above-the-fold hero
// animations are self-contained and never stuck at opacity:0 due to a
// CSS-loading race condition (fill-mode:both + late keyframe load).
const heroKeyframes = `
@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spop{from{opacity:0;transform:translateY(18px) scale(.92)}to{opacity:1;transform:translateY(0) scale(1)}}
`;

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      <style dangerouslySetInnerHTML={{ __html: heroKeyframes }} />
      <link rel="preload" href="/v8-deferred.css?v=12" as="style" />
      <link rel="stylesheet" href="/v8-deferred.css?v=12" media="print" id="v8-deferred-link" suppressHydrationWarning />
      <script
        dangerouslySetInnerHTML={{
          __html: "var d=document.getElementById('v8-deferred-link');if(d){d.addEventListener('load',function(){d.media='all'});if(d.sheet)d.media='all'};",
        }}
      />
      <noscript>
        <link rel="stylesheet" href="/v8-styles.css?v=12" />
      </noscript>
      <a
        href="#get-started"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          zIndex: 9999,
        }}
        className="skip-link"
      >
        Skip to main content
      </a>
      <div
        id="v8-root"
        role="main"
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        dangerouslySetInnerHTML={{ __html: v8BodyHtml }}
        suppressHydrationWarning
      />
      <script async src="/v8-scripts.js" />
    </>
  );
}

