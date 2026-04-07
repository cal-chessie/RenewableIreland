"use client";

import { useEffect } from "react";

export default function CountyBodyStyles() {
  useEffect(() => {
    const prevBg = document.body.style.background;
    const prevColor = document.body.style.color;

    document.body.style.background = "#F7F7F2";
    document.body.style.color = "#111";

    return () => {
      document.body.style.background = prevBg;
      document.body.style.color = prevColor;
    };
  }, []);

  return null;
}
