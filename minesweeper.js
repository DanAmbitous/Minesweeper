export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardPopulation(boardDimensions, mineQuantity) {
  const board = []

  const minedTiles = mineLocation(boardDimensions, mineQuantity)

  for (let x = 0; x < boardDimensions; x++) {
    const row = []

    for (let y = 0; y < boardDimensions; y++) {
      const tileElement = document.createElement("div")
      tileElement.setAttribute("class", "tile")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      let mine = false

      minedTiles.forEach((position) => {
        if (position.x === x && position.y === y) {
          mine = true
        }
      })

      const tile = {
        x,
        y,
        mine,
        tileElement,
        get status() {
          return this.tileElement.dataset.status
        },
        set status(condition) {
          console.log(condition)
          this.tileElement.dataset.status = condition
        },
      }

      row.push(tile)
    }

    board.push(row)
  }

  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.mine) {
        tile.tileElement.style.backgroundColor = "red"
      }
    })
  })

  return board
}

export function tileRevealing(tile, board) {
  console.log(tile.status)
  if (tile.status === TILE_STATUSES.HIDDEN) {
    if (tile.mine) {
      console.log("Hit a mine")
    } else {
      tile.status = TILE_STATUSES.NUMBER

      mineDistanceCalculation(tile, board)
    }
  }
}

function mineDistanceCalculation(tile, board) {
  const neighbouringTiles = []

  for (let x = -1; x < 1; x++) {
    for (let y = -1; y < 1; y++) {
      const neighbouringTile = board[x + 1]?.[y + 1]

      neighbouringTiles.push(neighbouringTile)
    }
  }

  console.log(neighbouringTiles)
}

function mineLocation(boardDimensions, mineQuantity) {
  const minePositions = []

  while (minePositions.length < mineQuantity) {
    const minePosition = {
      x: randomMineLocation(boardDimensions),
      y: randomMineLocation(boardDimensions),
    }

    const result = mineLocationUniquenessVerifer(minePosition, minePositions)

    if (!result) {
      minePositions.push(minePosition)
    }
  }
  return minePositions
}

function randomMineLocation(boardDimensions) {
  return Math.floor(Math.random() * boardDimensions)
}

function mineLocationUniquenessVerifer(minePosition, minePositions) {
  minePositions.forEach((locationSet) => {
    if (locationSet.x === minePosition.x || locationSet.y === locationSet.y) {
      return
    }
  })
}

// export const TILE_STATUSES = {
//   HIDDEN: "hidden",
//   MINE: "mine",
//   NUMBER: "number",
//   MARKED: "marked",
// }

// export function tileCreation(boardSize, numberOfMines) {
//   const board = []

//   const minePositions = createMineLocations(boardSize, numberOfMines)

//   for (let x = 0; x < boardSize; x++) {
//     const row = []
//     for (let y = 0; y < boardSize; y++) {
//       const tileElement = document.createElement("div")
//       tileElement.dataset.status = TILE_STATUSES.HIDDEN

//       const tile = {
//         tileElement,
//         x,
//         y,
//         mine: minePositions.some((arrayPosition) =>
//           positionMatch(arrayPosition, { x, y })
//         ),
//         get status() {
//           return this.tileElement.dataset.status
//         },
//         set status(value) {
//           this.tileElement.dataset.status = value
//         },
//       }

//       row.push(tile)
//     }

//     board.push(row)
//   }

//   return board
// }

// export function tileRevealing(
//   tile,
//   board,
//   mineQuantityIndicator,
//   boardContainer
// ) {
//   if (tile.status != "hidden") {
//     return
//   }

//   if (tile.mine) {
//     tile.status = TILE_STATUSES.MINE

//     boardContainer.style.pointerEvents = "none"
//   } else {
//     tile.status = TILE_STATUSES.NUMBER

//     const nearbyTiles = []
//     const numberOfMinedTiles = []

//     for (let xOffset = -1; xOffset <= 1; xOffset++) {
//       for (let yOffset = -1; yOffset <= 1; yOffset++) {
//         nearbyTiles.push(board[tile.x + xOffset]?.[tile.y + yOffset])
//       }
//     }

//     nearbyTiles.forEach((tile) => {
//       if (tile != undefined) {
//         if (tile.mine) {
//           numberOfMinedTiles.push(tile)
//         }
//       }
//     })

//     if (numberOfMinedTiles.length === 0) {
//       nearbyTiles.forEach((tile) => {
//         if (tile != null) {
//           tileRevealing(tile, board, mineQuantityIndicator)
//         }
//       })
//     } else {
//       tile.tileElement.textContent = numberOfMinedTiles.length
//     }
//   }
// }

// export function tileMarking(tile, board, mineQuantityIndicator) {
//   if (tile.status === "hidden") {
//     tile.status = TILE_STATUSES.MARKED
//   } else if (tile.status === "marked") {
//     tile.status = TILE_STATUSES.HIDDEN
//   }

//   const markedTiles = []
//   const minedTiles = []

//   board.forEach((row) => {
//     row.forEach((tile) => {
//       if (tile.mine) {
//         minedTiles.push(tile.tileElement)
//       }

//       if (tile.tileElement.dataset.status === "marked") {
//         markedTiles.push(tile.tileElement)
//       }
//     })
//   })

//   mineQuantityIndicator.textContent = minedTiles.length - markedTiles.length
// }

// function createMineLocations(boardSize, numberOfMines) {
//   const positions = []

//   while (positions.length < numberOfMines) {
//     const position = {
//       x: randomPosition(boardSize),
//       y: randomPosition(boardSize),
//     }

//     if (
//       !positions.some((arrayPosition) => positionMatch(arrayPosition, position))
//     ) {
//       positions.push(position)
//     }
//   }

//   return positions
// }

// function positionMatch(a, b) {
//   return a.x === b.x && a.y === b.y
// }

// function randomPosition(boardSize) {
//   return Math.floor(Math.random() * boardSize)
// }
