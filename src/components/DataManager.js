class DataManager {
  constructor() {
    this.fileData = {};
    this.data = null;
    this.empty = true;
  }

  async loadData(fileName, csvString) {
    const newData = this.parseCsvString(csvString);
    const newDf = new dfd.DataFrame(newData);

    if (this.empty) {
      this.data = newDf;
      this.empty = false;
    } else {
      this.data = dfd.concat({ dfList: [this.data, newDf], axis: 0 });
    }

    if (this.fileData[fileName]) {
      this.fileData[fileName] = dfd.concat({
        dfList: [this.fileData[fileName], newDf],
        axis: 0,
      });
    } else {
      this.fileData[fileName] = newDf;
    }
  }

  parseCsvString(csvString) {
    const rows = csvString.split("\n");
    return rows.map((row) => row.split(","));
  }

  getTableHeaders() {
    const allHeaders = new Set(this.data.columns);
    const fileHeaders = {};

    Object.keys(this.fileData).forEach((fileName) => {
      fileHeaders[fileName] = this.fileData[fileName].columns;
    });

    const headersArray = Array.from(allHeaders);
    const headersPresence = headersArray.map((header) => {
      const presence = { header };
      Object.keys(fileHeaders).forEach((fileName) => {
        presence[fileName] = fileHeaders[fileName].includes(header) ? 1 : 0;
      });
      return presence;
    });

    return headersPresence;
  }

  getData(fileName) {
    return this.fileData[fileName];
  }

  getAllData() {
    return this.fileData;
  }
}

export default DataManager;
