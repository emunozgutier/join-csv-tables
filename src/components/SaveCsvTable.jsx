import React, { useState } from "react";
import useStore from "../store/useStore";

function SaveCsvTable() {
  const { dm } = useStore();

  const handleSave = () => {
    dm.saveData();
  };

  return (
    <div className="save-csv-table glass-panel p-4 my-2 d-flex align-items-center justify-content-between gap-4">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <span className="text-muted small">
          Includes <strong>FullFileName</strong>, <strong>FolderName</strong>, and <strong>FileName</strong> columns.
        </span>
      </div>
      <button onClick={handleSave} className="btn btn-primary d-flex align-items-center gap-2">
        <i className="fas fa-download"></i>
        Download Joined CSV
      </button>
    </div>
  );
}

export default SaveCsvTable;
