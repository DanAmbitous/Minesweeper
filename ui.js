import {
  boardCreation,
  tileMarking,
  mineCount,
  tileRevealing,
} from "./minesweeper.js"

const BOARD_SIZE = 5
const MINE_QUANTITY = 5

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", BOARD_SIZE)

const mineQuantityDisplayer = document.querySelector("#mine-count")

const board = boardCreation(BOARD_SIZE, MINE_QUANTITY)
console.log(board)

board.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.tileElement)

    tile.tileElement.addEventListener("click", (e) => {
      tileRevealing(e)
    })
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      tileMarking(e, mineQuantityDisplayer)
    })
  })
})

mineCount(MINE_QUANTITY, mineQuantityDisplayer)
