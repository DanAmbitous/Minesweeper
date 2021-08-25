import { createBoard } from "./minesweeper.js"

const BOARD_SIZE = 3
const NUMBER_OF_MINES = 5

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
  })
})
