import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TooltipOverlay from './TooltipOverlay';
import { processText } from '../features/textSlice';

export default function MonacoEditor() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [selectionText, setSelectionText] = useState('');
  const dispatch = useDispatch();

  const wordCount = useSelector((state) => state.text.wordCount);
  const status = useSelector((state) => state.text.status);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    editor.onDidChangeCursorSelection(() => {
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
            y: tooltipY,
          });
        }
      } else {
        setTooltip(null);
      }
    });
  }

  function handleTooltipClick() {
    if (selectionText.trim()) {
      dispatch(processText(selectionText));
    }
    setTooltip(null);
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
          top={tooltip.y}
          left={tooltip.x}
          onClick={handleTooltipClick}
        />
      )}

      {status === 'succeeded' && (
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          backgroundColor: '#f3f3f3',
          padding: '8px 12px',
          borderRadius: '6px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
        }}>
          🧮 Word Count: {wordCount}
        </div>
      )}
    </div>
  );
}
