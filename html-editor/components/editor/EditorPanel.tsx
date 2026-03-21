"use client";

import React from "react";
import { MetaFields } from "./MetaFields";
import { CodeEditor } from "./CodeEditor";
import type { EditorState } from "@/hooks/useEditorState";

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
    <section className="editor-panel" aria-label="HTML Code Editor">
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
