import { tileCreation, tileRevealing, tileMarking } from "./minesweeper.js"

const BOARD_SIZE = 5
const MINE_QUANTITY = 5

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", BOARD_SIZE)
const mineQuantityIndicator = document.querySelector("#mine-count")
mineQuantityIndicator.textContent = MINE_QUANTITY

const board = tileCreation(BOARD_SIZE, MINE_QUANTITY)

board.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.tileElement)

    tile.tileElement.addEventListener("click", (e) => {
      tileRevealing(tile, board)
    })
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      tileMarking(tile, board, mineQuantityIndicator)
    })
  })
})
