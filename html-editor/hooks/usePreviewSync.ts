"use client";

import { useEffect, useState } from "react";

const DEBOUNCE_MS = 300;

export function usePreviewSync(code: string): string {
  const [previewHtml, setPreviewHtml] = useState<string>(code);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviewHtml(code);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [code]);

  return previewHtml;
}
