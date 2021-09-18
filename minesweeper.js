export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function tileCreation(boardSize, numberOfMines) {
  const board = []

  const minePositions = createMineLocations(boardSize, numberOfMines)

  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        tileElement,
        x,
        y,
        mine: minePositions.some((arrayPosition) =>
          positionMatch(arrayPosition, { x, y })
        ),
        get status() {
          return this.tileElement.dataset.status
        },
        set status(value) {
          this.tileElement.dataset.status = value
        },
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function tileRevealing(tile, board) {
  if (tile.mine) {
    board.forEach((row) => {
      row.forEach((tile) => {
        tile.tileElement.style.backgroundColor = "red"
      })
    })
  }
}

export function tileMarking(tile, board, mineQuantityIndicator) {
  if (tile.tileElement.dataset.status === "hidden") {
    tile.tileElement.dataset.status = TILE_STATUSES.MARKED
  } else if (tile.tileElement.dataset.status === "marked") {
    tile.tileElement.dataset.status = TILE_STATUSES.HIDDEN
  }

  const markedTiles = []
  const minedTiles = []

  board.forEach((row) => {
    row.forEach((tile) => {
      if (tile.mine) {
        minedTiles.push(tile.tileElement)
      }

      if (tile.tileElement.dataset.status === "marked") {
        markedTiles.push(tile.tileElement)
      }
    })
  })

  mineQuantityIndicator.textContent = minedTiles.length - markedTiles.length
}

function createMineLocations(boardSize, numberOfMines) {
  const positions = []

  while (positions.length < numberOfMines) {
    const position = {
      x: randomPosition(boardSize),
      y: randomPosition(boardSize),
    }

    if (
      !positions.some((arrayPosition) => positionMatch(arrayPosition, position))
    ) {
      positions.push(position)
    }
  }

  return positions
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

function randomPosition(boardSize) {
  return Math.floor(Math.random() * boardSize)
}
