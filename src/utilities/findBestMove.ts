import { findWinner as findWinnerInternal } from './findWinner'
import { valueAt } from './valueAt'
import {
	Board,
	empty,
	playerO,
	PlayerO,
	playerX,
	PlayerX,
	Position,
} from './values'

const adjacentDirections = [
	{ x: 0, y: 1 },
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: -1, y: 0 },
	{ x: 1, y: 1 },
	{ x: 1, y: -1 },
	{ x: -1, y: 1 },
	{ x: -1, y: -1 },
] as const

const countAdjacent = (
	board: Board,
	position: Position,
	player: PlayerO | PlayerX,
): number => {
	return adjacentDirections
		.map((direction) => {
			const value = valueAt(board, {
				x: position.x + direction.x,
				y: position.y + direction.y,
			})
			if (value === player) {
				return 1
			} else if (value === playerO || value === playerX) {
				return 0.9
			} else if (value === empty) {
				return 0.3
			}
			return 0
		})
		.reduce((a, b) => a + b, 0)
}

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

	const neighbours = board.flatMap((row, y) =>
		row.map((_, x) => {
			const position = { x, y }
			const value = valueAt(board, position)
			const count =
				value === empty
					? countAdjacent(board, position, player)
					: Number.NEGATIVE_INFINITY

			return { count, position }
		}),
	)
	const topCount = Math.max(...neighbours.map(({ count }) => count))
	const topPositions = neighbours.filter(({ count }) => count === topCount)

	return topPositions[Math.floor(Math.random() * topPositions.length)].position
}
