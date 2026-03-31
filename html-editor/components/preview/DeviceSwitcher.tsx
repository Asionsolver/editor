"use client";

import React from "react";
import { Monitor, Smartphone } from "lucide-react";

export type DeviceMode = "desktop" | "mobile";

interface DeviceSwitcherProps {
  mode: DeviceMode;
  onChange: (mode: DeviceMode) => void;
}

export function DeviceSwitcher({ mode, onChange }: DeviceSwitcherProps) {
  return (
    <div
      className="flex items-center gap-0.5 rounded-md bg-[#f3f4f6] p-0.5"
      role="group"
      aria-label="Preview device mode"
    >
      <button
        className={`inline-flex h-[26px] w-[30px] items-center justify-center rounded-lg border-0 transition ${
          mode === "desktop"
            ? "bg-gray-800 text-white hover:bg-gray-900"
            : "bg-transparent text-gray-500 hover:bg-[#e5e7eb] hover:text-gray-700"
        }`}
        onClick={() => onChange("desktop")}
        aria-label="Desktop preview"
        aria-pressed={mode === "desktop"}
        title="Desktop view"
      >
        <Monitor size={16} />
      </button>
      <button
        className={`inline-flex h-[26px] w-[30px] items-center justify-center rounded-lg border-0 transition ${
          mode === "mobile"
            ? "bg-gray-800 text-white hover:bg-gray-900"
            : "bg-transparent text-gray-500 hover:bg-[#e5e7eb] hover:text-gray-700"
        }`}
        onClick={() => onChange("mobile")}
        aria-label="Mobile preview"
        aria-pressed={mode === "mobile"}
        title="Mobile view"
      >
        <Smartphone size={16} />
      </button>
    </div>
  );
}
