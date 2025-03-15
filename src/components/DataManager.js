class DataManager {
  /*****************************************************************************
   * This class is the main data manager class.
   ****************************************************************************/

  constructor() {
    this.timeLastUpdated = Date()
    this.data = [{}];
  }

  clone() {
    const newDataManager = new DataManager();
    newDataManager.data = [...this.data];
    return newDataManager;
  }

}

export default DataManager;