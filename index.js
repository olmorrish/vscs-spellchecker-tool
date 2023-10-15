import Spellchecker from "spellchecker";
import {getAllFilesInDirectory} from './common.js';
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

const customWords = fs.readFileSync('dictionary.txt', 'utf-8').split('\n').map(word => word.trim());
customWords.forEach(word => Spellchecker.add(word));

const allConvoNames = getAllFilesInDirectory(allConvosDir);
const allArticleNames = getAllFilesInDirectory(allArticlesDir);
const allTextFileNames = getAllFilesInDirectory(allTextFilesDir);

/**
 * 1. Check all convo files
 */
console.log("Scanning all convo files...");
allConvoNames.forEach(fileName => {
    let convoTypos = [];

    //Get the path for the file, then read its contents
    const filePath = `${allConvosDir}\\${fileName}`
    const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    //Convo files contain several types of nodes in a top-level array, but we only want the "Dialogue" ones
    const dialogueNodes = fileContent.filter(node => node.nodetype === "Dialogue")

    //For each Dialogue node in this file, we need to scan all lines of dialogue.
    dialogueNodes.forEach(dialogueNode => {
        const nodeId = dialogueNode.id;
        dialogueNode.contents.forEach(line => {
            const arrayOfErrorIndices = Spellchecker.checkSpelling(line);
            if(arrayOfErrorIndices){
                arrayOfErrorIndices.forEach(errorRange => {
                    const misspelledWord = line.substring(errorRange.start, errorRange.end);
                    convoTypos.push({
                        "nodeId": nodeId,
                        "word": misspelledWord,
                    })
                });
            }
        })
    })

    //Write the data for this file under a header
    if(convoTypos.length > 0) {
        fs.appendFileSync(convoReportFileName, `----- ${fileName.toUpperCase()} -----\n`, 'utf-8')
        convoTypos.forEach(typoData => {
            const possibleCorrections = Spellchecker.getCorrectionsForMisspelling(typoData.word);
            fs.appendFileSync(convoReportFileName, `"${typoData.word}" ----- (nodeId: ${typoData.nodeId}) Did you mean: ${possibleCorrections}?\n`, 'utf-8');
        });
        fs.appendFileSync(convoReportFileName, '\n\n', 'utf-8')
    }
})

/**
 * 2. Check all article files
 */
console.log("Scanning all article files...");
allArticleNames.forEach(fileName => {
    let articleTypos = [];

    //Get the path for the file, then read its contents
    const filePath = `${allArticlesDir}\\${fileName}`
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    //Scan, then extract all flagged words from text
    const arrayOfErrorIndices = Spellchecker.checkSpelling(fileContent);
    if(arrayOfErrorIndices){
        arrayOfErrorIndices.forEach(errorRange => {
            const misspelledWord = fileContent.substring(errorRange.start, errorRange.end);
            articleTypos.push({
                "word": misspelledWord,
                "start": errorRange.start,
                "end": errorRange.end,
            })
        });
    }

    //Write the data for this file under a header
    if(articleTypos.length > 0) {
        fs.appendFileSync(articleReportFileName, `----- ${fileName.toUpperCase()} -----\n`, 'utf-8')
        articleTypos.forEach(typoData => {
            const possibleCorrections = Spellchecker.getCorrectionsForMisspelling(typoData.word);
            fs.appendFileSync(articleReportFileName, `"${typoData.word}" ----- (index: ${typoData.start}) Did you mean: ${possibleCorrections}?\n`, 'utf-8');
        });
        fs.appendFileSync(articleReportFileName, '\n\n', 'utf-8')
    }
})

/**
 * 3. Check all text files
 */
console.log("Scanning all text files...");
allTextFileNames.forEach(fileName => {
    let textFileTypos = [];

    //Get the path for the file, then read its contents
    const filePath = `${allTextFilesDir}\\${fileName}`
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    //Scan, then extract all flagged words from text
    const arrayOfErrorIndices = Spellchecker.checkSpelling(fileContent);
    if(arrayOfErrorIndices){
        arrayOfErrorIndices.forEach(errorRange => {
            const misspelledWord = fileContent.substring(errorRange.start, errorRange.end);
            textFileTypos.push({
                "word": misspelledWord,
                "start": errorRange.start,
                "end": errorRange.end,
            })
        });
    }

    //Write the data for this file under a header
    if(textFileTypos.length > 0) {
        fs.appendFileSync(textFileReportFileName, `----- ${fileName.toUpperCase()} -----\n`, 'utf-8')
        textFileTypos.forEach(typoData => {
            const possibleCorrections = Spellchecker.getCorrectionsForMisspelling(typoData.word);
            fs.appendFileSync(textFileReportFileName, `"${typoData.word}" ----- (index: ${typoData.start}) Did you mean: ${possibleCorrections}?\n`, 'utf-8');
        });
        fs.appendFileSync(textFileReportFileName, '\n\n', 'utf-8')
    }
})