//All the states of the tiles to be used to alter the states of the tiles

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

//Creates the board structure as well as the indiviual tiles
export function populateBoard(boardDimensions, mineNumber) {
  const board = [] //The board itself, stores rows and tiles

  const minePositions = mineCreation(boardDimensions, mineNumber)
  const minePositionsClone = [...minePositions]
  minePositions[0] = { x: 12, y: 12 }
  console.log(minePositions, minePositionsClone)

  const match = minePositionsClone.filter((p) => minePositions.includes(p))
  console.log(match)
  for (let x = 0; x < boardDimensions; x++) {
    const rows = [] //Contains each row which contain tiles

    for (let y = 0; y < boardDimensions; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      // The individual tile itself
      const tile = {
        //The tile element itself
        tileElement,
        mine: true,
        //The x position starts from 0
        x,
        //The y position starts from 0
        y,
      }

      if (tile.mine) {
        tile.tileElement.dataset.status = TILE_STATUSES.MINE
      }

      rows.push(tile)
    }

    board.push(rows)
  }

  // Returns the board when filled out with rows and tiles to wherever

  return board
}

function mineCreation(boardDimensions, mineNumber) {
  const minePositions = []

  while (minePositions.length < mineNumber) {
    const position = {
      x: randomMinePosition(boardDimensions),
      y: randomMinePosition(boardDimensions),
    }

    if (!minePositions.some((p) => positionVerification(p, position))) {
      minePositions.push(position)
    }
  }

  return minePositions
}

function positionVerification(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y
}

function randomMinePosition(boardDimensions) {
  return Math.floor(Math.random() * boardDimensions)
}

// export const TILE_STATUSES = {
//   HIDDEN: "hidden",
//   MINE: "mine",
//   NUMBER: "number",
//   MARKED: "marked",
// }

// export function boardCreation(boardSize, mineQuantity) {
//   const board = []

//   const minePositions = getMinePositions(boardSize, mineQuantity)

//   for (let x = 0; x < boardSize; x++) {
//     const row = []

//     for (let y = 0; y < boardSize; y++) {
//       const tileElement = document.createElement("div")
//       tileElement.dataset.status = TILE_STATUSES.HIDDEN

//       const tile = {
//         tileElement,
//         x,
//         mine: minePositions.some(positionMatch.bind(null, { x, y })),
//         y,
//         get status() {
//           return this.element.tileElement.dataset.status
//         },
//         set status(value) {
//           this.element.dataset.status = value
//         },
//       }

//       row.push(tile)
//     }

//     board.push(row)
//   }

//   return board
// }

// export function tileRevealing(board, tile) {
//   if (tile.tileElement.dataset.status === "hidden" && !tile.mine) {
//     tile.tileElement.dataset.status = TILE_STATUSES.NUMBER
//   }

//   if (tile.mine) {
//     tile.tileElement.dataset.status = TILE_STATUSES.MINE
//     return
//   }

//   tile.tileElement.status = TILE_STATUSES.MINE
//   const adjacentTiles = nearbyTiles(board, tile)

//   const mines = adjacentTiles.filter((tile) => tile.mine)

//   if (mines.length === 0) {
//     adjacentTiles.forEach(tileRevealing.bind(null, board))
//   } else {
//     tile.tileElement.textContent = mines.length
//   }
// }

// export function tileMarking(e, mineNumberShower) {
//   if (e.target.dataset.status === TILE_STATUSES.HIDDEN) {
//     e.target.dataset.status = TILE_STATUSES.MARKED

//     mineNumberShower.innerText = Number(mineNumberShower.innerText) - 1
//   } else if (e.target.dataset.status === TILE_STATUSES.MARKED) {
//     mineNumberShower.innerText = Number(mineNumberShower.innerText) + 1

//     e.target.dataset.status = TILE_STATUSES.HIDDEN
//   }
// }

// export function mineCount(mineQuantity, mineNumberDisplayment) {
//   mineNumberDisplayment.innerText = mineQuantity
// }

// function getMinePositions(boardSize, mineQuantity) {
//   const positions = []

//   while (positions.length < mineQuantity) {
//     const position = {
//       x: randomNumber(boardSize),
//       y: randomNumber(boardSize),
//     }

//     if (!positions.some(positionMatch.bind(null, position))) {
//       positions.push(position)
//     }
//   }

//   return positions
// }

// function positionMatch(a, b) {
//   return a.x === b.x && a.y === b.y
// }

// function randomNumber(size) {
//   return Math.floor(Math.random() * size)
// }

// function nearbyTiles(board, { x, y }) {
//   const tiles = []

//   for (let xOffset = -1; xOffset < 1; xOffset++) {
//     for (let yOffset = -1; yOffset < 1; yOffset++) {
//       const tile = board[x + xOffset]?.[y + yOffset]

//       if (tile) tiles.push(tile)
//     }
//   }

//   return tiles
// }
