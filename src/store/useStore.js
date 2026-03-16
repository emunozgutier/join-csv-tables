import { create } from 'zustand';
import DataManager from '../components/DataManager';

const useStore = create((set) => ({
  // Data State
  dm: new DataManager(),
  
  // Conflict Resolution State
  pendingFiles: null, // { filename: [FileObjects] }
  conflicts: [], // [filenames]
  appendChoices: {}, // { filename: boolean }

  // Actions
  setDm: (newDm) => set({ dm: newDm }),
  
  setConflictsData: (grouped, duplicateNames) => {
    const initialChoices = {};
    duplicateNames.forEach(name => {
      initialChoices[name] = true;
    });
    set({ 
      pendingFiles: grouped, 
      conflicts: duplicateNames, 
      appendChoices: initialChoices 
    });
  },

  toggleAppendChoice: (filename) => set((state) => ({
    appendChoices: {
      ...state.appendChoices,
      [filename]: !state.appendChoices[filename]
    }
  })),

  clearConflicts: () => set({ 
    pendingFiles: null, 
    conflicts: [], 
    appendChoices: {} 
  }),

  // Batch process files after decisions
  processAllPending: () => set((state) => {
    const { pendingFiles, appendChoices, dm } = state;
    if (!pendingFiles) return state;

    const allFilesToProcess = [];
    Object.entries(pendingFiles).forEach(([originalName, files]) => {
      const shouldAppend = appendChoices[originalName] !== false;

      if (shouldAppend) {
        files.forEach(f => allFilesToProcess.push({ ...f, name: originalName }));
      } else {
        files.forEach(f => allFilesToProcess.push(f));
      }
    });

    const newDm = dm.clone();
    let filesProcessed = 0;

    if (allFilesToProcess.length > 0) {
      allFilesToProcess.forEach((item) => {
        const file = item.file;
        const name = item.name;

        const reader = new FileReader();
        reader.onload = (event) => {
          const csvString = event.target.result;
          newDm.loadData(name, csvString);
          filesProcessed++;
          if (filesProcessed === allFilesToProcess.length) {
            // Update the store when all files are processed
            // Since this is inside set, we might need a workaround for async?
            // Zustand's set is synchronous. FileReader is async.
            // Better to handle the async part outside or use a pattern for async in Zustand.
          }
        };
        reader.readAsText(file);
      });
    }

    return { 
      // Note: Updating DM here won't work due to async FileReader.
      // We'll move the actual loading logic to a separate action or handle it in the component.
    };
  }),
  
  // Refined async action for loading data
  loadFiles: async (fileItems) => {
    const { dm } = useStore.getState();
    const newDm = dm.clone();
    
    const readAsText = (file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsText(file);
    });

    for (const item of fileItems) {
      const file = item.file || item;
      // tableName is the group name or the specific path if separate
      const tableName = item.name || file.name;
      // sourcePath is the specific full path regardless of grouping
      const sourcePath = item.sourcePath || item.name || file.name;
      
      const csvString = await readAsText(file);
      newDm.loadData(tableName, csvString, sourcePath);
    }
    
    set({ dm: newDm });
  }
}));

export default useStore;
