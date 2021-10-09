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

  for (let x = 0; x < DIMENSIONS; x++) {
    const row = []

    for (let y = 0; y < DIMENSIONS; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN
      tileElement.classList.add("tile")
      let mine

      console.log(minePositions)

      minePositions.forEach(({ x: minePositionX, y: minePositionY }) => {
        console.log(minePositionX, x)
        console.log(minePositionY, y)

        if (minePositionX === x && minePositionY === y) {
          mine = true
        }
      })

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

      console.log(tile.mine)

      if (tile.mine) {
        tile.status = TILE_STATUSES.MINE
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function leftClick(tile) {
  console.log(tile.status, TILE_STATUSES.MARKED)
  if (tile.status === TILE_STATUSES.HIDDEN) {
    if (tile.mine) {
      tile.status = TILE_STATUSES.MINE
    } else {
      tile.status = TILE_STATUSES.NUMBER
    }
  }
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
  const uniqueMinePositions = []

  while (uniqueMinePositions.length < MINE_QUANTITY) {
    const minePosition = {
      x: PositionPicker(DIMENSIONS),
      y: PositionPicker(DIMENSIONS),
    }

    if (!uniqueMinePositions.includes(minePosition)) {
      uniqueMinePositions.push(minePosition)
    }
  }

  return uniqueMinePositions
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
