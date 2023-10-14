
import fs from 'fs';
import path from 'path';

export function getAllFilesInDirectory(directoryPath) {
    try {
      const files = fs.readdirSync(directoryPath);
  
      const fileArray = [];
  
      for (const file of files) {
          
        const filePath = path.join(directoryPath, file);
        const fileStat = fs.statSync(filePath);
  
        //Exclude Unity .meta files 
        if (fileStat.isFile() && path.extname(file) !== '.meta') {
          fileArray.push(file);
        }
      }
  
      return fileArray;
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
}