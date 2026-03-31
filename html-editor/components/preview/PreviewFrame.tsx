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

    const normalizeAnchors = (doc: Document) => {
      const anchors = doc.querySelectorAll<HTMLAnchorElement>("a[href]");

      anchors.forEach((anchor) => {
        const href = anchor.getAttribute("href")?.trim() ?? "";
        const lowerHref = href.toLowerCase();

        // Make placeholders inert so they cannot trigger navigation.
        if (
          !href ||
          href.startsWith("#") ||
          lowerHref.startsWith("javascript:")
        ) {
          anchor.setAttribute("href", "javascript:void(0)");
          anchor.setAttribute("role", "button");
          return;
        }

        // Force valid links to open outside the preview iframe.
        anchor.setAttribute("target", "_blank");
        anchor.setAttribute("rel", "noopener noreferrer");
      });
    };

    const getAnchorFromTarget = (target: EventTarget | null) => {
      if (!target) return null;
      if (target instanceof HTMLAnchorElement) return target;
      if (target instanceof Element) {
        return target.closest("a[href]") as HTMLAnchorElement | null;
      }
      if (target instanceof Node && target.parentElement) {
        return target.parentElement.closest(
          "a[href]",
        ) as HTMLAnchorElement | null;
      }
      return null;
    };

    const handleLinkClick = (event: MouseEvent) => {
      const anchor = getAnchorFromTarget(event.target);
      if (!anchor) return;

      const href = anchor.getAttribute("href")?.trim();
      if (!href) return;

      // Prevent iframe navigation to avoid loading app routes inside the preview.
      event.preventDefault();
      event.stopPropagation();

      // Placeholder and in-document links should not navigate the iframe.
      if (
        href.startsWith("#") ||
        href.toLowerCase().startsWith("javascript:")
      ) {
        return;
      }

      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        window.open(href, "_blank", "noopener,noreferrer");
        return;
      }

      try {
        const resolvedUrl = new URL(href, window.location.href);
        window.open(resolvedUrl.toString(), "_blank", "noopener,noreferrer");
      } catch {
        // Ignore malformed href values to keep preview stable.
      }
    };

    const bindLinkInterceptor = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      normalizeAnchors(doc);
      doc.addEventListener("click", handleLinkClick, true);
    };

    const unbindLinkInterceptor = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      doc.removeEventListener("click", handleLinkClick, true);
    };

    iframe.addEventListener("load", bindLinkInterceptor);
    iframe.srcdoc = buildSrcdoc(html);

    return () => {
      iframe.removeEventListener("load", bindLinkInterceptor);
      unbindLinkInterceptor();
    };
  }, [html]);

  return (
    <div
      className={`flex flex-1 justify-center overflow-auto ${mode === "mobile" ? "items-start" : ""}`}
    >
      <iframe
        ref={iframeRef}
        className={
          mode === "mobile"
            ? "h-auto min-h-[600px] w-[375px] rounded-[8px] border border-[#e5e7eb] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
            : "h-full w-full rounded-lg border-0 bg-white"
        }
        title="HTML Preview"
        sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        aria-label="Live HTML preview"
      />
    </div>
  );
}
