// Logic

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function createBoard(tilesByTiles, mineQuantity) {
  const board = []

  const minePositions = getMinePositions(tilesByTiles, mineQuantity)

  for (let xAxis = 0; xAxis < tilesByTiles; xAxis++) {
    const row = []

    for (let yAxis = 0; yAxis < tilesByTiles; yAxis++) {
      const element = document.createElement("div")
      element.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        xAxis,
        yAxis,
        element,
        mine: true,
        get status() {
          return this.element.dataset.status
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

// Board > Row > Tile: all arrays but the tile which is an object

function minePositions(tilesByTiles, mineQuantity) {
  const positions = []

  while (positions.length < mineQuantity) {
    const position = {
      x: randomNumber(tilesByTiles),
      y: randomNumber(tilesByTiles),
    }

    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position)
    }
  }
}

function positionMatch(a, b) {
  return a.x === b.x && b.y === b.y
}

function randomNumber(tilesByTiles) {
  return Math.floor(Math.random() * tilesByTiles)
}
