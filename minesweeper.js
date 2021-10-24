export function boardCreation(boardDimension, mineQuantity) {
  const board = []

  for (let x = 0; x < boardDimension; x++) {
    const row = []

    for (let y = 0; y < boardDimension; y++) {
      const tile = {
        x,
        y,
      }

      row.push(tile)
    }

    board.push(row)
  }

  return board
}
