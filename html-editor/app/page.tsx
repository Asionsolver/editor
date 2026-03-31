"use client";

import React, { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { useEditorState } from "@/hooks/useEditorState";
import { usePreviewSync } from "@/hooks/usePreviewSync";

export default function Home() {
  const editorState = useEditorState();
  const previewHtml = usePreviewSync(editorState.code);

  // Campaign meta state
  const [campaignName, setCampaignName] = useState("Campaign Name");
  const [subject, setSubject] = useState("This is text email");
  const [senderName, setSenderName] = useState("Sitgram");
  const [from, setFrom] = useState("hello@sitgram.com");
  const [preview, setPreview] = useState("");

  const handleSave = () => {
    // TODO: implement save logic
    console.log("Save clicked", {
      campaignName,
      subject,
      code: editorState.code,
    });
  };

  const handleTestEmail = () => {
    // TODO: implement test email logic
    console.log("Test email clicked");
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
      <AppHeader onSave={handleSave} onTestEmail={handleTestEmail} />
      <main className="grid flex-1 grid-cols-2 overflow-hidden">
        <EditorPanel
          editorState={editorState}
          campaignName={campaignName}
          subject={subject}
          senderName={senderName}
          from={from}
          preview={preview}
          onCampaignNameChange={setCampaignName}
          onSubjectChange={setSubject}
          onSenderNameChange={setSenderName}
          onFromChange={setFrom}
          onPreviewChange={setPreview}
        />
        <PreviewPanel
          html={previewHtml}
          senderName={senderName}
          senderEmail={from}
          subject={subject}
          previewText={preview}
        />
      </main>
    </div>
  );
}
