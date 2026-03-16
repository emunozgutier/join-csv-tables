import React from "react";
import PropTypes from "prop-types";

function ConflictModal({ conflicts, pendingFiles, appendChoices, toggleAppend, onProcess, onCancel }) {
  if (conflicts.length === 0) return null;

  return (
    <div 
      className="conflict-overlay"
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
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="glass-panel"
        style={{ 
          width: "80vw", 
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          padding: "2.5rem",
          borderRadius: "1.5rem",
          border: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "rgba(20, 20, 30, 0.8)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        <div className="text-center mb-4">
          <h2 className="mb-2" style={{ fontWeight: "700", letterSpacing: "-0.01em" }}>Conflict Resolution</h2>
          <p className="text-muted">We found duplicate filenames across your folders. Choose how to handle them.</p>
        </div>
        
        <div 
          className="conflict-list flex-grow-1 mb-4 ms-n2 me-n2 px-2" 
          style={{ 
            overflowY: "auto",
            minHeight: "200px"
          }}
        >
          {conflicts.map(name => (
            <div 
              key={name} 
              className="d-flex align-items-center justify-content-between p-3 mb-3"
              style={{ 
                backgroundColor: "rgba(255,255,255,0.03)", 
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem"
              }}
            >
              <div className="d-flex align-items-center flex-grow-1">
                <div className="form-check m-0">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    id={`check-${name}`}
                    checked={appendChoices[name]}
                    onChange={() => toggleAppend(name)}
                    style={{ 
                      cursor: "pointer", 
                      width: "1.75rem", 
                      height: "1.75rem",
                      backgroundColor: appendChoices[name] ? "var(--primary)" : "transparent",
                      borderColor: "rgba(255,255,255,0.2)"
                    }}
                  />
                </div>
                <div className="ms-4">
                  <div style={{ fontSize: "1.1rem", fontWeight: "600" }}>{name}</div>
                  <div className="text-muted small">
                    {pendingFiles[name].length} files: {pendingFiles[name].map(f => f.name).join(", ")}
                  </div>
                </div>
              </div>
              <div className="ms-3 text-end" style={{ minWidth: "140px" }}>
                <span 
                  className="badge px-3 py-2" 
                  style={{ 
                    borderRadius: "2rem",
                    backgroundColor: appendChoices[name] ? "rgba(79, 70, 229, 0.2)" : "rgba(255,255,255,0.05)",
                    color: appendChoices[name] ? "#818cf8" : "#94a3b8",
                    border: `1px solid ${appendChoices[name] ? "rgba(99, 102, 241, 0.3)" : "rgba(255,255,255,0.1)"}`,
                    fontSize: "0.85rem",
                    fontWeight: "600"
                  }}
                >
                  {appendChoices[name] ? 'Merge & Append' : 'Keep Separate (by path)'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex flex-column gap-3 mt-auto">
          <button 
            className="btn btn-primary btn-lg py-3"
            style={{ borderRadius: "1rem", fontWeight: "600", fontSize: "1.1rem" }}
            onClick={onProcess}
          >
            Proceed with {Object.values(pendingFiles).flat().length} Files
          </button>
          <button 
            className="btn btn-link text-white-50"
            onClick={onCancel}
          >
            Cancel import
          </button>
        </div>
      </div>
    </div>
  );
}

ConflictModal.propTypes = {
  conflicts: PropTypes.array.isRequired,
  pendingFiles: PropTypes.object,
  appendChoices: PropTypes.object,
  toggleAppend: PropTypes.func.isRequired,
  onProcess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConflictModal;
