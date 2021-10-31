import {
  boardPopulation,
  leftClickEvent,
  rightClickEvent,
} from "./minesweeper.js"

const borderContainerElement = document.querySelector(".board")

createBoard()
function createBoard() {
  let BOARD_DIMENSION = 5
  let MINE_QUANTITY = 5

  let boardLayout = boardPopulation(BOARD_DIMENSION, MINE_QUANTITY)

  borderContainerElement.style.setProperty("--size", BOARD_DIMENSION)

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      borderContainerElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {
        leftClickEvent(tile)
      })
      tile.tileElement.addEventListener("contextmenu", (e) => {
        rightClickEvent(e, tile)
      })
    })
  })
}
