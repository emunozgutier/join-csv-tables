class DataManager {
  constructor() {
    this.fileData = {};
    this.data = null;
    this.empty = true;
    this.lastTimeUpdated = null;
    this.filenameColumn = "fileName";
  }

  updateFilenameColumn() {
    const updatedDataFrames = [];

    for (const [fileName, dataFrame] of Object.entries(this.fileData)) {
      const newColumn = Array(dataFrame.shape[0]).fill(fileName);
      dataFrame.addColumn(this.filenameColumn, newColumn, { inplace: true });
      updatedDataFrames.push(dataFrame);
    }

    this.dataUpdated = dfd.concat({ dfList: updatedDataFrames, axis: 0 });
  }

  loadData(fileName, csvString) {
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

    this.updateLastTimeUpdated();
  }

  updateLastTimeUpdated() {
    this.lastTimeUpdated = new Date();
  }

  parseCsvString(csvString) {
    const csv2json = Papa.parse(csvString, {
      header: true, // Set to true if the first row contains headers
    });

    // Filter out columns with empty column names
    var data = csv2json.data.map((row) => {
      return Object.fromEntries(
        Object.entries(row).filter(([key]) => key.trim() !== ""),
      );
    });
    data = data.slice(0, -1);
    return data;
  }

  getTableHeaders() {
    if (!this.dataUpdated) {
      return [];
    }

    const allHeaders = new Set(this.dataUpdated.columns);
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

  clone() {
    const newDm = new DataManager();
    newDm.fileData = { ...this.fileData };
    newDm.data = this.data ? this.data.copy() : null;
    newDm.empty = this.empty;
    newDm.lastTimeUpdated = this.lastTimeUpdated;
    return newDm;
  }
}

export default DataManager;
