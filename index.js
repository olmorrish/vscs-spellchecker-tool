import Spellchecker from "spellchecker";
import {getAllFilesInDirectory} from './utils.js';
import fs from 'fs';

const projectResourcesPath = "C:\\Users\\olive\\Documents\\Unity Projects\\VSCS-2\\Assets\\Resources";
const allConvosDir = `${projectResourcesPath}\\Convos_VSCS-II`;
const allArticlesDir = `${projectResourcesPath}\\Articles`;
const allTextFilesDir = `${projectResourcesPath}\\TextFiles`;

const customWords = ["Arbough"]; //TODO add custom ignorelist
customWords.forEach(word => Spellchecker.add(word));

const allConvoNames = getAllFilesInDirectory(allConvosDir);
const allArticleNames = getAllFilesInDirectory(allArticlesDir);
const allTextFileNames = getAllFilesInDirectory(allTextFilesDir);

//Check all article files
allTextFileNames.forEach(fileName => {
    //Get the path for the file, then read its contents
    const filePath = `${allTextFilesDir}\\${fileName}`
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    //TODO spell check
    const arrayOfErrorIndices = Spellchecker.checkSpelling(fileContent);

    //ex
    if(arrayOfErrorIndices){

        arrayOfErrorIndices.forEach(errorRange => {
            console.log(fileContent.substring(errorRange.start, errorRange.end));
        });

    }
})