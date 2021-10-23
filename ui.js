import {
  boardTileCreation,
  leftClick,
  rightClick,
  stateSetup,
  TILE_STATUSES,
} from "./minesweeper.js"

const boardSizeRange = document.querySelector("#board-size-range")
const mineQuantityRange = document.querySelector("#mine-quantity-range")

let DIMENSIONS = boardSizeRange.value
let MINE_QUANTITY = mineQuantityRange.value

let boardPopulating = boardTileCreation(DIMENSIONS, MINE_QUANTITY)

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", DIMENSIONS)

const restartButton = document.querySelector(".restart")

restartButton.addEventListener("click", restartGame)

tileAppendment()

const menuTemplate = document.querySelector("#menu")
const resultsContainer = document.querySelector(".results")

stateSetup(MINE_QUANTITY)

boardSizeRange.addEventListener("input", boardSizeControler)
mineQuantityRange.addEventListener("input", mineQuantityControler)

function boardSizeControler() {
  DIMENSIONS = boardSizeRange.value
  boardContainer.style.setProperty("--size", DIMENSIONS)

  const totalTiles = Array.from(boardContainer.children)
  console.log(totalTiles)

  let minimumMines = minimumMinesCalculator(totalTiles)
  let maximumMines = maximumMinesCalculator(totalTiles)

  console.log(totalTiles.length, minimumMines, maximumMines)

  restartGame()
}

function minimumMinesCalculator(totalTiles) {
  return Math.round(
    (totalTiles.length * (totalTiles.length / 4)) / totalTiles.length
  )
}

function maximumMinesCalculator(totalTiles) {
  return Math.round(
    (totalTiles.length * (totalTiles.length / 2)) / totalTiles.length
  )
}

function mineRangeAdjuster() {
  // mineQuantityRange.
  // console.log("ran")
  // console.log(boardSizeRange.value, mineQuantityRange.value)
  // lastMax = mineQuantityRange.max
  // mineQuantityRange.min = boardSizeRange.value
  // mineQuantityRange.max = Number(boardSizeRange.value * 5)
  // console.log(mineQuantityRange.max, lastMax)
  // if (mineQuantityRange.max < lastMax) {
  //   console.log("happened")
  //   mineQuantityRange.value = boardSizeRange.min
  // }
}

function mineQuantityControler() {
  MINE_QUANTITY = mineQuantityRange.value
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

// restartGame()

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
