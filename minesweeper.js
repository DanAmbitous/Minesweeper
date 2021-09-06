export function boardCreation(size) {
  const board = []

  for (let x = 0; x < size; x++) {
    const row = []

    for (let y = 0; y < size; y++) {
      const tileElement = document.createElement("div")

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
