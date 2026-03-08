import React from "react";
import PropTypes from "prop-types";

function DataTable({ dataManager }) {
    if (dataManager.empty || !dataManager.dataUpdated) {
        return null;
    }

    const columns = dataManager.dataUpdated.columns;
    const data = dfd.toJSON(dataManager.dataUpdated);

    return (
        <div className="table-container my-4">
            <div
                style={{ maxHeight: "50vh", overflowX: "auto", overflowY: "auto" }}
            >
                <table className="table table-hover mb-0">
                    <thead className="glass-panel" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                        <tr>
                            {columns.map((col) => (
                                <th key={col} style={{
                                    backgroundColor: "rgba(255,255,255,0.9)",
                                    color: "var(--text-main)",
                                    fontWeight: "600",
                                    borderBottom: "2px solid var(--border)"
                                }}>
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {columns.map((col) => (
                                    <td key={col} style={{
                                        color: col === "__fileName__" ? "var(--primary)" : "inherit",
                                        fontWeight: col === "__fileName__" ? "500" : "400",
                                        fontSize: "0.9rem"
                                    }}>
                                        {row[col]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

DataTable.propTypes = {
    dataManager: PropTypes.object.isRequired,
};

export default DataTable;
