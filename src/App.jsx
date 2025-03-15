import { useState } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar/MenuBar.jsx";
import DataManager from "./components/DataManager";
import DropZone from "./components/DropZone.jsx";
import TableHeaders from "./components/TableHeaders.jsx";
import SaveCsvTable from "./components/SaveCsvTable.jsx";

function App() {
  const defaultdm = new DataManager(); // Provide a default value
  const [dm, setdm] = useState(defaultdm);

  return (
    <div className="app-container d-flex flex-column h-100 mx-5">
      <div className="">
        <MenuBar dm={dm} setdm={setdm} />
      </div>
      <SaveCsvTable dm={dm} />
      <TableHeaders dataManager={dm} />
      <div className="main-content border flex-grow-1">
        <DropZone dm={dm} setdm={setdm} />
      </div>
    </div>
  );
}

export default App;
