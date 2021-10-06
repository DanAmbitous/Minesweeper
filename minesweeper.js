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

  for (let x = 0; x < DIMENSIONS; x++) {
    const row = []

    for (let y = 0; y < DIMENSIONS; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN
      tileElement.classList.add("tile")

      const tile = {
        tileElement,
        x,
        y,
        get status() {
          return this.tileElement.dataset.status
        },
        set status(status) {
          this.tileElement.dataset.status = status
        },
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function leftClick() {
  console.log("hi")
}

export function rightClick(tile, MINE_QUANTITY) {
  tile.status = TILE_STATUSES.MARKED

  const numberOfMarkedTiles = markedTileNumeration()

  mineQuantityDisplayer.textContent = Number(
    MINE_QUANTITY - numberOfMarkedTiles.length
  )
}

function markedTileNumeration() {
  const tiles = Array.from(boardElement.children)

  const markedTiles = []

  tiles.forEach((tile) => {
    if (tile.dataset.status === TILE_STATUSES.MARKED) {
      markedTiles.push(tile)
    }
  })

  return markedTiles
}

export function stateSetup(MINE_QUANTITY) {
  mineQuantityDisplayer.textContent = MINE_QUANTITY
}
