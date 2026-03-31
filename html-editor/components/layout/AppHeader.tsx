"use client";

import React from "react";

interface AppHeaderProps {
  onSave: () => void;
  onTestEmail: () => void;
}

export function AppHeader({ onSave, onTestEmail }: AppHeaderProps) {
  return (
    <header className="z-10 flex h-14 shrink-0 items-center justify-between border-b border-[#e5e7eb] bg-white px-6">
      <div className="text-[15px] font-semibold tracking-[-0.01em] text-gray-900">
        HTML editor
      </div>
      <div className="flex items-center gap-2">
        <button
          className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-[#6c47ff] bg-[#6c47ff] px-[18px] py-2 text-sm font-medium leading-none text-white transition-colors hover:border-[#5a36ee] hover:bg-[#5a36ee]"
          onClick={onSave}
          aria-label="Save"
        >
          Save
        </button>
        <button
          className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-[#d1d5db] bg-transparent px-[18px] py-2 text-sm font-medium leading-none text-gray-700 transition-colors hover:bg-[#f3f4f6]"
          onClick={onTestEmail}
          aria-label="Test email"
        >
          Test email
        </button>
      </div>
    </header>
  );
}
