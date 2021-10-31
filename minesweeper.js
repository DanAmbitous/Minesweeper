export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardPopulation(BOARD_DIMENSION, MINE_QUANTITY) {
  const board = []

  for (let x = 0; x < BOARD_DIMENSION; x++) {
    const row = []

    for (let y = 0; y < BOARD_DIMENSION; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        x,
        y,
        tileElement,
        set tileStatus(value) {
          this.tileElement.dataset.status = value
        },
        get tileStatus() {
          return this.tileElement.dataset.status
        },
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function leftClickEvent() {
  console.log("Hello World")
}

export function rightClickEvent(e, tile) {
  e.preventDefault()

  tile.tileStatus = TILE_STATUSES.MARKED
}
