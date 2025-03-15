import React, { useState } from 'react'
import MenuBar from './components/MenuBar'
import DropZone from './components/DropZone'
import DataManager from './components/DataManager'
import './App.css'

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [dataManager, setDataManager] = useState(new DataManager())

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <MenuBar className="flex-grow-1" dataManager={dataManager} setDataManager={setDataManager} files={files} />
      <DropZone className="flex-grow-1" dataManager={dataManager} setDataManager={setDataManager} files={files} setFiles={setFiles} />
    </div>
  )
}

export default App