export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardPopulation(BOARD_DIMENSION, MINE_QUANTITY) {
  const board = []

  let minePositions = minePositionDeterminer(BOARD_DIMENSION, MINE_QUANTITY)

  for (let x = 0; x < BOARD_DIMENSION; x++) {
    const row = []

    for (let y = 0; y < BOARD_DIMENSION; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      let mine = false

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
        tile.tileElement.style.backgroundColor = "red"
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

function minePositionDeterminer(BOARD_DIMENSION, MINE_QUANTITY) {
  const minePositions = []

  while (minePositions.length < MINE_QUANTITY) {
    const position = {
      x: randomPosition(BOARD_DIMENSION),
      y: randomPosition(BOARD_DIMENSION),
    }

    const isElementUnique = minePositions.some(
      (p) => p.x === position.x && p.y === position.y
    )

    if (!isElementUnique) {
      minePositions.push(position)
    }
  }

  return minePositions
}

function randomPosition(BOARD_DIMENSION) {
  return Number(Math.floor(Math.random() * BOARD_DIMENSION))
}

export function leftClickEvent(tile, boardLayout) {
  tile.tileStatus = TILE_STATUSES.NUMBER

  const unminedTiles = boardInfo(boardLayout)

  if (!tile.mine) {
    console.log(!tile.mine, tile.mine)
    gameEnd(!tile.mine, unminedTiles, boardLayout)
  } else {
    gameEnd(!tile.mine, unminedTiles, boardLayout)
  }
}

function gameEnd(safeTile, unminedTiles, boardLayout) {
  unminedTiles = boardInfo(boardLayout)
  console.log(safeTile)
  if (safeTile) {
    if (unminedTiles.length === 0) {
      console.log("victory")
    }
  } else {
    console.log("defeat")
  }
}

export function boardInfo(boardLayout) {
  const unminedTiles = []

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      if (!tile.mine) {
        if (tile.tileElement.dataset.status === TILE_STATUSES.HIDDEN) {
          unminedTiles.push(tile)
        }
      }
    })
  })

  return unminedTiles
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
