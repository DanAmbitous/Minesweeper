import { boardCreation } from "./minesweeper.js"

let BOARD_SIZE = 5

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

let board = boardCreation(BOARD_SIZE)

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.tileElement)
  })
})

document.addEventListener("input", (e) => {
  const tiles = Array.from(boardElement.children)

  tiles.forEach((tile) => {
    tile.remove()
  })

  BOARD_SIZE = e.target.value

  board = boardCreation(BOARD_SIZE)
  boardElement.style.setProperty("--size", BOARD_SIZE)

  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.tileElement)
    })
  })
})
