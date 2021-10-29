import { boardPopulation } from "./minesweeper.js"

let BOARD_DIMENSION = 5
let MINE_QUANTITY = 5

const boardLayout = boardPopulation(BOARD_DIMENSION, MINE_QUANTITY)

const borderContainerElement = document.querySelector(".board")

createBoard()
function createBoard() {
  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      borderContainerElement.append(tile.tileElement)
    })
  })
}
