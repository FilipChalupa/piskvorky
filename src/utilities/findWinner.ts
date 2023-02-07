import { Board, empty, playerO, playerX, Position, tie, Winner } from '../board'
import { valueAt } from './valueAt'

const isWinningPosition = (board: Board, position: Position): boolean => {
	const { x, y } = position
	const value = valueAt(board, position)

	if (value === empty) {
		return false
	}

	const boardSize = board.length
	const symbolsToWin = Math.min(5, board.length)

	let i: number

	let inRow = 1
	// Check left
	i = x
	while (i > 0 && value === valueAt(board, { x: i - 1, y })) {
		inRow++
		i--
	}

	// Check right
	i = x
	while (i < boardSize - 1 && value === valueAt(board, { x: i + 1, y })) {
		inRow++
		i++
	}

	if (inRow >= symbolsToWin) {
		return true
	}

	let inColumn = 1
	// Check up
	i = y
	while (i > 0 && value === valueAt(board, { x, y: i - 1 })) {
		inColumn++
		i--
	}

	// Check down
	i = y
	while (i < boardSize - 1 && value === valueAt(board, { x, y: i + 1 })) {
		inColumn++
		i++
	}

	if (inColumn >= symbolsToWin) {
		return true
	}

	// @TODO: check diagonals

	return false
}

export const findWinner = (board: Board): Winner => {
	let winner: Winner = null
	board.some((row, y) =>
		row.some((_, x) => {
			if (isWinningPosition(board, { x, y })) {
				const value = valueAt(board, { x, y })
				if (value === playerO) {
					winner = playerO
				} else if (value === playerX) {
					winner = playerX
				}
				return true
			}
		}),
	)

	const isTie = board.every((row, y) =>
		row.every((_, x) => valueAt(board, { x, y }) !== empty),
	)

	if (isTie) {
		return tie
	}

	return winner
}
