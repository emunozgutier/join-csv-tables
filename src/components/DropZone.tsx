import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import DataManager from './DataManager'

interface DropZoneProps {
  files: File[]
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  dataManager: DataManager
  setDataManager: React.Dispatch<React.SetStateAction<DataManager>>
}

const DropZone: React.FC<DropZoneProps> = ({ files, setFiles, dataManager, setDataManager }) => {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    setIsDragging(false)

    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const csvString = e.target?.result as string
        dataManager.parseCsvString(file, csvString)
      }
      reader.readAsText(file)
    })
  }, [setFiles, dataManager])

  const onDragEnter = useCallback(() => {
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter,
    onDragLeave,
    noClick: true,
  })

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      {isDragging && <div className="drop-icon">Drop files here</div>}
      <div className="files-list">
        <h2>Files</h2>
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DropZone