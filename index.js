import Spellchecker from "spellchecker";
import {getAllFilesInDirectory} from './utils.js';

const projectResourcesPath = "C:\\Users\\olive\\Documents\\Unity Projects\\VSCS-2\\Assets\\Resources";
const convosPath = `${projectResourcesPath}\\Convos_VSCS-II`;
const articlesPath = `${projectResourcesPath}\\Articles`;
const textFilesPath = `${projectResourcesPath}\\TextFiles`;

const customWords = ["Arbough"]; //TODO add custom ignorelist
customWords.forEach(word => Spellchecker.add(word));

const allConvoPaths = getAllFilesInDirectory(convosPath);
const allArticlePaths = getAllFilesInDirectory(articlesPath);
const allTextFilePaths = getAllFilesInDirectory(textFilesPath);

console.log('List of files in the directory:', allTextFilePaths);

const a = Spellchecker.isMisspelled('beamns');
console.log(a);