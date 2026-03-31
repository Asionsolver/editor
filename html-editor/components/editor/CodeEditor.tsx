"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function CodeEditor({ code, onChange, textareaRef }: CodeEditorProps) {
  const preRef = useRef<HTMLPreElement | null>(null);

  // Sync highlight whenever code changes
  useEffect(() => {
    if (preRef.current) {
      preRef.current.innerHTML = Prism.highlight(
        code,
        Prism.languages.markup,
        "markup",
      );
    }
  }, [code]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Tab key → insert 2 spaces
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const TAB = "  ";
        const newValue =
          textarea.value.substring(0, start) +
          TAB +
          textarea.value.substring(end);
        onChange(newValue);
        // Restore cursor after state update
        requestAnimationFrame(() => {
          textarea.selectionStart = start + TAB.length;
          textarea.selectionEnd = start + TAB.length;
        });
      }
    },
    [onChange],
  );

  // Sync scroll between textarea and pre
  const handleScroll = useCallback(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, [textareaRef]);

  const lineCount = code.split("\n").length;

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden rounded-t-[8px] bg-[#0f0f1a] font-mono text-[13px] leading-[1.6]">
      {/* Line numbers */}
      <div
        className="flex w-11 shrink-0 select-none flex-col items-end overflow-hidden border-r border-r-white/10 bg-[#0f0f1a] py-3"
        aria-hidden="true"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div
            key={i + 1}
            className="px-2 text-[12px] leading-[1.6] text-[#4d4d6b]"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor area: overlay highlight + textarea */}
      <div className="relative flex-1 overflow-hidden">
        {/* Syntax highlighted display (underneath) */}
        <pre
          ref={preRef}
          className="language-markup pointer-events-none absolute inset-0 z-1 m-0 overflow-auto whitespace-pre-wrap break-all bg-transparent p-[12px_16px] font-mono text-[13px] leading-[1.6] text-[#c9d1d9] [tab-size:2]"
          aria-hidden="true"
        />

        {/* Actual editable textarea (on top, transparent) */}
        <textarea
          ref={textareaRef}
          className="absolute inset-0 z-2 m-0 resize-none overflow-auto whitespace-pre-wrap break-all border-0 bg-transparent p-[12px_16px] font-mono text-[13px] leading-[1.6] text-transparent caret-[#ffffff] outline-none [tab-size:2] selection:bg-[rgba(108,71,255,0.3)]"
          style={{ WebkitTextFillColor: "transparent" }}
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
          aria-label="HTML code editor"
          id="html-code-editor"
        />
      </div>
    </div>
  );
}
