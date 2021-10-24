import { boardCreation } from "./minesweeper.js"

const boardDimension = 5
const mineQuantity = 5

const boardElements = boardCreation(boardDimension, mineQuantity)
console.log(boardElements)
