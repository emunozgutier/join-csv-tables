import { useState, useEffect, useRef } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import DataManager from "./components/DataManager";
import DropZone from "./components/DropZone.jsx";
import DataTable from "./components/DataTable.jsx";
import SaveCsvTable from "./components/SaveCsvTable.jsx";
import WelcomeModal from "./components/WelcomeModal";

function App() {
  const defaultdm = new DataManager();
  const [dm, setdm] = useState(defaultdm);
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
        // Remove backdrops manually if Bootstrap fails to clean up properly in Dev mode
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(b => b.remove());
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
      }
    };
  }, []);

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <MenuBar dm={dm} setdm={setdm} />
      <div className="content-wrapper d-flex flex-column gap-4 container-xl">
        <SaveCsvTable dm={dm} setdm={setdm} />
        {!dm.empty && <DataTable dataManager={dm} />}
        <div className="main-content flex-grow-1" style={{ minHeight: "400px" }}>
          <DropZone dm={dm} setdm={setdm} />
        </div>
      </div>
      <WelcomeModal />
    </div>
  );
}

export default App;
