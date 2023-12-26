// FileDataContext.js
import { createContext, useContext, useState } from 'react';

const FileDataContext = createContext();

export const useFileData = () => {
  const context = useContext(FileDataContext);
  if (!context) {
    throw new Error('useFileData must be used within a FileDataProvider');
  }
  return context;
};

export const FileDataProvider = ({ children }) => {
  const [fileData, setFileData] = useState(null);

  const setFileDataValue = (data) => {
    setFileData(data);
  };

  return (
    <FileDataContext.Provider value={{ fileData, setFileData: setFileDataValue }}>
      {children}
    </FileDataContext.Provider>
  );
};
