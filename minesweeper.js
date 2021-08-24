const board = document.querySelector(".board")

const tiles = []

for (let index = 0; index < 100; index++) {
  tiles.push(document.createElement("div"))
}

tiles.forEach((tile) => {
  board.append(tile)
})

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("board")) {
    e.target.classList.add()
  }
})
