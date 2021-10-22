import {
  boardTileCreation,
  leftClick,
  rightClick,
  stateSetup,
  TILE_STATUSES,
} from "./minesweeper.js"

let DIMENSIONS = 5
let MINE_QUANTITY = 1

let boardPopulating = boardTileCreation(DIMENSIONS, MINE_QUANTITY)

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", DIMENSIONS)

const boardSizeRange = document.querySelector("#board-size-range")
const mineQuantityRange = document.querySelector("#mine-quantity-range")

const restartButton = document.querySelector(".restart")

restartButton.addEventListener("click", restartGame)

tileAppendment()

const menuTemplate = document.querySelector("#menu")
const resultsContainer = document.querySelector(".results")

stateSetup(MINE_QUANTITY)

boardSizeRange.addEventListener("input", boardSizeControler)

function boardSizeControler() {
  DIMENSIONS = boardSizeRange.value
  boardContainer.style.setProperty("--size", DIMENSIONS)

  restartGame()

  test()
}

function test() {
  console.log(DIMENSIONS)
}

function clickFunctionalities(tile) {
  leftClick(tile, boardPopulating)

  gameOver(tile.mine, boardPopulating)
}

function gameOver(mine) {
  if (mine) {
    const boardElements = Array.from(boardContainer.children)

    boardElements.forEach((tile) => {
      tile.disabled = true
    })

    menu(false)
  } else {
    console.log("Victory")
    menu(true)
  }
}

restartGame()

function menu(won) {
  const clone = menuTemplate.content.cloneNode(true)
  const h3 = clone.querySelector(".title")
  const description = clone.querySelector(".description")
  const replayButton = clone.querySelector(".replay")
  description.textContent = "Would you like to retry?"

  const content = []

  if (!won) {
    h3.textContent = "You've lost the game!"

    content.push(h3, description, replayButton)

    content.forEach((element) => {
      resultsContainer.appendChild(element)
    })

    document.querySelector(".replay").addEventListener("click", restartGame)
  } else {
    const unrevealedTiles = []

    const tiles = Array.from(boardContainer.children)

    tiles.forEach((tile) => {
      if (tile.dataset.status === TILE_STATUSES.HIDDEN) {
        unrevealedTiles.push(tile)
      }
    })

    if (unrevealedTiles.length - MINE_QUANTITY === 0) {
      h3.textContent = "You've won the game!"
      content.push(h3, description, replayButton)

      content.forEach((element) => {
        resultsContainer.appendChild(element)
      })

      document.querySelector(".replay").addEventListener("click", restartGame)

      resultsContainer.classList.add("victory")
    }
  }
}

function restartGame() {
  const tiles = Array.from(boardContainer.children)

  tiles.forEach((tile) => {
    tile.remove()
  })

  boardPopulating = []

  boardPopulating = boardTileCreation(DIMENSIONS, MINE_QUANTITY)

  tileAppendment()

  resultsContainer.innerHTML = ""
  resultsContainer.classList.remove("victory")
}

function tileAppendment() {
  boardPopulating.forEach((row) => {
    row.forEach((tile) => {
      boardContainer.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () =>
        clickFunctionalities(tile)
      )

      tile.tileElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()

        rightClick(tile, MINE_QUANTITY)
      })
    })
  })
}
