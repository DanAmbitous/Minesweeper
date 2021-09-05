// Logic

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function createBoard(tilesByTiles, mineQuantity) {
  const board = []

  for (let xAxis = 0; xAxis < tilesByTiles; xAxis++) {
    const row = []

    for (let yAxis = 0; yAxis < tilesByTiles; yAxis++) {
      const element = document.createElement("div")
      element.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        xAxis,
        yAxis,
        element,
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

// Board > Row > Tile: all arrays but the tile which is an object
