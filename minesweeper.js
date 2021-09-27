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

export function tileRevealing(
  tile,
  board,
  boardElement,
  statusInformer,
  MINE_QUANTITY,
  replayContainer
) {
  if (tile.status === TILE_STATUSES.HIDDEN) {
    if (tile.mine) {
      tile.status = TILE_STATUSES.MINE

      gameResolution(
        tile,
        board,
        statusInformer,
        boardElement,
        MINE_QUANTITY,
        replayContainer
      )
    } else {
      tile.status = TILE_STATUSES.NUMBER

      mineDistanceCalculation(tile, board)
      gameResolution(
        tile,
        board,
        statusInformer,
        boardElement,
        MINE_QUANTITY,
        replayContainer
      )
    }
  }
}

export function tileMarking(tile, board, mineQuantityInsight, MINE_QUANTITY) {
  const markedTiles = []

  if (tile.status === TILE_STATUSES.HIDDEN) {
    tile.status = TILE_STATUSES.MARKED
  } else if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN
  }

  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.status === TILE_STATUSES.MARKED) {
        markedTiles.push(tile)
      }
    })
  })

  mineQuantityInsight.textContent = Number(MINE_QUANTITY - markedTiles.length)

  console.log(markedTiles)
}

function mineDistanceCalculation(tile, board) {
  const neighbouringTiles = []
  const surroundingMines = []

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const neighbouringTile = board[tile.x + x]?.[tile.y + y]

      if (neighbouringTile != null) {
        neighbouringTiles.push(neighbouringTile)
      }
    }
  }

  neighbouringTiles.forEach((tile) => {
    if (tile.mine) {
      surroundingMines.push(tile)
    }
  })

  tile.tileElement.textContent = surroundingMines.length
}

function gameResolution(
  tile,
  board,
  statusInformer,
  boardElement,
  MINE_QUANTITY,
  replayContainer
) {
  if (tile.mine) {
    boardElement.classList.add("defeat")

    statusInformer.textContent = "You've hit a mine!"

    replayContainer.classList.remove("off")
  } else {
    const tiles = boardElement.children.length
    const unminedTiles = Number(tiles - MINE_QUANTITY)
    const revealedTiles = []
    console.log(tile.status)
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.NUMBER && !tile.mine) {
          revealedTiles.push(tile)
        }
      })
    })

    console.log(revealedTiles.length, tiles, unminedTiles)

    if (revealedTiles.length + unminedTiles === tiles) {
      statusInformer.textContent = "Victory!"
      boardElement.classList.add("victory")

      replayContainer.classList.remove("off")
    }
  }
}

function mineLocation(boardDimensions, mineQuantity) {
  const minePositions = []

  while (minePositions.length < mineQuantity) {
    const minePosition = {
      x: randomMineLocation(boardDimensions),
      y: randomMineLocation(boardDimensions),
    }

    const result = mineLocationUniquenessVerifer(minePosition, minePositions)
    console.log(result)
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
  let notUnique = false

  minePositions.forEach((locationSet) => {
    if (locationSet.x === minePosition.x && locationSet.y === locationSet.y) {
      notUnique = true
      return notUnique
    }
    return notUnique
  })
  return notUnique
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
