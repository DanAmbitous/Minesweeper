import { boardPopulation } from "./minesweeper.js"

const borderContainerElement = document.querySelector(".board")

createBoard()
function createBoard() {
  let BOARD_DIMENSION = 5
  let MINE_QUANTITY = 5

  let boardLayout = boardPopulation(BOARD_DIMENSION, MINE_QUANTITY)

  borderContainerElement.style.setProperty("--size", BOARD_DIMENSION)

  boardLayout.forEach((row) => {
    row.forEach((tile) => {
      borderContainerElement.append(tile.tileElement)
    })
  })
}

const tiles = Array.from(borderContainerElement.children)

tiles.forEach((element) => {
  element.addEventListener("click", clickHandler)
  element.addEventListener("contextMenu", rightClickHandler)
})

function clickHandler() {
  console.log("clicked!")
}

function rightClickHandler(params) {
  console.log(`right clicked!`)
}
