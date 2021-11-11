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
  let BOARD_DIMENSION = 5
  let MINE_QUANTITY = 1

  const INITIAL_SCORE = 1000

  sessionStorage.setItem("gameRunning", true)
  sessionStorage.setItem("mineActive", false)
  sessionStorage.setItem("initialClick", true)
  sessionStorage.setItem("score", INITIAL_SCORE)

  mineNumberIndicator.textContent = MINE_QUANTITY

  let boardLayout = boardPopulation(BOARD_DIMENSION, MINE_QUANTITY)

  borderContainerElement.style.setProperty("--size", BOARD_DIMENSION)

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      borderContainerElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {
        const avaliableTiles = boardInfo(boardLayout) //Suspect this is the problem as to why score counter doesn't stop because when the tiles auto-reveal no click even is being triggered for it to have updated the last avaliableTiles variable on a click

        const mineStatus = JSON.parse(sessionStorage.getItem("mineActive"))

        if (avaliableTiles.length === 0 || mineStatus) {
          return
        } else {
          leftClickEvent(tile, boardLayout)
        }
      })

      tile.tileElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()

        const avaliableTiles = boardInfo(boardLayout)

        if (avaliableTiles.length === 0) {
          return
        } else {
          const updatedMineQuantity = rightClickEvent(
            tile,
            MINE_QUANTITY,
            borderContainerElement
          )

          mineNumberIndicator.textContent = updatedMineQuantity
        }
      })
    })
  })

  boardInfo(boardLayout)
}
