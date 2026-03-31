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
    <div className="mb-1 flex min-h-6 items-center gap-1.5 text-[13px] text-gray-700">
      <span className="min-w-[54px] shrink-0 font-medium text-gray-500">
        {label}
      </span>
      {editing ? (
        <input
          className="flex-1 border-0 border-b border-[#6c47ff] bg-transparent py-px text-[13px] text-gray-900 outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus
        />
      ) : (
        <span
          className="group flex flex-1 cursor-pointer items-center gap-1.5 rounded-[3px] px-0.5 py-px text-gray-900"
          onClick={() => setEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setEditing(true)}
        >
          {value || <span className="italic text-gray-400">{placeholder}</span>}
          {value && (
            <button
              className="inline-flex items-center bg-transparent p-0 text-gray-400 opacity-0 transition hover:text-gray-700 group-hover:opacity-100"
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
    <div className="mb-4 shrink-0">
      {/* Campaign Name */}
      <div className="mb-3">
        {editingCampaign ? (
          <input
            className="w-full border-0 border-b-2 border-[#6c47ff] bg-transparent p-0 text-[22px] font-bold leading-[1.2] text-gray-900 outline-none"
            value={campaignName}
            onChange={(e) => onCampaignNameChange(e.target.value)}
            onBlur={() => setEditingCampaign(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingCampaign(false)}
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="m-0 text-[22px] font-bold leading-[1.2] text-gray-900">
              {campaignName}
            </h2>
            <button
              className="inline-flex items-center justify-center rounded-[3px] border-0 bg-transparent p-0.5 text-gray-400 transition hover:text-gray-700"
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
