"use client";

import React from "react";
import dynamic from "next/dynamic";
import { MetaFields } from "./MetaFields";
import type { EditorState } from "@/hooks/useEditorState";

const CodeEditor = dynamic(
  () => import("./CodeEditor").then((mod) => mod.CodeEditor),
  { ssr: false },
);

interface EditorPanelProps {
  editorState: EditorState;
  campaignName: string;
  subject: string;
  senderName: string;
  from: string;
  preview: string;
  onCampaignNameChange: (v: string) => void;
  onSubjectChange: (v: string) => void;
  onSenderNameChange: (v: string) => void;
  onFromChange: (v: string) => void;
  onPreviewChange: (v: string) => void;
}

export function EditorPanel({
  editorState,
  campaignName,
  subject,
  senderName,
  from,
  preview,
  onCampaignNameChange,
  onSubjectChange,
  onSenderNameChange,
  onFromChange,
  onPreviewChange,
}: EditorPanelProps) {
  return (
    <section
      className="flex flex-col overflow-hidden border-r border-[#e5e7eb] bg-white px-6 pt-6"
      aria-label="HTML Code Editor"
    >
      <MetaFields
        campaignName={campaignName}
        subject={subject}
        name={senderName}
        from={from}
        preview={preview}
        onCampaignNameChange={onCampaignNameChange}
        onSubjectChange={onSubjectChange}
        onNameChange={onSenderNameChange}
        onFromChange={onFromChange}
        onPreviewChange={onPreviewChange}
      />
      <CodeEditor
        code={editorState.code}
        onChange={editorState.setCode}
        textareaRef={editorState.textareaRef}
      />
    </section>
  );
}
