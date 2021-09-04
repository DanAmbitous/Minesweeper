//Display/UI

import {
  TITLE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./minesweeper.js"

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 3
let minesLeftDisplayer = document.querySelector("#mine-count")
const gameMessage = document.querySelector(".subtext")

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftDisplayer.innerText = NUMBER_OF_MINES
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element)
    tile.element.addEventListener("click", (e) => {
      revealTile(board, tile)
      checkGameStatus(board)
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

function checkGameStatus(board) {
  const win = checkWin(board)
  const lose = checkLose(board)

  if (win) {
    gameMessage.innerText = "You've won!"
  } else if (lose) {
    gameMessage.innerText = "You've lost!"

    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TITLE_STATUSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
      })
    })
  }

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true })
    boardElement.addEventListener("contextmenu", stopProp, { capture: true })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}
