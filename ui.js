//Display/UI

import { createBoard, markTile } from "./minesweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 25
const minesLeftDisplayer = document.querySelector("#mine-count")

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftDisplayer.innerText = NUMBER_OF_MINES
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener("click", () => {
      console.log("Right click")
    })
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTile(tile)
    })
  })
})
