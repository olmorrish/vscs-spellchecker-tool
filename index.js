import Spellchecker from "spellchecker";
import {getAllFilesInDirectory} from './utils.js';
import fs from 'fs';

const projectResourcesPath = "C:\\Users\\olive\\Documents\\Unity Projects\\VSCS-2\\Assets\\Resources";
const allConvosDir = `${projectResourcesPath}\\Convos_VSCS-II`;
const allArticlesDir = `${projectResourcesPath}\\Articles`;
const allTextFilesDir = `${projectResourcesPath}\\TextFiles`;

const convoReportFileName = "convoReport.txt";
const articleReportFileName = "articleReport.txt";
const textFileReportFileName = "textFileReport.txt";

// Clear report files and set up data objects
fs.writeFileSync(convoReportFileName, '', 'utf-8');
fs.writeFileSync(articleReportFileName, '', 'utf-8');
fs.writeFileSync(textFileReportFileName, '', 'utf-8');

//const customWords = fs.readFileSync('dictionary.txt', 'utf-8').split('\n').map(word => word.trim());
//customWords.forEach(word => Spellchecker.add(word));

const allConvoNames = getAllFilesInDirectory(allConvosDir);
const allArticleNames = getAllFilesInDirectory(allArticlesDir);
const allTextFileNames = getAllFilesInDirectory(allTextFilesDir);

//Check all article files
allTextFileNames.forEach(fileName => {
    let articleTypos = [];

    //Get the path for the file, then read its contents
    const filePath = `${allTextFilesDir}\\${fileName}`
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    //Scan, then extract all flagged words from text
    const arrayOfErrorIndices = Spellchecker.checkSpelling(fileContent);
    if(arrayOfErrorIndices){
        arrayOfErrorIndices.forEach(errorRange => {
            const misspelledWord = fileContent.substring(errorRange.start, errorRange.end);
            articleTypos.push({
                "word": misspelledWord,
                "startIndex": errorRange.start,
                "endIndex": errorRange.end,
            })
        });
    }

    //Write the data for this file
    if(articleTypos.length > 0) {
        
        fs.appendFileSync(articleReportFileName, `----- ${fileName.toUpperCase()} -----\n`, 'utf-8')

        articleTypos.forEach(typoData => {
            const possibleCorrections = Spellchecker.getCorrectionsForMisspelling(typoData.word);
            fs.appendFileSync(articleReportFileName, `${typoData.word}... did you mean: ${possibleCorrections}?\n`, 'utf-8');
        });

        fs.appendFileSync(articleReportFileName, '\n\n', 'utf-8')
    }
})
