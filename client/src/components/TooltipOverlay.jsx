import React from "react";

const TooltipOverlay = ({ top, left, onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        background: "black",
        color: "white",
        padding: "4px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        cursor: "pointer",
        zIndex: 10,
        transition: "opacity 0.2s ease-in-out"
      }}
      onClick={onClick}
    >
      ✨ Ask AI
    </div>
  );
};

export default TooltipOverlay;
