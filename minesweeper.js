export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

const mineQuantityDisplayer = document.querySelector("#mine-count")
const boardElement = document.querySelector(".board")

export function boardTileCreation(DIMENSIONS, MINE_QUANTITY) {
  const board = []

  let minePositions = minePositionPicker(DIMENSIONS, MINE_QUANTITY)

  let numberifedMinePositions = []

  minePositions.forEach((positions) => {
    numberifedMinePositions.push(JSON.parse(positions))
  })

  for (let x = 0; x < DIMENSIONS; x++) {
    const row = []

    for (let y = 0; y < DIMENSIONS; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN
      tileElement.classList.add("tile")
      let mine = false

      numberifedMinePositions.forEach(
        ({ x: minePositionX, y: minePositionY }) => {
          if (minePositionX === x && minePositionY === y) {
            mine = true
          }
        }
      )

      const tile = {
        tileElement,
        x,
        y,
        mine,
        get status() {
          return this.tileElement.dataset.status
        },
        set status(status) {
          this.tileElement.dataset.status = status
        },
      }

      if (tile.mine) {
        tile.status = TILE_STATUSES.MINE
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function leftClick(tile, boardPopulating) {
  if (tile.status === TILE_STATUSES.HIDDEN) {
    if (tile.mine) {
      tile.status = TILE_STATUSES.MINE
    } else {
      tile.status = TILE_STATUSES.NUMBER

      const nearbyTiles = nearbyTilesInsight(tile, boardPopulating)
      const mineQuantity = surroundingMineCalculator(nearbyTiles)
      neighboringMineTeller(tile, mineQuantity)
    }
  }
}

function neighboringMineTeller(tile, mineQuantity) {
  tile.tileElement.innerText = mineQuantity
}

function nearbyTilesInsight(tile, boardPopulating) {
  const tilesOfTheBoard = []

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const neighboringTile = boardPopulating[tile.x + x]?.[tile.y + y]

      if (neighboringTile) {
        tilesOfTheBoard.push(neighboringTile)
      }
    }
  }

  return tilesOfTheBoard
}

function surroundingMineCalculator(nearbyTiles) {
  const mineDetectedTiles = []

  nearbyTiles.forEach((tile) => {
    console.log(tile.mine)
    if (tile.mine) {
      mineDetectedTiles.push(tile)
    }
  })

  return mineDetectedTiles.length
}

export function rightClick(tile, MINE_QUANTITY) {
  if (tile.status === TILE_STATUSES.MARKED) {
    tile.status = TILE_STATUSES.HIDDEN

    markedTileNumeration(MINE_QUANTITY)
  } else {
    tile.status = TILE_STATUSES.MARKED

    markedTileNumeration(MINE_QUANTITY)
  }
}

function minePositionPicker(DIMENSIONS, MINE_QUANTITY) {
  const minePositions = new Set()

  while (minePositions.size < MINE_QUANTITY) {
    const minePosition = {
      x: PositionPicker(DIMENSIONS),
      y: PositionPicker(DIMENSIONS),
    }

    minePositions.add(JSON.stringify(minePosition))
  }

  return minePositions
}

function PositionPicker(DIMENSIONS) {
  return Math.floor(Math.random() * DIMENSIONS)
}

function markedTileNumeration(MINE_QUANTITY) {
  const tiles = Array.from(boardElement.children)

  const markedTiles = []

  tiles.forEach((tile) => {
    if (tile.dataset.status === TILE_STATUSES.MARKED) {
      markedTiles.push(tile)
    }
  })

  mineQuantityDisplayer.textContent = Number(MINE_QUANTITY - markedTiles.length)
}

export function stateSetup(MINE_QUANTITY) {
  mineQuantityDisplayer.textContent = MINE_QUANTITY
}
