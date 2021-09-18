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
        mine: minePositions.some((arrayPosition) =>
          positionMatch(arrayPosition, { x, y })
        ),
        x,
        y,
        get status() {
          return this.tileElement.dataset.status
        },
        set status(value) {
          this.tileElement.dataset.status = value
        },
      }

      if (tile.mine) {
        tile.tileElement.style.background = "red"
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}

export function tileRevealing(tile, board) {
  if (tile.mine) {
    board.forEach((row) => {
      row.forEach((tile) => {
        tile.tileElement.style.backgroundColor = "red"
      })
    })
  }
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

const array = [1, 2, 3, 4, 5]

// console.log(array.some((number) => console.log(number)))
