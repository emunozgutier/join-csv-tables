import React from "react";
import PropTypes from "prop-types";

function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className="popup-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "2rem",
        color: "white"
      }}
      onClick={(e) => {
        // Only close if the overlay itself is clicked
        if (e.target.className === "popup-overlay") {
          onClose && onClose();
        }
      }}
    >
      <div 
        className="glass-panel popup-content"
        style={{ 
          width: "80vw", 
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
          borderRadius: "1.5rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "rgba(20, 20, 30, 0.8)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button 
            onClick={onClose}
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              fontSize: "2rem",
              cursor: "pointer",
              lineHeight: 1,
              zIndex: 10
            }}
          >
            &times;
          </button>
        )}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node
};

export default Popup;
