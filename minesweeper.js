// Logic

function createBoard(tilesByTiles, mineQuantity) {
  const board = []

  for (let xAxis = 0; xAxis < tilesByTiles; xAxis++) {
    const row = []

    for (let yAxis = 0; yAxis < tilesByTiles; yAxis++) {
      const tile = {
        x,
        y,
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

// Board > Row > Tile: all arrays but the tile which is an object
