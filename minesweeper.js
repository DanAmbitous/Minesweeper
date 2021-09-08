export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardCreation(boardSize, mineQuantity) {
  const board = []

  for (let x = 0; x < boardSize; x++) {
    const row = []

    for (let y = 0; y < boardSize; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        tileElement,
        x,
        y,
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function tileMarking(e, mineQuantity, mineNumberShower) {
  if (e.target.dataset.status === TILE_STATUSES.HIDDEN) {
    e.target.dataset.status = TILE_STATUSES.MARKED

    mineNumberShower.innerText = Number(mineNumberShower.innerText) - 1
  } else if (e.target.dataset.status === TILE_STATUSES.MARKED) {
    mineNumberShower.innerText = Number(mineNumberShower.innerText) + 1

    e.target.dataset.status = TILE_STATUSES.HIDDEN
  }
}

export function mineCount(mineQuantity, mineNumberDisplayment) {
  mineNumberDisplayment.innerText = mineQuantity
}
