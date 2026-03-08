import React from 'react';

const WelcomeModal = () => {
    return (
        <div className="modal fade" id="welcomeModal" tabIndex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg text-center">
                <div className="modal-content glass-panel border-0" style={{ borderRadius: 'var(--radius-lg)' }}>
                    <div className="modal-header border-0 pb-0">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body px-4 pb-5">
                        <h2 className="fw-bold mb-4" style={{ color: 'var(--slate-800)' }}>The Problem: Scattered Data</h2>

                        <div className="row g-3 mb-4">
                            <div className="col-md-4">
                                <div className="file-card text-start">
                                    <div className="fw-bold small mb-2 opacity-75">file1.csv</div>
                                    <table className="table table-sm table-bordered mb-0" style={{ fontSize: '0.75rem' }}>
                                        <thead><tr className="table-light"><th>A</th><th>B</th><th>C</th></tr></thead>
                                        <tbody><tr><td>1</td><td>2</td><td>3</td></tr></tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="file-card text-start">
                                    <div className="fw-bold small mb-2 opacity-75">file2.csv</div>
                                    <table className="table table-sm table-bordered mb-0" style={{ fontSize: '0.75rem' }}>
                                        <thead><tr className="table-light"><th>A</th><th>D</th><th>C</th></tr></thead>
                                        <tbody><tr><td>1</td><td>X</td><td>3</td></tr></tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="file-card text-start">
                                    <div className="fw-bold small mb-2 opacity-75">file3.csv</div>
                                    <table className="table table-sm table-bordered mb-0" style={{ fontSize: '0.75rem' }}>
                                        <thead><tr className="table-light"><th>A</th><th>B</th><th>D</th></tr></thead>
                                        <tbody><tr><td>1</td><td>2</td><td>X</td></tr></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="tutorial-arrow">↓ JOINED ↓</div>

                        <h2 className="fw-bold mb-2">The Solution: One Unified View</h2>
                        <p className="text-muted mb-4 px-5">Automatically merging overlapping columns and tracking the source file.</p>

                        <div className="joined-card text-start overflow-hidden">
                            <table className="table table-sm table-bordered mb-0" style={{ fontSize: '0.85rem' }}>
                                <thead className="table-dark">
                                    <tr>
                                        <th className="filename-col">__fileName__</th>
                                        <th>A</th>
                                        <th>B</th>
                                        <th>C</th>
                                        <th>D</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tutorial-highlight">
                                        <td className="filename-col">file1.csv</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td><span className="tutorial-null">null</span></td>
                                    </tr>
                                    <tr>
                                        <td className="filename-col">file2.csv</td>
                                        <td>1</td>
                                        <td><span className="tutorial-null">null</span></td>
                                        <td>3</td>
                                        <td>X</td>
                                    </tr>
                                    <tr className="tutorial-highlight">
                                        <td className="filename-col">file3.csv</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td><span className="tutorial-null">null</span></td>
                                        <td>X</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 p-3 bg-light rounded-3 text-start small">
                            <div className="row">
                                <div className="col-sm-4 mb-2 mb-sm-0">✅ <strong>No Data Loss</strong>: All unique columns (A, B, C, D) are preserved.</div>
                                <div className="col-sm-4 mb-2 mb-sm-0">✅ <strong>Perfect Lineage</strong>: The <code>__fileName__</code> column tracks source.</div>
                                <div className="col-sm-4">✅ <strong>Auto Alignment</strong>: Matching columns are merged across files.</div>
                            </div>
                        </div>

                        <button type="button" className="btn btn-primary btn-lg mt-5 px-5 shadow" data-bs-dismiss="modal" style={{ borderRadius: 'var(--radius-md)' }}>
                            Start Joining
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
