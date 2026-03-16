import { useState, useEffect, useRef } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import DataManager from "./components/DataManager";
import DropZone from "./components/DropZone.jsx";
import DataTable from "./components/DataTable.jsx";
import SaveCsvTable from "./components/SaveCsvTable.jsx";
import WelcomeModal from "./components/WelcomeModal";
import ConflictModal from "./components/ConflictModal.jsx";

function App() {
  const defaultdm = new DataManager();
  const [dm, setdm] = useState(defaultdm);
  const modalRef = useRef(null);

  // Conflict Resolution State
  const [pendingFiles, setPendingFiles] = useState(null); // { filename: [FileObjects] }
  const [conflicts, setConflicts] = useState([]); // [filenames]
  const [appendChoices, setAppendChoices] = useState({}); // { filename: boolean }

  useEffect(() => {
    const modalElement = document.getElementById('welcomeModal');
    if (modalElement && window.bootstrap && !modalRef.current) {
      modalRef.current = new window.bootstrap.Modal(modalElement);
      modalRef.current.show();
    }

    return () => {
      if (modalRef.current) {
        modalRef.current.hide();
        // Remove backdrops manually if Bootstrap fails to clean up properly in Dev mode
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, []);

  const handleConflictsDetected = (grouped, duplicateNames) => {
    setPendingFiles(grouped);
    setConflicts(duplicateNames);
    const initialChoices = {};
    duplicateNames.forEach(name => {
      initialChoices[name] = true;
    });
    setAppendChoices(initialChoices);
  };

  const toggleAppend = (filename) => {
    setAppendChoices(prev => ({
      ...prev,
      [filename]: !prev[filename]
    }));
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

  const handleProcessConflicts = () => {
    const allFilesToProcess = [];

    Object.entries(pendingFiles).forEach(([originalName, files]) => {
      const shouldAppend = appendChoices[originalName] !== false;

      if (shouldAppend) {
        files.forEach(f => allFilesToProcess.push({ ...f, name: originalName }));
      } else {
        files.forEach(f => allFilesToProcess.push(f));
      }
    });

    processFiles(allFilesToProcess);
    setPendingFiles(null);
    setConflicts([]);
    setAppendChoices({});
  };

  const handleCancelConflicts = () => {
    setPendingFiles(null);
    setConflicts([]);
    setAppendChoices({});
  };

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <MenuBar dm={dm} setdm={setdm} />
      <div className="content-wrapper d-flex flex-column gap-4 container-xl">
        <SaveCsvTable dm={dm} setdm={setdm} />
        {!dm.empty && <DataTable dataManager={dm} />}
        <div className="main-content flex-grow-1" style={{ minHeight: "400px" }}>
          <DropZone 
            dm={dm} 
            setdm={setdm} 
            onConflictsDetected={handleConflictsDetected}
            onProcessFiles={processFiles}
          />
        </div>
      </div>
      <WelcomeModal />
      <ConflictModal 
        conflicts={conflicts}
        pendingFiles={pendingFiles}
        appendChoices={appendChoices}
        toggleAppend={toggleAppend}
        onProcess={handleProcessConflicts}
        onCancel={handleCancelConflicts}
      />
    </div>
  );
}

export default App;
