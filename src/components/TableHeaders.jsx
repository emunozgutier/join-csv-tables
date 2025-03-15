import React from "react";
import PropTypes from "prop-types";

function TableHeaders({ dataManager }) {
  if (dataManager.empty) {
    return null;
  }

  const allHeaders = new Set();
  const fileHeaders = {};

  // Collect all headers from all files
  Object.keys(dataManager.getAllData()).forEach((fileName) => {
    const headers = dataManager.getData(fileName)[0];
    fileHeaders[fileName] = headers;
    headers.forEach((header) => allHeaders.add(header));
  });

  const allHeadersArray = Array.from(allHeaders);

  return (
    <div
      className="border my-3"
      style={{ maxHeight: "50vh", overflowY: "auto" }}
    >
      <table className="table">
        <thead>
          <tr>
            <th>Header</th>
            {Object.keys(fileHeaders).map((fileName) => (
              <th key={fileName}>{fileName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allHeadersArray.map((header) => (
            <tr key={header}>
              <td>{header}</td>
              {Object.keys(fileHeaders).map((fileName) => (
                <td key={fileName}>
                  {fileHeaders[fileName].includes(header) ? "✔️" : "❌"}
                </td>
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
