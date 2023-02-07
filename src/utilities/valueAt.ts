import { Board, Field, outOfBounds, OutOfBoundsField, Position } from '../board'

export const valueAt = (
	board: Board,
	position: Position,
): Field | OutOfBoundsField => {
	const { x, y } = position
	if (x < 0 || x >= board.length) {
		return outOfBounds
	}
	if (y < 0 || y >= board.length) {
		return outOfBounds
	}
	return board[y][x]
}
