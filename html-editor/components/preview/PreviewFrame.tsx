"use client";

import React, { useEffect, useRef } from "react";
import type { DeviceMode } from "./DeviceSwitcher";

interface PreviewFrameProps {
  html: string;
  mode: DeviceMode;
}

// Wrap user HTML with a minimal HTML skeleton for safe iframe rendering
function buildSrcdoc(html: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 0;
      padding: 16px;
      color: #1a1a1a;
      line-height: 1.6;
    }
    a { color: #6c47ff; }
    h1 { font-size: 1.5rem; margin: 0 0 12px; }
    p { margin: 0 0 12px; }
  </style>
</head>
<body>${html}</body>
</html>`;
}

export function PreviewFrame({ html, mode }: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    // Use srcdoc attribute for safe sandboxed rendering
    iframe.srcdoc = buildSrcdoc(html);
  }, [html]);

  return (
    <div
      className={`preview-frame-wrapper${mode === "mobile" ? " preview-frame-wrapper--mobile" : ""}`}
    >
      <iframe
        ref={iframeRef}
        className="preview-frame"
        title="HTML Preview"
        sandbox="allow-same-origin"
        aria-label="Live HTML preview"
      />
    </div>
  );
}
