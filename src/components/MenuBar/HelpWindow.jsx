import React from 'react';
import commitInfo from '../CommitInfo.js'


function HelpWindow() {
  return (
    <div className="modal fade" id="helpModal" tabIndex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="helpModalLabel">Help</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>Commit Hash: {commitInfo.commit_hash}</p>
            <p>Commit Title: {commitInfo.commit_title}</p>
            <p>Commit Message: {commitInfo.commit_message}</p>
            <p>Commit Date: {commitInfo.commit_date}</p>
            <p>Author Name: {commitInfo.author_name}</p>
            <p>Author Email: {commitInfo.author_email}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpWindow;