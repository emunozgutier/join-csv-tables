class DataManager {
  constructor() {
    this.data = [];
  }

  loadData(csvString) {
    this.parseCsvString(csvString);
  }

  parseCsvString(csvString) {
    // Implement CSV parsing logic here
    const rows = csvString.split("\n");
    this.data = rows.map((row) => row.split(","));
  }
}

export default DataManager;
