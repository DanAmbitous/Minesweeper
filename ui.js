import {
  boardPopulation,
  leftClickEvent,
  rightClickEvent,
  boardInfo,
} from "./minesweeper.js"

const borderContainerElement = document.querySelector(".board")
const mineNumberIndicator = document.querySelector(".mine-number")

createBoard()
function createBoard() {
  let BOARD_DIMENSION = 2
  let MINE_QUANTITY = 2

  mineNumberIndicator.textContent = MINE_QUANTITY

  let boardLayout = boardPopulation(BOARD_DIMENSION, MINE_QUANTITY)

  borderContainerElement.style.setProperty("--size", BOARD_DIMENSION)

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      borderContainerElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {
        leftClickEvent(tile, boardLayout)
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

  boardInfo(boardLayout)
}
