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
    <div className="save-csv-table row">
      <div className="form-group col-1 my-2">
        <button onClick={handleSave} className="btn btn-primary mt-3">
          Download Csv Table
        </button>
      </div>
      <div className="form-group col-11 my-2">
        <label htmlFor="filenameColumn">New Column for Filename:</label>
        <input
          type="text"
          id="filenameColumn"
          value={filenameColumn}
          onChange={handleFilenameColumnChange}
          className="form-control"
        />
      </div>
    </div>
  );
}

SaveCsvTable.propTypes = {
  dm: PropTypes.object.isRequired,
  setdm: PropTypes.func.isRequired,
};

export default SaveCsvTable;
