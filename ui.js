import { createBoard } from "./minesweeper.js"

const boardElement = document.querySelector(".board")

const BOARD_X_AND_Y_DISTANCE = 10
const MINE_QUANTITY = 10

const board = createBoard(BOARD_X_AND_Y_DISTANCE, MINE_QUANTITY)

boardElement.style.setProperty("--size", BOARD_X_AND_Y_DISTANCE)

board.forEach((row) => {
  console.log(row)

  row.forEach((tile) => {
    boardElement.append(tile.element)
  })
})

console.log(board)
