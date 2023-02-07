import {
	Board,
	Field,
	OutOfBoundsField,
	outOfBoundsField,
	Position,
} from '../board'

export const valueAt = (
	board: Board,
	position: Position,
): Field | OutOfBoundsField => {
	const { x, y } = position
	if (x < 0 || x >= board.length) {
		return outOfBoundsField
	}
	if (y < 0 || y >= board.length) {
		return outOfBoundsField
	}
	return board[y][x]
}
