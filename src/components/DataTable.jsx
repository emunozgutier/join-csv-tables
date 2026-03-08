import React from "react";
import PropTypes from "prop-types";

function DataTable({ dataManager }) {
    if (dataManager.empty || !dataManager.dataUpdated) {
        return null;
    }

    const columns = dataManager.dataUpdated.columns;
    const data = dfd.toJSON(dataManager.dataUpdated);

    return (
        <div
            className="border my-3"
            style={{ maxHeight: "50vh", overflowX: "auto", overflowY: "auto" }}
        >
            <table className="table table-striped table-hover table-bordered mb-0">
                <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col) => (
                                <td key={col}>{row[col]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

DataTable.propTypes = {
    dataManager: PropTypes.object.isRequired,
};

export default DataTable;
