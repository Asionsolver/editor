"use client";

import React from "react";

interface AppHeaderProps {
  onSave: () => void;
  onTestEmail: () => void;
}

export function AppHeader({ onSave, onTestEmail }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__title">HTML editor</div>
      <div className="app-header__actions">
        <button
          className="btn btn--primary"
          onClick={onSave}
          aria-label="Save"
        >
          Save
        </button>
        <button
          className="btn btn--outline"
          onClick={onTestEmail}
          aria-label="Test email"
        >
          Test email
        </button>
      </div>
    </header>
  );
}
