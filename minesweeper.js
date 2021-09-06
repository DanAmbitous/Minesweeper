const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardCreation(size, mineQuantity) {
  const board = []

  const minePositions = getMinePosition(size, mineQuantity)

  for (let x = 0; x < size; x++) {
    const row = []

    for (let y = 0; y < size; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        tileElement,
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.tileElement.dataset.status
        },
        set status(value) {
          this.tileElement.dataset.status = value
        },
      }

      if (tile.mine) {
        tile.tileElement.style.backgroundColor = "red"
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

function getMinePosition(boardSize, minesQuantity) {
  const positions = []

  while (positions.length < minesQuantity) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    }

    //Checking to make sure that the positions aren't a match
    if (!positions.some((p) => positionMatch(p, position))) {
      positions.push(position)
    }
  }

  return positions
}

function positionMatch(positionA, positionB) {
  return positionA.x === positionB.x && positionA.y === positionB.y
}

function randomNumber(size) {
  return Math.floor(Math.random() * size)
}
