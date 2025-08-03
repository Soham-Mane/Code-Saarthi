import { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TooltipOverlay from './TooltipOverlay';
import { processText } from '../features/textSlice';
import { X, ChevronRight } from 'lucide-react';

const AIResponseTooltip = ({ 
  x, 
  y, 
  aiResponse, 
  status, 
  onClose, 
  onReadMore 
}) => {
  const tooltipRef = useRef(null);
  const [shortText, setShortText] = useState('');
  const maxLines = 3;

  useEffect(() => {
    if (aiResponse) {
      const lines = aiResponse.split('\n').filter(line => line.trim());
      const truncated = lines.slice(0, maxLines).join('\n');
      setShortText(truncated);
    }
  }, [aiResponse]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const tooltipStyle = {
    position: 'fixed',
    left: x,
    top: y - 10,
    backgroundColor: 'white',
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '12px',
    maxWidth: '300px',
    minWidth: '200px',
    zIndex: 1000,
    fontSize: '13px',
    lineHeight: '1.4',
    fontFamily: 'system-ui, sans-serif'
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div ref={tooltipRef} style={tooltipStyle}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            AI Explanation
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280'
            }}
          >
            <X size={14} />
          </button>
        </div>

        {status === 'loading' && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#6b7280'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #e5e7eb',
              borderTop: '2px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Analyzing...
          </div>
        )}

        {status === 'failed' && (
          <div style={{ color: '#ef4444', fontSize: '12px' }}>
            Failed to get AI response. Please try again.
          </div>
        )}

        {status === 'succeeded' && aiResponse && (
          <div>
            <div style={{ 
              color: '#374151',
              marginBottom: '8px',
              whiteSpace: 'pre-wrap'
            }}>
              {shortText}
              {aiResponse.split('\n').filter(line => line.trim()).length > maxLines && '...'}
            </div>
            
            {aiResponse.split('\n').filter(line => line.trim()).length > maxLines && (
              <button
                onClick={onReadMore}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Read More
                <ChevronRight size={12} />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

// Modal Component for Full AI Response
const AIResponseModal = ({ isOpen, onClose, aiResponse, selectedText }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(4px)'
  };

  const contentStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '600px',
    maxHeight: '80vh',
    overflow: 'auto',
    margin: '20px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    position: 'relative'
  };

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '4px'
            }}>
              AI Explanation
            </h2>
            <div style={{
              fontSize: '14px',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              Selected text: "{selectedText}"
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              color: '#6b7280',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#f3f4f6';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{
          fontSize: '15px',
          lineHeight: '1.6',
          color: '#374151',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#f9fafb',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          {aiResponse}
        </div>
      </div>
    </div>
  );
};

export default function MonacoEditor() {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [aiTooltip, setAiTooltip] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectionText, setSelectionText] = useState('');
  const [lastClickPosition, setLastClickPosition] = useState(null); // ADDED: Store click position
  const dispatch = useDispatch();

  // Fix the selector based on your Redux slice
  const aiResponse = useSelector((state) => state.text.aiResponse);
  const wordCount = useSelector((state) => state.text.wordCount);
  const status = useSelector((state) => state.text.status);

  // ADDED: Show AI tooltip when loading starts
  useEffect(() => {
    if (status === 'loading' && lastClickPosition) {
      setAiTooltip({
        x: lastClickPosition.x,
        y: lastClickPosition.y + 30
      });
    }
  }, [status, lastClickPosition]);

  // ADDED: Update AI tooltip when response is received
  useEffect(() => {
    if (status === 'succeeded' && aiResponse && lastClickPosition) {
      setAiTooltip({
        x: lastClickPosition.x,
        y: lastClickPosition.y + 30
      });
    }
  }, [status, aiResponse, lastClickPosition]);

  // ADDED: Debug logging
  useEffect(() => {
    console.log('Status:', status);
    console.log('AI Response:', aiResponse);
    console.log('Last Click Position:', lastClickPosition);
    console.log('AI Tooltip State:', aiTooltip);
    console.log('Modal Open:', modalOpen);
  }, [status, aiResponse, lastClickPosition, aiTooltip, modalOpen]);

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
        // Don't close AI tooltip when selection changes
      }
    });
  }

  function handleTooltipClick() {
    if (selectionText.trim()) {
      // ADDED: Store the position where "Ask AI" was clicked
      setLastClickPosition(tooltip);
      dispatch(processText(selectionText));
    }
    setTooltip(null);
  }

  const handleCloseAiTooltip = () => {
    setAiTooltip(null);
    setLastClickPosition(null); // ADDED: Clear stored position
  };

  const handleReadMore = () => {
    setModalOpen(true);
    setAiTooltip(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

      {/* AI Response tooltip */}
      {aiTooltip && (
        <AIResponseTooltip
          x={aiTooltip.x}
          y={aiTooltip.y}
          aiResponse={aiResponse}
          status={status}
          onClose={handleCloseAiTooltip}
          onReadMore={handleReadMore}
        />
      )}

      {/* Modal for full response */}
      <AIResponseModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        aiResponse={aiResponse}
        selectedText={selectionText}
      />

      {/* Debug info - REMOVE IN PRODUCTION */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#f0f0f0',
        padding: '8px',
        borderRadius: '4px',
        fontSize: '11px',
        maxWidth: '250px',
        zIndex: 1001
      }}>
        <div>Status: <strong>{status}</strong></div>
        <div>AI Response: <strong>{aiResponse ? 'Yes' : 'No'}</strong></div>
        <div>AI Response Length: <strong>{aiResponse ? aiResponse.length : 0}</strong></div>
        <div>Last Click Position: <strong>{lastClickPosition ? 'Yes' : 'No'}</strong></div>
        <div>AI Tooltip Visible: <strong>{aiTooltip ? 'Yes' : 'No'}</strong></div>
        <div>Modal Open: <strong>{modalOpen ? 'Yes' : 'No'}</strong></div>
      </div>
    </div>
  );
}