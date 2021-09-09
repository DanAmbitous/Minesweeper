export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function boardCreation(boardSize, mineQuantity) {
  const board = []

  const minePositions = getMinePositions(boardSize, mineQuantity)
  console.log(minePositions)
  for (let x = 0; x < boardSize; x++) {
    const row = []

    for (let y = 0; y < boardSize; y++) {
      const tileElement = document.createElement("div")
      tileElement.dataset.status = TILE_STATUSES.HIDDEN

      const tile = {
        tileElement,
        x,
        mine: true,
        y,
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function tileRevealing(e) {
  if (e.target.dataset.status === TILE_STATUSES.HIDDEN) {
    return (e.target.dataset.status = TILE_STATUSES.NUMBER)
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

    if (!positions.some((p) => positionMatch(p, position))) {
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
