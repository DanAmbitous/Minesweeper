export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardCreation(boardSize, mineQuantity) {
  const board = []

  const minePositions = getMinePositions(boardSize, mineQuantity)

  for (let x = 0; x < boardSize; x++) {
    const row = []

    for (let y = 0; y < boardSize; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        tileElement,
        x,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        y,
        get status() {
          return this.element.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        },
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function tileRevealing(tile) {
  if (tile.tileElement.dataset.status === "hidden" && !tile.mine) {
    tile.tileElement.dataset.status = TILE_STATUSES.NUMBER
  }

  if (tile.mine) {
    tile.tileElement.dataset.status = TILE_STATUSES.MINE
    return
  }
}

export function tileMarking(e, mineNumberShower) {
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

function getMinePositions(boardSize, mineQuantity) {
  const positions = []

  while (positions.length < mineQuantity) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    }

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position)
    }
  }

  return positions
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y
}

function randomNumber(size) {
  return Math.floor(Math.random() * size)
}
