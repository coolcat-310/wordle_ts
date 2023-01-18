// @ts-ignore
import wordBank from "../helpers/wordle-bank.txt"


export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split('\n');
            todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
            wordSet = [...wordArr];
        })
    return { wordSet, todaysWord };
}

export const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
export const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
export const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
