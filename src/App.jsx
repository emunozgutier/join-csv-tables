import { useState } from 'react';
import './App.css';
import MenuBar from './components/MenuBar/MenuBar.jsx';
import DataManager from './components/DataManager';

function App() {
  const defaultdm= new DataManager(); // Provide a default value
  const [dm, setdm] = useState(defaultdm);

  return (
    <div className="app-container d-flex flex-column h-100 mx-5">
      <div className="">
        <MenuBar
        />
      </div>
      <div className="main-content border flex-grow-1">

      </div>
    </div>
  );
}

export default App;