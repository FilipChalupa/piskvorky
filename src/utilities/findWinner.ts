import {
	Board,
	empty,
	Field,
	outOfBounds,
	playerO,
	playerX,
	Position,
	Tie,
	tie,
	Winner,
} from '../board'
import { valueAt } from './valueAt'

const findWinnerInDirection = (
	board: Board,
	start: Position,
	direction: Position,
): Exclude<Winner, Tie> => {
	const symbolsToWin = Math.min(5, board.length)

	let currentPosition = start
	let count = 0
	let lastSymbol: Field = empty
	while (valueAt(board, currentPosition) !== outOfBounds) {
		const value = valueAt(board, currentPosition)
		if (value === outOfBounds) {
			return null
		}
		if (value === playerO || value === playerX) {
			if (value !== lastSymbol) {
				count = 0
			}
			count++
			if (count === symbolsToWin) {
				return value
			}
		}
		lastSymbol = value
		currentPosition = {
			x: currentPosition.x + direction.x,
			y: currentPosition.y + direction.y,
		}
	}
	return null
}

const rightDirection = { x: 1, y: 0 }
const downDirection = { x: 0, y: 1 }
const rightDownDirection = { x: 1, y: 1 }
const rightUpDirection = { x: 1, y: -1 }

export const findWinner = (board: Board): Winner => {
	for (let y = 0; y < board.length; y++) {
		const start = { x: 0, y }
		const winner = findWinnerInDirection(board, start, rightDirection)
		if (winner !== null) {
			return winner
		}
	}
	for (let x = 0; x < board.length; x++) {
		const start = { x, y: 0 }
		const winner = findWinnerInDirection(board, start, downDirection)
		if (winner !== null) {
			return winner
		}
	}
	for (let i = 0; i < board.length; i++) {
		const winner = [
			{ x: 0, y: i },
			{ x: i, y: 0 },
		]
			.map((start) => findWinnerInDirection(board, start, rightDownDirection))
			.find((winner) => winner !== null)
		if (winner !== null && winner !== undefined) {
			return winner
		}
	}
	for (let i = 0; i < board.length; i++) {
		const winner = [
			{ x: 0, y: i },
			{ x: i, y: board.length - 1 },
		]
			.map((start) => findWinnerInDirection(board, start, rightUpDirection))
			.find((winner) => winner !== null)
		if (winner !== null && winner !== undefined) {
			return winner
		}
	}

	const isTie = board.every((row, y) =>
		row.every((_, x) => valueAt(board, { x, y }) !== empty),
	)

	if (isTie) {
		return tie
	}

	return null
}
