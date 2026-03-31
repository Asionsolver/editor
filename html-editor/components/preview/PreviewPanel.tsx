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
    <section
      className="flex flex-col overflow-hidden bg-white"
      aria-label="Email Preview"
    >
      {/* Preview Panel Header */}
      <div className="flex shrink-0 items-center justify-between px-6 pb-4 pt-6">
        <h2 className="m-0 text-[16px] font-semibold text-gray-900">Preview</h2>
        <DeviceSwitcher mode={deviceMode} onChange={setDeviceMode} />
      </div>

      {/* Email meta info */}
      <div className="flex shrink-0 items-start gap-3 px-6 pb-4">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-300 text-sm font-semibold text-gray-500"
          aria-hidden="true"
        >
          {senderName.charAt(0).toUpperCase()}
        </div>
        <div className="flex min-w-0 flex-col gap-px">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-[13px] font-semibold text-gray-900">
              {senderName}
            </span>
            <span className="text-[12px] text-gray-500">
              &lt;{senderEmail}&gt;
            </span>
          </div>
          <div className="text-[12px] font-medium text-gray-700">{subject}</div>
          <div className="text-[11px] text-gray-400">
            {previewText || "No preview available"}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px shrink-0 bg-[#e5e7eb]" aria-hidden="true" />

      {/* Live preview frame */}
      <div className="flex flex-1 flex-col overflow-hidden px-6 py-4">
        <PreviewFrame html={html} mode={deviceMode} />
      </div>
    </section>
  );
}
