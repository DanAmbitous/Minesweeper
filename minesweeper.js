export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardPopulation(BOARD_DIMENSION, MINE_QUANTITY) {
  const board = []

  const minePositions = minePositionDeterminer(BOARD_DIMENSION, MINE_QUANTITY)

  console.log(minePositions)

  for (let x = 0; x < BOARD_DIMENSION; x++) {
    const row = []

    for (let y = 0; y < BOARD_DIMENSION; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      let mine = undefined

      minePositions.forEach((position) => {
        if (position.x === x && position.y === y) {
          mine = true
        }
      })

      const tile = {
        x,
        y,
        mine,
        tileElement,
        set tileStatus(value) {
          this.tileElement.dataset.status = value
        },
        get tileStatus() {
          return this.tileElement.dataset.status
        },
      }

      if (tile.mine) {
        tile.tileStatus = TILE_STATUSES.MINE
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function minePositionDeterminer(BOARD_DIMENSION, MINE_QUANTITY) {
  const minePositions = []

  while (minePositions.length < MINE_QUANTITY) {
    const position = {
      x: randomPosition(BOARD_DIMENSION),
      y: randomPosition(BOARD_DIMENSION),
    }

    const unique = positionUniquenessVerifer(minePositions, position)
    console.log(unique)
    if (unique) {
      console.log("hi")
      minePositions.push(position)
    } else {
      minePositionDeterminer(BOARD_DIMENSION, MINE_QUANTITY)
    }
  }

  return minePositions
}

function positionUniquenessVerifer(minePositions, position) {
  if (minePositions.length <= 0) {
    minePositions.forEach((minePosition) => {
      if (minePosition.x === position.x && minePosition.y === position.y) {
        return false
      }
    })
  } else {
    return true
  }
}

function randomPosition(BOARD_DIMENSION) {
  return Number(Math.floor(Math.random() * BOARD_DIMENSION))
}

export function leftClickEvent(tile, MINE_QUANTITY) {
  if (tile.tileStatus === TILE_STATUSES.HIDDEN) {
    if (tile.mine) {
      console.log("defeat")
    } else {
      console.log("victory")
    }
  }
}

export function rightClickEvent(
  e,
  tile,
  MINE_QUANTITY,
  borderContainerElement
) {
  e.preventDefault()

  const markedTiles = []

  const tiles = Array.from(borderContainerElement.children)

  if (
    tile.tileStatus === TILE_STATUSES.HIDDEN ||
    tile.tileStatus === TILE_STATUSES.MARKED
  ) {
    if (tile.tileStatus === TILE_STATUSES.HIDDEN) {
      tile.tileStatus = TILE_STATUSES.MARKED

      tiles.forEach((tile) => {
        if (tile.dataset.status === TILE_STATUSES.MARKED) {
          markedTiles.push(tile)
        }
      })

      console.log(markedTiles)

      return MINE_QUANTITY - markedTiles.length
    } else {
      tile.tileStatus = TILE_STATUSES.HIDDEN

      tiles.forEach((tile) => {
        if (tile.dataset.status === TILE_STATUSES.MARKED) {
          markedTiles.push(tile)
        }
      })

      return MINE_QUANTITY - markedTiles.length
    }
  }
}
