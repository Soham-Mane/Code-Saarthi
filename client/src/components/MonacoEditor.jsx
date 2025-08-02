import Editor from '@monaco-editor/react';
import { useRef, useEffect, useState } from 'react';
import TooltipOverlay from './TooltipOverlay';

export default function MonacoEditor() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [selectionText, setSelectionText] = useState('');

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    editor.onDidChangeCursorSelection((e) => {
      const selection = editor.getModel().getValueInRange(editor.getSelection());
      const hasSelection = selection && selection.trim().length > 0;

      if (hasSelection) {
        const range = editor.getSelection();
        const position = editor.getScrolledVisiblePosition(range.getStartPosition());

        if (position) {
          const editorDomNode = editor.getDomNode();
          const rect = editorDomNode.getBoundingClientRect();

          const tooltipX = rect.left + position.left;
          const tooltipY = rect.top + position.top;

          setSelectionText(selection);
          setTooltip({
            x: tooltipX,
            y: tooltipY
          });
        }
      } else {
        setTooltip(null); // Hide tooltip when selection is cleared
      }
    });
  }

  function handleTooltipClick() {
    console.log('🪄 Auto-logged:', selectionText);
    setTooltip(null); // hide after click
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// Start typing and select some text..."
        onMount={handleEditorDidMount}
      />
      {tooltip && (
        <TooltipOverlay
  top={tooltip.y}  // Slight offset below the text
  left={tooltip.x}
          onClick={handleTooltipClick}
        />
      )}
    </div>
  );
}
