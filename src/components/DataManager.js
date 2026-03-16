import { saveAs } from "file-saver";
class DataManager {
  constructor() {
    this.fileData = {};
    this.data = null;
    this.empty = true;
    this.lastTimeUpdated = null;
    this.dataUpdated = null;
  }

  saveData() {
    if (this.dataUpdated) {
      const csvString = dfd.toCSV(this.dataUpdated);
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    } else {
      console.error("No data available to save.");
    }
  }

  updateFilenameColumn() {
    this.dataUpdated = null;

    const metadataColumns = ["FullFileName", "FolderName", "FileName"];

    for (const [tableName, dataFrame] of Object.entries(this.fileData)) {
      let newDf = dataFrame;
      
      // If the dataframe doesn't have the metadata columns, add them (fallback)
      if (!metadataColumns.every(col => dataFrame.columns.includes(col))) {
        newDf = dataFrame.copy();
        const fullPath = tableName;
        const lastSlashIndex = fullPath.lastIndexOf("/");
        const folder = lastSlashIndex !== -1 ? fullPath.substring(0, lastSlashIndex) : "";
        const file = lastSlashIndex !== -1 ? fullPath.substring(lastSlashIndex + 1) : fullPath;

        newDf.addColumn("FullFileName", Array(newDf.shape[0]).fill(fullPath), { inplace: true });
        newDf.addColumn("FolderName", Array(newDf.shape[0]).fill(folder), { inplace: true });
        newDf.addColumn("FileName", Array(newDf.shape[0]).fill(file), { inplace: true });
      }

      // Reorder columns to make metadata columns the first ones
      const otherColumns = newDf.columns.filter((c) => !metadataColumns.includes(c));
      const reorderedDf = newDf.loc({ columns: [...metadataColumns, ...otherColumns] });

      if (this.dataUpdated) {
        this.dataUpdated = dfd.concat({
          dfList: [this.dataUpdated, reorderedDf],
          axis: 0,
        });
      } else {
        this.dataUpdated = reorderedDf;
      }
    }
  }

  loadData(tableName, csvString, sourcePath = null) {
    const newData = this.parseCsvString(csvString);
    const newDf = new dfd.DataFrame(newData);
    
    // Add metadata columns BEFORE concatenation to preserve them per row
    const fullPath = sourcePath || tableName;
    const lastSlashIndex = fullPath.lastIndexOf("/");
    const folder = lastSlashIndex !== -1 ? fullPath.substring(0, lastSlashIndex) : "";
    const file = lastSlashIndex !== -1 ? fullPath.substring(lastSlashIndex + 1) : fullPath;

    newDf.addColumn("FullFileName", Array(newDf.shape[0]).fill(fullPath), { inplace: true });
    newDf.addColumn("FolderName", Array(newDf.shape[0]).fill(folder), { inplace: true });
    newDf.addColumn("FileName", Array(newDf.shape[0]).fill(file), { inplace: true });

    if (this.empty) {
      this.data = newDf;
      this.empty = false;
    } else {
      this.data = dfd.concat({ dfList: [this.data, newDf], axis: 0 });
    }

    if (this.fileData[tableName]) {
      this.fileData[tableName] = dfd.concat({
        dfList: [this.fileData[tableName], newDf],
        axis: 0,
      });
    } else {
      this.fileData[tableName] = newDf;
    }

    this.updateLastTimeUpdated();
    this.updateFilenameColumn();
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
    newDm.dataUpdated = this.dataUpdated ? this.dataUpdated.copy() : null;
    newDm.fileData = { ...this.fileData };
    newDm.data = this.data ? this.data.copy() : null;
    newDm.empty = this.empty;
    newDm.lastTimeUpdated = this.lastTimeUpdated;
    return newDm;
  }
}

export default DataManager;
