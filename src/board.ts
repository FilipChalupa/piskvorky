import { findBestMove } from './utilities/findBestMove'
import { findWinner as findWinnerInternal } from './utilities/findWinner'
import { validateBoard } from './utilities/validateBoard'
import {
	Board,
	FlatBoard,
	PlayerO,
	PlayerX,
	Position,
	Winner,
} from './utilities/values'

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
