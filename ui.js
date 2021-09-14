import { populateBoard, tileMarking, tileRevealing } from "./minesweeper.js"

const BOARD_SIZE = 5
const MINE_NUMBER = 5

const boardContainer = document.querySelector(".board")
boardContainer.style.setProperty("--size", BOARD_SIZE)
const minesLeftIndicator = document.querySelector("#mine-count")
minesLeftIndicator.textContent = MINE_NUMBER

const board = populateBoard(BOARD_SIZE, MINE_NUMBER)

boardRealization()
function boardRealization() {
  board.forEach((row) => {
    row.forEach((tile) => {
      tile.tileElement.addEventListener("click", (e) => {
        tileRevealing(e, minesLeftIndicator, MINE_NUMBER)
      })
      tile.tileElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()

        tileMarking(e, minesLeftIndicator, MINE_NUMBER)
      })

      boardContainer.append(tile.tileElement)
    })
  })
}

// import {
//   boardCreation,
//   tileMarking,
//   mineCount,
//   tileRevealing,
// } from "./minesweeper.js"

// const BOARD_SIZE = 5
// const MINE_QUANTITY = 10

// const boardContainer = document.querySelector(".board")
// boardContainer.style.setProperty("--size", BOARD_SIZE)

// const mineQuantityDisplayer = document.querySelector("#mine-count")

// const board = boardCreation(BOARD_SIZE, MINE_QUANTITY)

// board.forEach((row) => {
//   row.forEach((tile) => {
//     boardContainer.append(tile.tileElement)

//     tile.tileElement.addEventListener("click", () => {
//       tileRevealing(board, tile)
//     })
//     tile.tileElement.addEventListener("contextmenu", (e) => {
//       e.preventDefault()

//       tileMarking(e, mineQuantityDisplayer)
//     })
//   })
// })

// mineCount(MINE_QUANTITY, mineQuantityDisplayer)
