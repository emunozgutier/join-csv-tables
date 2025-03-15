import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

function SaveCsvTable({ dm }) {
  const [filenameColumn, setFilenameColumn] = useState(dm.filenameColumn);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dm.filenameColumn = filenameColumn;
      dm.updateFilenameColumn();
    }, 1000);
    return () => clearTimeout(timeoutRef.current);
  }, [filenameColumn, dm]);

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
          onChange={(e) => setFilenameColumn(e.target.value)}
          className="form-control"
        />
      </div>
    </div>
  );
}

SaveCsvTable.propTypes = {
  dm: PropTypes.object.isRequired,
};

export default SaveCsvTable;
