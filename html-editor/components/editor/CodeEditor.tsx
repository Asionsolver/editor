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
        "markup"
      );
    }
  }, [code]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
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
    [onChange]
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
    <div className="code-editor">
      {/* Line numbers */}
      <div className="code-editor__gutter" aria-hidden="true">
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} className="code-editor__line-num">
            {i + 1}
          </div>
        ))}
      </div>

      {/* Editor area: overlay highlight + textarea */}
      <div className="code-editor__area">
        {/* Syntax highlighted display (underneath) */}
        <pre
          ref={preRef}
          className="code-editor__highlight language-markup"
          aria-hidden="true"
        />

        {/* Actual editable textarea (on top, transparent) */}
        <textarea
          ref={textareaRef}
          className="code-editor__textarea"
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
