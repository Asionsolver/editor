"use client";

import { useCallback, useRef, useState } from "react";
import Prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html";

const DEFAULT_HTML = ``;

export interface EditorState {
  code: string;
  setCode: (value: string) => void;
  formatCode: () => Promise<void>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

export function useEditorState(): EditorState {
  const [code, setCodeState] = useState<string>(DEFAULT_HTML);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const setCode = useCallback((value: string) => {
    setCodeState(value);
  }, []);

  const formatCode = useCallback(async () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    try {
      const formatted = await Prettier.format(code, {
        parser: "html",
        plugins: [parserHtml],
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: "ignore",
      });

      const trimmed = formatted.trimEnd();
      setCodeState(trimmed);

      // Restore cursor position after React re-renders
      requestAnimationFrame(() => {
        if (textarea) {
          const newPos = Math.min(selectionStart, trimmed.length);
          const newEnd = Math.min(selectionEnd, trimmed.length);
          textarea.setSelectionRange(newPos, newEnd);
          textarea.focus();
        }
      });
    } catch {
      // If formatting fails, keep the existing code
    }
  }, [code]);

  return { code, setCode, formatCode, textareaRef };
}
