import { useState } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import DataManager from "./components/DataManager";
import DropZone from "./components/DropZone.jsx";
import DataTable from "./components/DataTable.jsx";
import SaveCsvTable from "./components/SaveCsvTable.jsx";

function App() {
  const defaultdm = new DataManager(); // Provide a default value
  const [dm, setdm] = useState(defaultdm);

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
    </div>
  );
}

export default App;
