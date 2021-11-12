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
        tile.tileStatus = TILE_STATUSES.MINE
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
  let gameInitiation = JSON.parse(sessionStorage.getItem("initialClick"))

  //tile and boardLayout corrector
  if (!tile.tileElement) {
    let tileThatsBoardLayout = tile
    let boardLayoutThatsTile = boardLayout

    tile = boardLayoutThatsTile
    boardLayout = tileThatsBoardLayout
  }

  if (!tile.mine && tile.tileStatus === TILE_STATUSES.HIDDEN) {
    tile.tileStatus = TILE_STATUSES.NUMBER

    if (gameInitiation) {
      scoreMangement(false)
    }

    const neighbouringTiles = nearbyTiles(tile, boardLayout)
    const minedTiles = neighbouringTiles.filter((t) => t.mine)

    if (minedTiles.length === 0) {
      //The tile gets automatically added as the third parameter
      neighbouringTiles.forEach(leftClickEvent.bind(null, boardLayout))

      // neighbouringTiles.forEach((tile) => {
      //   leftClickEvent(tile, boardLayout)
      // })
    } else {
      tile.tileElement.textContent = minedTiles.length
    }

    // const hiddenTiles = scoreControler(boardLayout)

    // if (hiddenTiles.length === 0) {
    //   console.log("hi")
    //   const intervalIdentifier = sessionStorage.getItem("scoreCounter")
    //   console.log(intervalIdentifier)
    //   clearInterval(intervalIdentifier)
    // }
  }

  // const unminedTiles = boardInfo(boardLayout, tile)

  if (!tile.mine) {
    gameEnd(!tile.mine, boardLayout)
  } else {
    gameEnd(!tile.mine, boardLayout)

    sessionStorage.setItem("mineActive", true)
  }

  sessionStorage.setItem("initialClick", false)
}

function gameEnd(safeTile, boardLayout) {
  let unminedTiles = boardInfo(boardLayout)

  if (safeTile) {
    if (unminedTiles.length === 0) {
      victory()
    }
  } else {
    defeat()
  }
}

function victory() {
  scoreMangement(false)

  sessionStorage.setItem("gameRunning", false)

  gameResolutionContainer.querySelector(".game-end-status").textContent = "Won"

  showGameResolution()
}

function defeat() {
  scoreMangement(true)

  sessionStorage.setItem("gameRunning", false)

  gameResolutionContainer.querySelector(".game-end-status").textContent = "Lost"
  gameResolutionContainer
    .querySelector(".score-taken")
    .querySelector(".score-information-content").textContent = "Try Again?"

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

export function scoreMangement(mine) {
  const initialClick = JSON.parse(sessionStorage.getItem("initialClick"))
  const scoreCounter = JSON.parse(sessionStorage.getItem("scoreCounter"))
  const score = JSON.parse(sessionStorage.getItem("score"))

  clearInterval(scoreCounter)

  if (!mine) {
    if (initialClick) {
      let score = 1000

      scoreTellerAssigner(score)

      let scoreDecreasing = setInterval(() => {
        score -= 10

        sessionStorage.setItem("score", Number(score))

        scoreTellerAssigner(score)
      }, 1000)

      sessionStorage.setItem("scoreCounter", scoreDecreasing)
    }

    scoreAssigner(score)
  } else {
    scoreAssigner(score)
  }
}

function scoreAssigner(score) {
  gameResolutionContainer.querySelector(".score-played").textContent = score
}

function scoreTellerAssigner(score) {
  headerContainer.querySelector(".score").textContent = score
}

function nearbyTiles(tile, board) {
  const tiles = []

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const neighbouringTile = board[tile.x + xOffset]?.[tile.y + yOffset]

      if (neighbouringTile) {
        tiles.push(neighbouringTile)
      }
    }
  }

  return tiles
}

function scoreControler(boardLayout) {
  const hiddenTiles = []

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      if (
        tile.tileStatus === TILE_STATUSES.HIDDEN &&
        tile.tileStatus !== TILE_STATUSES.MINE
      )
        hiddenTiles.push(tile)
    })
  })

  return hiddenTiles
}
