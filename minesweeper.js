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

export function tileRevealing(tile, board, mineQuantityIndicator) {
  if (tile.status != "hidden") {
    return
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE
  } else {
    tile.status = TILE_STATUSES.NUMBER

    const nearbyTiles = []
    const numberOfMinedTiles = []

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      for (let yOffset = -1; yOffset <= 1; yOffset++) {
        nearbyTiles.push(board[tile.x + xOffset]?.[tile.y + yOffset])
      }
    }

    nearbyTiles.forEach((tile) => {
      if (tile != undefined) {
        if (tile.mine) {
          numberOfMinedTiles.push(tile)
        }
      }
    })

    if (numberOfMinedTiles.length === 0) {
      nearbyTiles.forEach((tile) => {
        if (tile != null) {
          tileRevealing(tile, board, mineQuantityIndicator)
        }
      })
    } else {
      tile.tileElement.textContent = numberOfMinedTiles.length
    }
  }

  gameResolutionChecker(tile, board, mineQuantityIndicator)
}

export function tileMarking(tile, board, mineQuantityIndicator) {
  if (tile.status === "hidden") {
    tile.status = TILE_STATUSES.MARKED
  } else if (tile.status === "marked") {
    tile.status = TILE_STATUSES.HIDDEN
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

function gameResolutionChecker(tile, board, mineQuantityIndicator) {
  if (tile.status === "mine") {
    mineQuantityIndicator.textContent = "Hit a mine!"

    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.mine) {
          tile.status = "mine"
        }
      })
    })
  } else {
    const numberOfTiles = []
    const numberTiles = []
    const numberMinedTiles = []

    board.forEach((row) => {
      row.forEach((tile) => {
        numberOfTiles.push(tile)

        if (tile.mine) {
          numberMinedTiles.push(tile)
        }

        if (tile.status === TILE_STATUSES.NUMBER) {
          numberTiles.push(tile)
        }
      })
    })

    console.log(numberTiles.length + numberMinedTiles.length)

    if (numberTiles.length + numberMinedTiles.length === numberOfTiles.length) {
      mineQuantityIndicator.textContent = "Alegría has ganado"

      numberMinedTiles.forEach((tile) => {
        tile.status = TILE_STATUSES.MARKED
      })
    }
  }
}
