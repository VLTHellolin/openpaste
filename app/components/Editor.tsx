import type * as Monaco from 'monaco-editor-core';
import type { BuiltinLanguage, BuiltinTheme } from 'shiki';
import MonacoEditor, { useMonaco } from '@monaco-editor/react';
import { shikiToMonaco } from '@shikijs/monaco';
import { useEffect } from 'react';
import { createMemorizedHighlighter, shikiEnabledLanguages } from '@/lib/shiki';

export interface EditorProps {
  className?: string;
  value: string;
  onChange?: (value?: string) => void;
  language: BuiltinLanguage;
  theme: BuiltinTheme;
  options?: Monaco.editor.IEditorConstructionOptions;
}

export const Editor = ({
  options,
  ...props
}: EditorProps) => {
  const monacoInstance = useMonaco();

  useEffect(() => {
    void (async () => {
      if (!monacoInstance) return;
      for (const lang of shikiEnabledLanguages) {
        monacoInstance.languages.register({ id: lang });
      }
      const highlighter = await createMemorizedHighlighter();
      // @ts-expect-error
      shikiToMonaco(highlighter, monacoInstance);
    })();
  }, [monacoInstance]);

  return (
    <MonacoEditor
      {...props}
      options={{
        tabSize: 2,
        fontSize: 16,
        fontFamily: 'monospace',
        ...options,
        minimap: { enabled: false },
        automaticLayout: true,
        guides: {
          ...options?.guides,
          indentation: true,
          bracketPairs: true,
        },
      }}
    />
  );
};
