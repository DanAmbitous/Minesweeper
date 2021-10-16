import {
  boardTileCreation,
  leftClick,
  rightClick,
  stateSetup,
  TILE_STATUSES,
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

    tile.tileElement.addEventListener("click", () => clickFunctionalities(tile))

    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      rightClick(tile, MINE_QUANTITY)
    })
  })
})

function clickFunctionalities(tile) {
  leftClick(tile, boardPopulating)

  gameOver(tile.mine, boardPopulating)
}

function gameOver(mine, boardPopulating) {
  if (mine) {
    const boardElements = Array.from(boardContainer.children)

    boardElements.forEach((tile) => {
      console.log(tile)
      // tile.removeEventListener("click", clickFunctionalities)
      tile.disabled = true
    })
  } else {
    console.log("Victory")
  }
}
