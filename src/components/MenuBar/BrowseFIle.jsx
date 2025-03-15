import PropTypes from 'prop-types';

function BrowseFile({ onFileNameChange }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    onFileNameChange(file);
  };

  return (
    <div className="browse-file">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}

BrowseFile.propTypes = {
  onFileNameChange: PropTypes.func.isRequired,
};

export default BrowseFile;