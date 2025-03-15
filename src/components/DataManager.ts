

class DataManager{
  private file: string;
  private reader: string;
  private file_json: string;
  private fileDataDict: { [key: string]: string } = {};

  constructor() {
      this.df = new dfd.DataFrame();
  }

  parseCsvString(csvFileName: File, csvString: string): void {
    this.file = csvFileName.name;
    this.reader = "csv_reader";
    this.file_json = 'not_implemented';

    // Store the csvFileName and csvString in fileDataDict
    this.fileDataDict[csvFileName.name] = csvString;

    const csv2json = Papa.parse(csvString, {
      header: true, // Set to true if the first row contains headers
    });

    // Filter out columns with empty column names
    const filteredData = csv2json.data.map((row: any) => {
      return Object.fromEntries(Object.entries(row).filter(([key]) => key.trim() !== ''));
    });

    let newDf = new dfd.DataFrame(filteredData);
    newDf.addColumn('File_Name,', Array(newDf.shape[0]).fill(this.file), { inplace: true });
    newDf = newDf.loc({ columns: ['File_Name,', ...newDf.columns.slice(0, -1)] });

    if (this.df.shape[0] <= 1 ) {
      this.df = newDf;
    } else {
      this.df = dfd.concat({ dfList: [this.df, newDf], axis: 0 });
    }
  }

  saveToCsv(filePath: string): void {
      dfd.toCSV(this.df, {fileName: "testOut.csv", download: true});
  }
}

export default DataManager;