import { tileCreation, tileRevealing } from "./minesweeper.js"

const BOARD_SIZE = 5
const MINE_QUANTITY = 5

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", BOARD_SIZE)

const board = tileCreation(BOARD_SIZE, MINE_QUANTITY)

board.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.tileElement)

    tile.tileElement.addEventListener("click", (e) => {
      tileRevealing(tile, board)
    })
  })
})
