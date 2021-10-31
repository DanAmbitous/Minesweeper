import {
  boardPopulation,
  leftClickEvent,
  rightClickEvent,
} from "./minesweeper.js"

const borderContainerElement = document.querySelector(".board")
const mineNumberIndicator = document.querySelector(".mine-number")

createBoard()
function createBoard() {
  let BOARD_DIMENSION = 5
  let MINE_QUANTITY = 5

  mineNumberIndicator.textContent = MINE_QUANTITY

  let boardLayout = boardPopulation(BOARD_DIMENSION, MINE_QUANTITY)

  borderContainerElement.style.setProperty("--size", BOARD_DIMENSION)

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      borderContainerElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {
        leftClickEvent(tile, MINE_QUANTITY)
      })
      tile.tileElement.addEventListener("contextmenu", (e) => {
        const updatedMineQuantity = rightClickEvent(
          e,
          tile,
          MINE_QUANTITY,
          borderContainerElement
        )

        mineNumberIndicator.textContent = updatedMineQuantity
      })
    })
  })
}
