//Display/UI

import {
  TITLE_STATUSES,
  createBoard,
  markTile,
  revealTile,
} from "./minesweeper.js"

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 5
let minesLeftDisplayer = document.querySelector("#mine-count")

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftDisplayer.innerText = NUMBER_OF_MINES
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener("click", (e) => {
      revealTile(board, tile)

      if (e.target.innerText === "" && e.target.dataset.status != "mine") {
        e.target.innerText = "0"
      }
    })
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      markTile(tile)
      listMinesRemaning()
    })
  })
})

function listMinesRemaning() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TITLE_STATUSES.MARKED).length
    )
  }, 0)

  if (NUMBER_OF_MINES - markedTilesCount > 0) {
    minesLeftDisplayer.innerText = NUMBER_OF_MINES - markedTilesCount
  } else {
    minesLeftDisplayer.innerText = 0
  }
}
