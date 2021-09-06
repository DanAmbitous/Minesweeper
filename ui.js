import { boardCreation, markTile, TILE_STATUSES } from "./minesweeper.js"

const mineRange = document.querySelector("#mine-range")
const minesLeft = document.querySelector("#mine-count")

let BOARD_SIZE = 5
let MINE_QUANTITY = 5

minesLeft.innerText = MINE_QUANTITY

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

let board = boardCreation(BOARD_SIZE, MINE_QUANTITY)

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.tileElement)

    tile.tileElement.addEventListener("click", () => {})
    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      markTile(tile)
      showMinesLeft()
    })
  })
})

document.addEventListener("input", (e) => {
  const tiles = Array.from(boardElement.children)

  tiles.forEach((tile) => {
    tile.remove()
  })

  BOARD_SIZE = e.target.value

  board = boardCreation(BOARD_SIZE, MINE_QUANTITY)
  boardElement.style.setProperty("--size", BOARD_SIZE)

  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {})
      tile.tileElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()

        markTile(tile)
        showMinesLeft()
      })
    })
  })
})

function showMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    )
  }, 0)

  minesLeft.innerText = MINE_QUANTITY - markedTilesCount

  console.log(markedTilesCount)
}
