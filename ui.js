import {
  boardTileCreation,
  leftClick,
  rightClick,
  stateSetup,
} from "./minesweeper.js"

const DIMENSIONS = 5
const MINE_QUANTITY = 5

const boardPopulating = boardTileCreation(DIMENSIONS, MINE_QUANTITY)

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", DIMENSIONS)

stateSetup(MINE_QUANTITY)

boardPopulating.forEach((row) => {
  row.forEach((tile) => {
    boardContainer.append(tile.tileElement)

    tile.tileElement.addEventListener("click", (e) => {
      leftClick(tile, boardPopulating)
    })
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      rightClick(tile, MINE_QUANTITY)
    })
  })
})
