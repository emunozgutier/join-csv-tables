import { useState, useEffect } from "react";
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

  useEffect(() => {
    const modalElement = document.getElementById('welcomeModal');
    if (modalElement && window.bootstrap) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
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
