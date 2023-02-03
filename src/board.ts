const emptyFieldValues = [0, null, '', undefined] as const
const player1FieldValues = [1, 'A', 'O', 'a', 'o'] as const
const player2FieldValues = [2, 'B', 'X', 'b', 'x'] as const
const anyFieldValues = [
	...emptyFieldValues,
	...player1FieldValues,
	...player2FieldValues,
] as const

type PermissiveEmptyField = (typeof emptyFieldValues)[number]
type PermissivePlayer1Field = (typeof player1FieldValues)[number]
type PermissivePlayer2Field = (typeof player2FieldValues)[number]

type EmptyField = (typeof emptyFieldValues)[0]
type Player1Field = (typeof player1FieldValues)[0]
type Player2Field = (typeof player2FieldValues)[0]

type PermissiveField =
	| PermissiveEmptyField
	| PermissivePlayer1Field
	| PermissivePlayer2Field
type Field = EmptyField | Player1Field | Player2Field

type PermissiveBoard = PermissiveField[][]
type Board = Field[][]

type Position = { x: number; y: number }

const validateBoard = (board: PermissiveBoard): Board => {
	if (!Array.isArray(board)) {
		throw new Error('Board is not an array.')
	}
	if (board.length < 3) {
		throw new Error('Board has too few columns.')
	}
	if (!board.every((row) => Array.isArray(row))) {
		throw new Error('Board rows must be arrays.')
	}
	if (!board.every((row) => row.length === board.length)) {
		throw new Error('Board must have same number of rows and columns.')
	}
	if (
		!board.every((row) => row.every((field) => anyFieldValues.includes(field)))
	) {
		throw new Error('Board contains invalid field values.')
	}
	return board as Board
}

const valueIsEmpty = (value: PermissiveField) =>
	emptyFieldValues.includes(value as any)
const valueIsPlayer1 = (value: PermissiveField) =>
	player1FieldValues.includes(value as any)
const valueIsPlayer2 = (value: PermissiveField) =>
	player2FieldValues.includes(value as any)

// const createBoardHelper = <V>(size: number, initialValue: V) =>
// 	new Array(size)
// 		.fill(null)
// 		.map(() => new Array(size).fill(null).map(() => initialValue))

const valueAt = (board: Board, position: Position): Field => {
	const { x, y } = position
	if (x < 0 || x >= board.length) {
		throw new Error('Position x is out of bounds.')
	}
	if (y < 0 || y >= board.length) {
		throw new Error('Position y is out of bounds.')
	}
	const value = board[x][y]
	if (valueIsPlayer1(value)) {
		return 1
	}
	if (valueIsPlayer2(value)) {
		return 2
	}
	return 0
}

const isWinningPosition = (board: Board, position: Position): boolean => {
	const { x, y } = position
	const value = valueAt(board, position)

	if (valueIsEmpty(value)) {
		return false
	}

	const boardSize = board.length
	const symbolsToWin = 5

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

export const findWinner = (board: PermissiveBoard): Field => {
	const validatedBoard = validateBoard(board)

	let winner: Field = 0
	board.some((row, x) =>
		row.some((_, y) => {
			if (isWinningPosition(validatedBoard, { x, y })) {
				console.log('winner', { x, y })
				winner = valueAt(validatedBoard, { x, y })
				return true
			}
		}),
	)

	return winner
}
export const suggestNextMove = (board: PermissiveBoard): Position => {
	const validatedBoard = validateBoard(board)

	return {
		x: 1,
		y: 2,
	}
}
