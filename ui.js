import { tileCreation, tileRevealing, tileMarking } from "./minesweeper.js"

const BOARD_SIZE = 10
const MINE_QUANTITY = 10

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", BOARD_SIZE)
const mineQuantityIndicator = document.querySelector("#mine-count")
mineQuantityIndicator.textContent = MINE_QUANTITY

const board = tileCreation(BOARD_SIZE, MINE_QUANTITY)

board.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.tileElement)

    tile.tileElement.addEventListener("click", (e) => {
      tileRevealing(tile, board, mineQuantityIndicator)
    })
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      tileMarking(tile, board, mineQuantityIndicator)
    })
  })
})
