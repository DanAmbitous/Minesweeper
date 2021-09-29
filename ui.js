import { boardPopulation, tileRevealing, tileMarking } from "./minesweeper.js"

let boardSizeRange = document.querySelector("#board-size-range")
let mineQuantityRange = document.querySelector("#mine-quantity-range")

let BOARD_DIMENSIONS = Number(boardSizeRange.value)
let MINE_QUANTITY = 5

let boardElement = document.querySelector(".board")
boardElement.style.setProperty("--size", BOARD_DIMENSIONS)

let statusInformer = document.querySelector(".subtext")
let mineQuantityInsight = document.querySelector("#mine-count")
mineQuantityInsight.textContent = MINE_QUANTITY
let replayContainer = document.querySelector(".game-redo-option")
let boardCreation = boardPopulation(BOARD_DIMENSIONS, MINE_QUANTITY)
let boardSizeIndicator = document.querySelector(".board-size")
let mineQuantity = document.querySelector(".mine-quantity")

mineQuantity.max = BOARD_DIMENSIONS

boardSizeIndicator.textContent = `${BOARD_DIMENSIONS}x${BOARD_DIMENSIONS}`
mineQuantity.textContent = MINE_QUANTITY

boardCreation.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.tileElement)

    tile.tileElement.addEventListener("click", () => {
      tileRevealing(
        tile,
        boardCreation,
        boardElement,
        statusInformer,
        MINE_QUANTITY,
        replayContainer
      )
    })

    tile.tileElement.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      tileMarking(tile, boardCreation, mineQuantityInsight, MINE_QUANTITY)
    })
  })
})

replayContainer
  .querySelector(".affirmative-button")
  .addEventListener("click", gameRedo)

function gameRedo() {
  location.reload()
}

boardSizeRange.addEventListener("input", (e) => {
  BOARD_DIMENSIONS = boardSizeRange.value

  const tiles = Array.from(boardElement.children)

  tiles.forEach((tile) => tile.remove())

  boardCreation = boardPopulation(BOARD_DIMENSIONS, MINE_QUANTITY)
  boardElement.style.setProperty("--size", BOARD_DIMENSIONS)

  boardCreation.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {
        tileRevealing(
          tile,
          boardCreation,
          boardElement,
          statusInformer,
          MINE_QUANTITY,
          replayContainer
        )
      })

      tile.tileElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()

        tileMarking(tile, boardCreation, mineQuantityInsight, MINE_QUANTITY)
      })
    })
  })

  // let numberOfMines = []
  // let BOARD_DIMENSIONS = Number(boardSizeRange.value)
  // MINE_QUANTITY = mineQuantityRange.value
  // let boardElement = document.querySelector(".board")
  // boardElement.style.setProperty("--size", BOARD_DIMENSIONS)
  // const tiles = Array.from(boardElement.children)
  // tiles.forEach((tile) => {
  //   if (tile.mine) {
  //     numberOfMines.push(tile)
  //   }
  // })
  // let currentTiles = Array.from(boardElement.children)
  // currentTiles.forEach((tile) => {
  //   tile.remove()
  // })
  // let boardCreation = boardPopulation(BOARD_DIMENSIONS, MINE_QUANTITY)
  // boardSizeIndicator.textContent = `${BOARD_DIMENSIONS}x${BOARD_DIMENSIONS}`
  // boardCreation.forEach((row) => {
  //   row.forEach((tile) => {
  //     boardElement.append(tile.tileElement)
  //     tile.tileElement.addEventListener("click", () => {
  //       tileRevealing(
  //         tile,
  //         boardCreation,
  //         boardElement,
  //         statusInformer,
  //         MINE_QUANTITY,
  //         replayContainer
  //       )
  //     })
  //     tile.tileElement.addEventListener("contextmenu", (e) => {
  //       e.preventDefault()
  //       tileMarking(tile, boardCreation, mineQuantityInsight, MINE_QUANTITY)
  //     })
  //   })
  // })
})

mineQuantityRange.addEventListener("input", (e) => {
  MINE_QUANTITY = Number(mineQuantityRange.value)

  mineQuantity.textContent = MINE_QUANTITY

  const tiles = Array.from(boardElement.children)

  tiles.forEach((tile) => tile.remove())

  boardCreation = boardPopulation(BOARD_DIMENSIONS, MINE_QUANTITY)
  boardElement.style.setProperty("--size", BOARD_DIMENSIONS)

  boardCreation.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.tileElement)

      tile.tileElement.addEventListener("click", () => {
        tileRevealing(
          tile,
          boardCreation,
          boardElement,
          statusInformer,
          MINE_QUANTITY,
          replayContainer
        )
      })

      tile.tileElement.addEventListener("contextmenu", (e) => {
        e.preventDefault()

        tileMarking(tile, boardCreation, mineQuantityInsight, MINE_QUANTITY)
      })
    })
  })
})

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
//     let numberOfTiles = []
//     let numberTiles = []
//     let numberMinedTiles = []

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
