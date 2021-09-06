import { boardCreation } from "./minesweeper.js"

const mineRange = document.querySelector("#mine-range")

let BOARD_SIZE = 5
let MINE_QUANTITY = 3

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_SIZE)

let board = boardCreation(BOARD_SIZE, MINE_QUANTITY)
console.log(board)
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

  board = boardCreation(BOARD_SIZE, MINE_QUANTITY)
  boardElement.style.setProperty("--size", BOARD_SIZE)

  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.tileElement)
    })
  })

  mineRange.max = BOARD_SIZE
})
