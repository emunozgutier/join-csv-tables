import React, { useState } from "react";
import PropTypes from "prop-types";

function SaveCsvTable({ dm, setdm }) {
  const [filenameColumn, setFilenameColumn] = useState(dm.filenameColumn);

  const handleFilenameColumnChange = (e) => {
    const newFilenameColumn = e.target.value;
    setFilenameColumn(newFilenameColumn);
    dm.filenameColumn = newFilenameColumn;
    dm.updateFilenameColumn();
    setdm(dm.clone());
  };

  const handleSave = () => {
    dm.saveData();
  };

  return (
    <div className="save-csv-table glass-panel p-4 my-2 d-flex align-items-center justify-content-between gap-4">
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <label htmlFor="filenameColumn" className="text-muted fw-semibold mb-0" style={{ whiteSpace: "nowrap" }}>
          Filename Column:
        </label>
        <input
          type="text"
          id="filenameColumn"
          value={filenameColumn}
          onChange={handleFilenameColumnChange}
          className="form-control"
          placeholder="__fileName__"
          style={{ maxWidth: "300px" }}
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary d-flex align-items-center gap-2">
        <i className="fas fa-download"></i>
        Download Joined CSV
      </button>
    </div>
  );
}

SaveCsvTable.propTypes = {
  dm: PropTypes.object.isRequired,
  setdm: PropTypes.func.isRequired,
};

export default SaveCsvTable;
