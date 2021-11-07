export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

const headerContainer = document.querySelector(".subtext")
const gameResolutionContainer = document.querySelector(
  ".game-resolution-container"
)

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
  if (!tile.mine && tile.tileStatus != TILE_STATUSES.MARKED) {
    tile.tileStatus = TILE_STATUSES.NUMBER
  }

  let gameInitiation = JSON.parse(sessionStorage.getItem("initialClick"))

  if (gameInitiation) {
    scoreCounter(false)
  }

  const unminedTiles = boardInfo(boardLayout)

  if (!tile.mine) {
    gameEnd(!tile.mine, unminedTiles, boardLayout)
  } else {
    gameEnd(!tile.mine, unminedTiles, boardLayout)

    sessionStorage.setItem("mineActive", true)
  }

  sessionStorage.setItem("initialClick", false)
}

function gameEnd(safeTile, unminedTiles, boardLayout) {
  unminedTiles = boardInfo(boardLayout)

  if (safeTile) {
    if (unminedTiles.length === 0) {
      victory()
    }
  } else {
    defeat()
  }
}

function victory() {
  scoreCounter(true)

  sessionStorage.setItem("gameRunning", false)

  gameResolutionContainer.querySelector(".game-end-status").textContent = "Won"

  showGameResolution()
}

function defeat() {
  gameResolutionContainer.querySelector(".game-end-status").textContent = "Lost"

  showGameResolution()

  sessionStorage.setItem("gameRunning", false)
}

export function boardInfo(boardLayout) {
  const unminedTiles = []

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      if (!tile.mine) {
        if (
          tile.tileElement.dataset.status === TILE_STATUSES.HIDDEN ||
          tile.tileElement.dataset.status === TILE_STATUSES.MARKED
        ) {
          unminedTiles.push(tile)
        }
      }
    })
  })

  return unminedTiles
}

export function rightClickEvent(tile, MINE_QUANTITY, borderContainerElement) {
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

function showGameResolution() {
  gameResolutionContainer.classList.remove("game-resolution-hidden")
}

export function scoreCounter(gameEnd) {
  let gameStatus = JSON.parse(sessionStorage.getItem("gameRunning"))

  let initialClick = JSON.parse(sessionStorage.getItem("initialClick"))

  let scoreDecreasing

  if (initialClick || gameStatus) {
    let score = 1000

    sessionStorage.setItem("score", score)

    headerContainer.querySelector(".score").textContent = score

    scoreDecreasing = setInterval(() => {
      score -= 10

      sessionStorage.setItem("score", score)

      headerContainer.querySelector(".score").textContent = score
    }, 1000)

    sessionStorage.setItem("key", scoreDecreasing)

    if (gameEnd) {
      clearInterval(scoreDecreasing)
    }
  }
}
