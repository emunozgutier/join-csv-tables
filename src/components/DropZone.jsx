import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import DataManager from "./DataManager";

function DropZone({ dm, setdm }) {
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [pendingFiles, setPendingFiles] = useState(null); // { filename: [FileObjects] }
  const [conflicts, setConflicts] = useState([]); // [filenames]
  const [appendChoices, setAppendChoices] = useState({}); // { filename: boolean }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const scanFileEntry = (entry, path = "") => {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file) => {
          if (file.name.endsWith(".csv")) {
            // If path is empty (root file), just use filename. 
            // Otherwise use path/filename
            const displayName = path ? `${path}/${file.name}` : file.name;
            resolve([{ file, name: displayName, originalName: file.name }]);
          } else {
            resolve([]);
          }
        });
      } else if (entry.isDirectory) {
        const directoryReader = entry.createReader();
        const newPath = path ? `${path}/${entry.name}` : entry.name;
        directoryReader.readEntries(async (entries) => {
          const files = await Promise.all(entries.map((e) => scanFileEntry(e, newPath)));
          resolve(files.flat());
        });
      } else {
        resolve([]);
      }
    });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    const fileEntries = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry();
      if (item) {
        fileEntries.push(item);
      }
    }

    const allFiles = (await Promise.all(fileEntries.map((entry) => scanFileEntry(entry)))).flat();
    
    // Group files by their original name to detect conflicts
    const grouped = allFiles.reduce((acc, fileItem) => {
      const name = fileItem.originalName;
      if (!acc[name]) acc[name] = [];
      acc[name].push(fileItem);
      return acc;
    }, {});

    const duplicateNames = Object.keys(grouped).filter(name => grouped[name].length > 1);

    if (duplicateNames.length > 0) {
      setPendingFiles(grouped);
      setConflicts(duplicateNames);
      const initialChoices = {};
      duplicateNames.forEach(name => {
        initialChoices[name] = true;
      });
      setAppendChoices(initialChoices);
    } else {
      processFiles(allFiles);
    }
  };

  const processFiles = (fileItems) => {
    const newDm = dm.clone();
    let filesProcessed = 0;

    if (fileItems.length === 0) return;

    fileItems.forEach((item) => {
      const file = item.file;
      const name = item.name;

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvString = event.target.result;
        newDm.loadData(name, csvString);
        filesProcessed++;
        if (filesProcessed === fileItems.length) {
          setTimeout(() => {
            setdm(newDm);
          }, 100);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleProcessSelection = () => {
    const allFilesToProcess = [];

    Object.entries(pendingFiles).forEach(([originalName, files]) => {
      const shouldAppend = appendChoices[originalName] !== false;

      if (shouldAppend) {
        // Use the original name for all of them so they append in DataManager
        files.forEach(f => allFilesToProcess.push({ ...f, name: originalName }));
      } else {
        // Use the path-based names to keep them separate
        files.forEach(f => allFilesToProcess.push(f));
      }
    });

    processFiles(allFilesToProcess);
    setPendingFiles(null);
    setConflicts([]);
    setAppendChoices({});
  };

  const toggleAppend = (filename) => {
    setAppendChoices(prev => ({
      ...prev,
      [filename]: !prev[filename]
    }));
  };

  return (
    <div
      className={`drop-zone glass-panel ${isDragging ? "animate-pulse-dash" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        border: "2px dashed var(--border)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDragging ? "rgba(79, 70, 229, 0.05)" : "transparent",
        flexDirection: "column",
        transition: "all 0.3s ease",
        cursor: "pointer",
        overflow: "hidden"
      }}
    >
      <div
        className="drop-zone-text"
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "var(--text-main)",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        {dm.empty ? "Drop CSV tables or folders here" : "Plus more CSV tables/folders!"}
      </div>
      <div
        className="drop-zone-icon"
        style={{
          fontSize: "4rem",
          color: isDragging ? "var(--primary)" : "var(--text-muted)",
          transition: "transform 0.3s ease",
          transform: isDragging ? "scale(1.1)" : "scale(1)"
        }}
      >
        <FontAwesomeIcon icon={faFolderOpen} />
      </div>
      <p className="text-muted mt-3 small">Accepts .csv files and folders</p>
      {isDragging && (
        <div
          className="drop-zone-plus"
          style={{
            position: "absolute",
            left: cursorPosition.x,
            top: cursorPosition.y,
            pointerEvents: "none",
            transform: "translate(-50%, -50%)"
          }}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="2x" color="var(--primary)" />
        </div>
      )}

      {/* Conflict Modal/Overlay */}
      {conflicts.length > 0 && (
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
                    borderRadius: "1rem",
                    transition: "all 0.2s ease"
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
                onClick={handleProcessSelection}
              >
                Proceed with {Object.values(pendingFiles).flat().length} Files
              </button>
              <button 
                className="btn btn-link text-white-50"
                onClick={() => { setPendingFiles(null); setConflicts([]); }}
              >
                Cancel import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

DropZone.propTypes = {
  dm: PropTypes.object.isRequired,
  setdm: PropTypes.func.isRequired,
};

export default DropZone;
