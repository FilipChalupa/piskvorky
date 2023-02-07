import { Board, empty, FlatBoard, playerO, playerX } from '../board'

export const validateBoard = (board: Board | FlatBoard): Board => {
	let normalizedBoard = board as unknown[]
	if (!Array.isArray(normalizedBoard)) {
		throw new Error('Board is not an array.')
	}
	if (normalizedBoard.some((row) => !Array.isArray(row))) {
		const size = Math.sqrt(normalizedBoard.length)
		if (!Number.isInteger(size)) {
			throw new Error('Board has invalid number of fields.')
		}
		normalizedBoard = new Array(size)
			.fill(null)
			.map((_, i) => normalizedBoard.slice(i * size, (i + 1) * size))
	}
	if (normalizedBoard.length < 3) {
		throw new Error('Board has too few columns.')
	}
	if (!normalizedBoard.every((row) => Array.isArray(row))) {
		throw new Error('Board rows must be arrays.')
	}
	if (!normalizedBoard.every((row) => row.length === normalizedBoard.length)) {
		throw new Error('Board must have same number of rows and columns.')
	}
	if (
		!normalizedBoard.every((row) =>
			row.every(
				(field: unknown) =>
					field === playerO || field === playerX || field === empty,
			),
		)
	) {
		throw new Error('Board contains invalid field values.')
	}
	return normalizedBoard as Board
}
