"use client";

import { useEffect, useRef, useState } from "react";

/**
 * WhatsAppWidgetLoader
 *
 * Renders NOTHING on the server (returns null).  On the client it
 * dynamically imports WhatsAppWidget and mounts it into a container div.
 *
 * This avoids the Next.js 16 PPR Suspense boundary that would otherwise
 * wrap the entire page in <div hidden id="S:0"> when WhatsAppWidget
 * (a "use client" component) is placed directly in a Server Component
 * layout.
 */
export default function WhatsAppWidgetLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [Widget, setWidget] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Dynamic import — only runs on the client
    import("./WhatsAppWidget").then((mod) => {
      setWidget(() => mod.default);
    });
  }, []);

  if (!Widget) return null;

  return <Widget />;
}
