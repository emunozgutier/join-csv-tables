class DataManager {
  /*****************************************************************************
   * This class is the main data manager class.
   ****************************************************************************/

  constructor() {
    this.timeLastUpdated = Date();
    this.data = [{}];
  }

  clone() {
    const newDataManager = new DataManager();
    newDataManager.data = [...this.data];
    return newDataManager;
  }

  parseCsvString(csvString) {
    // Check for non-alphanumeric characters (excluding underscores) and give a warning
    const nonAlphanumericChars = csvString.match(/[^a-zA-Z0-9_,\n]/g);
    if (nonAlphanumericChars) {
      console.warn(
        "Warning: Found non-alphanumeric characters:",
        nonAlphanumericChars,
      );
    }

    // Remove non-alphanumeric characters (excluding underscores)
    const cleanedCsvString = csvString.replace(/[^a-zA-Z0-9_\.,\n]/g, "");
    const csv2json = Papa.parse(cleanedCsvString, {
      header: true, // Set to true if the first row contains headers
    });

    // Filter out columns with empty column names
    var data = csv2json.data.map((row) => {
      return Object.fromEntries(
        Object.entries(row).filter(([key]) => key.trim() !== ""),
      );
    });
    data = data.slice(0, -1);
    this.convertNumericColumnsToFloat(data);
    console.log("Parsed CSV data:", data);
    this.dm.data = data;
    return data;
  }
  const loadData = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {

      let dataFrame = dm.clone();
      dataFrame.saveLoad.parseCsvString(e.target.result);
      setdm(dataFrame);
    };
    reader.readAsText(file);
  };
}

export default DataManager;
