"use client";

import React, { useState } from "react";
import { Pencil } from "lucide-react";

interface MetaFieldsProps {
  campaignName: string;
  subject: string;
  name: string;
  from: string;
  preview: string;
  onCampaignNameChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onFromChange: (value: string) => void;
  onPreviewChange: (value: string) => void;
}

interface InlineFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isPassword?: boolean;
}

function InlineField({
  label,
  value,
  onChange,
  placeholder = "",
}: InlineFieldProps) {
  const [editing, setEditing] = useState(false);

  const handleBlur = () => setEditing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setEditing(false);
  };

  return (
    <div className="meta-field">
      <span className="meta-field__label">{label}</span>
      {editing ? (
        <input
          className="meta-field__input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <span
          className="meta-field__value"
          onClick={() => setEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
        >
          {value || (
            <span className="meta-field__placeholder">{placeholder}</span>
          )}
          {value && (
            <button
              className="meta-field__edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              tabIndex={-1}
              aria-label={`Edit ${label}`}
            >
              <Pencil size={12} />
            </button>
          )}
        </span>
      )}
    </div>
  );
}

export function MetaFields({
  campaignName,
  subject,
  name,
  from,
  preview,
  onCampaignNameChange,
  onSubjectChange,
  onNameChange,
  onFromChange,
  onPreviewChange,
}: MetaFieldsProps) {
  const [editingCampaign, setEditingCampaign] = useState(false);

  return (
    <div className="meta-fields">
      {/* Campaign Name */}
      <div className="meta-campaign">
        {editingCampaign ? (
          <input
            className="meta-campaign__input"
            value={campaignName}
            onChange={(e) => onCampaignNameChange(e.target.value)}
            onBlur={() => setEditingCampaign(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingCampaign(false)}
            autoFocus
          />
        ) : (
          <div className="meta-campaign__display">
            <h2 className="meta-campaign__name">{campaignName}</h2>
            <button
              className="meta-campaign__edit-btn"
              onClick={() => setEditingCampaign(true)}
              aria-label="Edit campaign name"
            >
              <Pencil size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Meta fields */}
      <InlineField
        label="Subject:"
        value={subject}
        onChange={onSubjectChange}
        placeholder=""
      />
      <InlineField
        label="Name:"
        value={name}
        onChange={onNameChange}
        placeholder=""
      />
      <InlineField
        label="From:"
        value={from}
        onChange={onFromChange}
        placeholder=""
      />
      <InlineField
        label="Preview:"
        value={preview}
        onChange={onPreviewChange}
        placeholder="Enter a preview text"
      />
    </div>
  );
}
