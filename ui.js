import { boardCreation, tileMarking, mineCount } from "./minesweeper.js"

const BOARD_SIZE = 5
const MINE_QUANTITY = 5

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", BOARD_SIZE)

const mineQuantityDisplayer = document.querySelector("#mine-count")

const board = boardCreation(BOARD_SIZE)
console.log(board)

board.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.tileElement)

    tile.tileElement.addEventListener("click", () => {})
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      tileMarking(e, MINE_QUANTITY, mineQuantityDisplayer)
    })
  })
})

mineCount(MINE_QUANTITY, mineQuantityDisplayer)
