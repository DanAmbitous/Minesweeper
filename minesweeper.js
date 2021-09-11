export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardCreation(boardSize, mineQuantity) {
  const board = []

  const minePositions = getMinePositions(boardSize, mineQuantity)

  for (let x = 0; x < boardSize; x++) {
    const row = []

    for (let y = 0; y < boardSize; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        tileElement,
        x,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        y,
        get status() {
          return this.element.tileElement.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        },
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function tileRevealing(board, tile) {
  console.log(tile)
  if (tile.tileElement.dataset.status === "hidden" && !tile.mine) {
    tile.tileElement.dataset.status = TILE_STATUSES.NUMBER
  }

  if (tile.mine) {
    tile.tileElement.dataset.status = TILE_STATUSES.MINE
    return
  }

  tile.tileElement.status = TILE_STATUSES.MINE
  const adjacentNearbyTiles = nearbyTiles(board, tile)
}

export function tileMarking(e, mineNumberShower) {
  if (e.target.dataset.status === TILE_STATUSES.HIDDEN) {
    e.target.dataset.status = TILE_STATUSES.MARKED

    mineNumberShower.innerText = Number(mineNumberShower.innerText) - 1
  } else if (e.target.dataset.status === TILE_STATUSES.MARKED) {
    mineNumberShower.innerText = Number(mineNumberShower.innerText) + 1

    e.target.dataset.status = TILE_STATUSES.HIDDEN
  }
}

export function mineCount(mineQuantity, mineNumberDisplayment) {
  mineNumberDisplayment.innerText = mineQuantity
}

function getMinePositions(boardSize, mineQuantity) {
  const positions = []

  while (positions.length < mineQuantity) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    }

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position)
    }
  }

  return positions
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

function randomNumber(size) {
  return Math.floor(Math.random() * size)
}

function nearbyTiles(board, { x, y }) {
  const tiles = []
  for (let xOffset = -1; xOffset < 1; xOffset++) {
    console.log(xOffset)
    for (let yOffset = -1; yOffset < 1; yOffset++) {
      console.log(yOffset)
      const tile = board[x + xOffset][y + yOffset]

      tiles.push(tile)
    }
  }

  return tiles
}
