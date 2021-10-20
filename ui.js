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
const resultsContainer = document.querySelector(".results")

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
    menu(true)
  }

  document.querySelector(".replay").addEventListener("click", replay)
}

function replay() {
  restartGame()
}

function menu(won) {
  const clone = menuTemplate.content.cloneNode(true)
  const h3 = clone.querySelector(".title")
  const description = clone.querySelector(".description")
  const replayButton = clone.querySelector(".replay")

  const content = []

  if (!won) {
    h3.textContent = "You've lost"
    description.textContent = "Would you like to retry?"

    content.push(h3, description, replayButton)

    content.forEach((element) => {
      resultsContainer.appendChild(element)
    })
  } else {
    h3.textContent = "You've won"
  }
}

menu(false)

function restartGame() {
  const tiles = Array.from(boardContainer.children)

  tiles.forEach((tile) => {
    tile.remove()
  })
}
