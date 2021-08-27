import { createBoard } from "./minesweeper.js"

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 2

const board = createBoard(5, 2)
const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

board.forEach((row) => {
  row.forEach((title) => {
    boardElement.append(title.element)
  })
})
