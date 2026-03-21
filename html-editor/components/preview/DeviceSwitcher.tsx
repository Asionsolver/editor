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
    <div className="device-switcher" role="group" aria-label="Preview device mode">
      <button
        className={`device-switcher__btn${mode === "desktop" ? " device-switcher__btn--active" : ""}`}
        onClick={() => onChange("desktop")}
        aria-label="Desktop preview"
        aria-pressed={mode === "desktop"}
        title="Desktop view"
      >
        <Monitor size={16} />
      </button>
      <button
        className={`device-switcher__btn${mode === "mobile" ? " device-switcher__btn--active" : ""}`}
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
