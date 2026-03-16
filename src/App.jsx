import { useEffect, useRef } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import useStore from "./store/useStore";
import DropZone from "./components/DropZone.jsx";
import DataTable from "./components/DataTable.jsx";
import SaveCsvTable from "./components/SaveCsvTable.jsx";
import WelcomeModal from "./components/WelcomeModal";
import Popup from "./components/Popup.jsx";

function App() {
  const { 
    dm, 
    setDm, 
    conflicts, 
    pendingFiles, 
    appendChoices, 
    toggleAppendChoice, 
    clearConflicts, 
    loadFiles 
  } = useStore();
  
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = document.getElementById('welcomeModal');
    if (modalElement && window.bootstrap && !modalRef.current) {
      modalRef.current = new window.bootstrap.Modal(modalElement);
      modalRef.current.show();
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.hide();
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, []);

  const handleProcessConflicts = async () => {
    const allFilesToProcess = [];

    Object.entries(pendingFiles).forEach(([originalName, files]) => {
      const shouldAppend = appendChoices[originalName] !== false;

      if (shouldAppend) {
        files.forEach(f => allFilesToProcess.push({ ...f, name: originalName }));
      } else {
        files.forEach(f => allFilesToProcess.push(f));
      }
    });

    await loadFiles(allFilesToProcess);
    clearConflicts();
  };

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <MenuBar dm={dm} setdm={setDm} />
      <div className="content-wrapper d-flex flex-column gap-4 container-xl">
        <SaveCsvTable dm={dm} setdm={setDm} />
        {!dm.empty && <DataTable dataManager={dm} />}
        <div className="main-content flex-grow-1" style={{ minHeight: "400px" }}>
          <DropZone />
        </div>
      </div>
      <WelcomeModal />
      
      <Popup isOpen={conflicts.length > 0} onClose={clearConflicts}>
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
                    onChange={() => toggleAppendChoice(name)}
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
            onClick={handleProcessConflicts}
          >
            Proceed with {Object.values(pendingFiles || {}).flat().length} Files
          </button>
          <button 
            className="btn btn-link text-white-50"
            onClick={clearConflicts}
          >
            Cancel import
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default App;
