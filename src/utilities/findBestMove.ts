import { findWinner as findWinnerInternal } from './findWinner'
import { valueAt } from './valueAt'
import { Board, empty, PlayerO, PlayerX, Position } from './values'

export const findBestMove = (
	board: Board,
	player: PlayerO | PlayerX,
): Position => {
	if (findWinnerInternal(board) !== null) {
		throw new Error('Game is already over.')
	}

	// Empty board
	if (board.every((row) => row.every((field) => field === empty))) {
		const middle = Math.floor(board.length / 2)
		return { x: middle, y: middle }
	}

	while (true) {
		const x = Math.floor(Math.random() * board.length)
		const y = Math.floor(Math.random() * board.length)

		const position = { x, y }

		if (valueAt(board, position) === empty) {
			return position
		}
	}
}
