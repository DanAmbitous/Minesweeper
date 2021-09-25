import { boardPopulation } from "./minesweeper.js"

const BOARD_DIMENSIONS = 5
const MINE_QUANTITY = 5

const boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_DIMENSIONS)

const boardCreation = boardPopulation(BOARD_DIMENSIONS, MINE_QUANTITY)

boardCreation.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.tileElement)
  })
})

console.log(boardCreation)

// import {
//   tileCreation,
//   tileRevealing,
//   tileMarking,
//   TILE_STATUSES,
// } from "./minesweeper.js"

// const BOARD_SIZE = 5
// const MINE_QUANTITY = 1

// const boardContainer = document.querySelector(".board")
// boardContainer.style.setProperty("--size", BOARD_SIZE)
// const mineQuantityIndicator = document.querySelector("#mine-count")
// mineQuantityIndicator.textContent = MINE_QUANTITY

// const board = tileCreation(BOARD_SIZE, MINE_QUANTITY)

// board.forEach((row) => {
//   row.forEach((tile) => {
//     boardContainer.append(tile.tileElement)

//     tile.tileElement.addEventListener("click", () => {
//       tileRevealing(tile, board, mineQuantityIndicator, boardContainer)
//       gameResolutionChecker(tile, board, mineQuantityIndicator, boardContainer)
//     })
//     tile.tileElement.addEventListener("contextmenu", (e) => {
//       e.preventDefault()

//       tileMarking(tile, board, mineQuantityIndicator)
//     })
//   })
// })

// function gameResolutionChecker(tile, board, mineQuantityIndicator) {
//   if (tile.status === "mine") {
//     mineQuantityIndicator.textContent = "Hit a mine!"

//     board.forEach((row) => {
//       row.forEach((tile) => {
//         if (tile.mine) {
//           tile.status = "mine"
//         }
//         console.log(tile.tileElement)
//         tile.tileElement.style.opacity = 0.5
//       })
//     })
//   } else {
//     const numberOfTiles = []
//     const numberTiles = []
//     const numberMinedTiles = []

//     board.forEach((row) => {
//       row.forEach((tile) => {
//         numberOfTiles.push(tile)

//         if (tile.mine) {
//           numberMinedTiles.push(tile)
//         }

//         if (tile.status === TILE_STATUSES.NUMBER) {
//           numberTiles.push(tile)
//         }
//       })
//     })

//     if (numberTiles.length + numberMinedTiles.length === numberOfTiles.length) {
//       mineQuantityIndicator.textContent = "Alegría has ganado"

//       numberMinedTiles.forEach((tile) => {
//         tile.status = TILE_STATUSES.MARKED
//       })
//     }
//   }
// }
