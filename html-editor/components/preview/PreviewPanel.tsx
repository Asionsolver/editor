"use client";

import React, { useState } from "react";
import { DeviceSwitcher, type DeviceMode } from "./DeviceSwitcher";
import { PreviewFrame } from "./PreviewFrame";

interface PreviewPanelProps {
  html: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  previewText: string;
}

export function PreviewPanel({
  html,
  senderName,
  senderEmail,
  subject,
  previewText,
}: PreviewPanelProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");

  return (
    <section className="preview-panel" aria-label="Email Preview">
      {/* Preview Panel Header */}
      <div className="preview-panel__header">
        <h2 className="preview-panel__title">Preview</h2>
        <DeviceSwitcher mode={deviceMode} onChange={setDeviceMode} />
      </div>

      {/* Email meta info */}
      <div className="preview-email-meta">
        <div className="preview-email-meta__avatar" aria-hidden="true">
          {senderName.charAt(0).toUpperCase()}
        </div>
        <div className="preview-email-meta__info">
          <div className="preview-email-meta__sender">
            <span className="preview-email-meta__name">{senderName}</span>
            <span className="preview-email-meta__email">
              &lt;{senderEmail}&gt;
            </span>
          </div>
          <div className="preview-email-meta__subject">{subject}</div>
          <div className="preview-email-meta__preview">
            {previewText || "No preview available"}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="preview-panel__divider" aria-hidden="true" />

      {/* Live preview frame */}
      <div className="preview-panel__frame-container">
        <PreviewFrame html={html} mode={deviceMode} />
      </div>
    </section>
  );
}
