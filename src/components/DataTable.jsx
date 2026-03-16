import React from "react";
import useStore from "../store/useStore";

function DataTable() {
    const { dm: dataManager } = useStore();
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
                                {columns.map((col) => {
                                    const isMetadata = ["FullFileName", "FolderName", "FileName"].includes(col);
                                    return (
                                        <td key={col} style={{
                                            color: isMetadata ? "var(--primary)" : "inherit",
                                            fontWeight: isMetadata ? "500" : "400",
                                            fontSize: "0.9rem",
                                            whiteSpace: isMetadata ? "nowrap" : "normal"
                                        }}>
                                            {row[col]}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;
