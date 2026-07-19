'use client';

import { useEffect } from 'react';

export function V8ScriptLoader() {
  useEffect(() => {
    // Use requestIdleCallback to load non-critical JS after first paint
    const loadScripts = () => {
      const script = document.createElement('script');
      script.src = '/v8-scripts.js';
      script.defer = true;
      document.body.appendChild(script);
    };

    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback(loadScripts, { timeout: 2000 });
    } else {
      setTimeout(loadScripts, 300);
    }
  }, []);

  return null;
}
