import React from "react";
import PropTypes from "prop-types";

function TableHeaders({ dataManager }) {
  if (dataManager.empty) {
    return null;
  }

  const headersPresence = dataManager.getTableHeaders();

  return (
    <div
      className="border my-3"
      style={{ maxHeight: "50vh", overflowY: "auto" }}
    >
      <table className="table">
        <thead>
          <tr>
            <th>Header</th>
            {Object.keys(dataManager.getAllData()).map((fileName) => (
              <th key={fileName}>{fileName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headersPresence.map((headerPresence) => (
            <tr key={headerPresence.header}>
              <td>{headerPresence.header}</td>
              {Object.keys(dataManager.getAllData()).map((fileName) => (
                <td key={fileName}>{headerPresence[fileName] ? "✔️" : "❌"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TableHeaders.propTypes = {
  dataManager: PropTypes.object.isRequired,
};

export default TableHeaders;
