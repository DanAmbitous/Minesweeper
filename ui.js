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

const menuTemplate = document.querySelector("#menu")

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

function gameOver(mine) {
  if (mine) {
    const boardElements = Array.from(boardContainer.children)

    boardElements.forEach((tile) => {
      console.log(tile)
      tile.disabled = true
    })

    menu(false)
  } else {
    console.log("Victory")
  }
}

function menu(won) {
  const clone = menuTemplate.content.cloneNode(true)
  const p = clone.querySelectorAll("p")

  if (!won) {
    p[0].textContent = "You've lost"
  } else {
    p[0].textContent = "You've won"
  }

  boardContainer.append(p[0])
}
