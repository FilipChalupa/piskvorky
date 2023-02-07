import { findBestMove } from './utilities/findBestMove'
import { findWinner as findWinnerInternal } from './utilities/findWinner'
import { validateBoard } from './utilities/validateBoard'
export const playerO = 'o' as const
export const playerX = 'x' as const
export const empty = '_' as const

export const outOfBounds = 'out-of-bounds'
export const tie = 'tie'

export type PlayerO = typeof playerO
export type PlayerX = typeof playerX
export type Empty = typeof empty
export type OutOfBoundsField = typeof outOfBounds
export type Tie = typeof tie
export type Field = PlayerO | PlayerX | Empty
export type Board = Readonly<Readonly<Field[]>[]>
export type FlatBoard = Readonly<Field[]>
export type Winner = PlayerO | PlayerX | Tie | null
export type Position = { x: number; y: number }

export const findWinner = (board: Board | FlatBoard): Winner => {
	const validatedBoard = validateBoard(board)

	return findWinnerInternal(validatedBoard)
}

export const suggestNextMove = (
	board: Board | FlatBoard,
	player: PlayerO | PlayerX,
): Position => {
	const validatedBoard = validateBoard(board)

	const timerName = 'Suggest next move took'
	console.time(timerName)
	const bestMove = findBestMove(validatedBoard, player)
	console.timeEnd(timerName)

	return bestMove
}
