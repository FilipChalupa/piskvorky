const emptyFieldValues = [0, null, '', undefined] as const
const player1FieldValues = [1, 'A', 'O', 'a', 'o'] as const
const player2FieldValues = [2, 'B', 'X', 'b', 'x'] as const
const anyFieldValues = [
	...emptyFieldValues,
	...player1FieldValues,
	...player2FieldValues,
] as const
const emptyField = emptyFieldValues[0]
const player1Value = player1FieldValues[0]
const player2Value = player2FieldValues[0]
const tieValue = -1

type PermissiveEmptyField = (typeof emptyFieldValues)[number]
type PermissivePlayer1Field = (typeof player1FieldValues)[number]
type PermissivePlayer2Field = (typeof player2FieldValues)[number]

type EmptyField = typeof emptyField
type Player1Field = typeof player1Value
type Player2Field = typeof player2Value
type AnyPlayerField = Player1Field | Player2Field

type PermissiveField =
	| PermissiveEmptyField
	| PermissivePlayer1Field
	| PermissivePlayer2Field
type Field = EmptyField | Player1Field | Player2Field
type TieOfField = typeof tieValue | Field

type PermissiveBoard =
	| Readonly<PermissiveField[]>
	| Readonly<Readonly<PermissiveField[]>[]>
type Board = Readonly<Readonly<Field[]>[]>
type WorkingBoard = Field[][]

type Position = { x: number; y: number }

const validateBoard = (board: PermissiveBoard): Board => {
	let normalizedBoard = board as any[]
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
			row.every((field) => anyFieldValues.includes(field)),
		)
	) {
		throw new Error('Board contains invalid field values.')
	}
	return normalizedBoard as Board
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
	const value = board[y][x]
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

const findWinnerInternal = (board: Board): TieOfField => {
	let winner: Field = 0
	board.some((row, y) =>
		row.some((_, x) => {
			if (isWinningPosition(board, { x, y })) {
				winner = valueAt(board, { x, y })
				return true
			}
		}),
	)

	const tie = board.every((row, y) =>
		row.every((_, x) => valueAt(board, { x, y }) !== 0),
	)

	if (tie) {
		return -1
	}

	return winner
}

export const findWinner = (board: PermissiveBoard): TieOfField => {
	const validatedBoard = validateBoard(board)

	return findWinnerInternal(validatedBoard)
}

const getEmptyPositions = (board: Board): Position[] => {
	const emptyPositions: Position[] = []
	board.forEach((row, y) =>
		row.forEach((_, x) => {
			const position = { x, y }
			if (valueAt(board, position) === 0) {
				emptyPositions.push(position)
			}
		}),
	)
	return emptyPositions
}

const getEmptyAdjacentPositions = (board: Board): Position[] => {
	return getEmptyPositions(board).filter((position) =>
		[
			{ x: 0, y: 1 },
			{ x: 0, y: -1 },
			{ x: 1, y: 0 },
			{ x: -1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 1, y: -1 },
			{ x: -1, y: 1 },
			{ x: -1, y: -1 },
		].some((direction) => {
			const adjacentPosition = {
				x: position.x + direction.x,
				y: position.y + direction.y,
			}
			if (
				adjacentPosition.x < 0 ||
				adjacentPosition.x >= board.length ||
				adjacentPosition.y < 0 ||
				adjacentPosition.y >= board.length
			) {
				return false
			}
			return valueAt(board, adjacentPosition) !== emptyField
		}),
	)
}

const copyBoard = (board: Board): WorkingBoard => {
	return board.map((row) => [...row])
}

const otherPlayer = (player: AnyPlayerField): AnyPlayerField => {
	if (valueIsPlayer1(player)) {
		return player2Value
	}
	return player1Value
}

const getScore = (
	board: Board,
	player: AnyPlayerField,
	depth: number,
): number => {
	const winner = findWinnerInternal(board)
	if (winner === player) {
		return 100
	}
	if (winner === otherPlayer(player)) {
		return 0
	}
	if (winner === tieValue) {
		return 10
	}
	if (depth === 0) {
		return 40
	}
	const emptyPositions = getEmptyAdjacentPositions(board)
	return averageScore(
		emptyPositions
			.map((position) => {
				const boardWithMove = copyBoard(board)
				boardWithMove[position.y][position.x] = otherPlayer(player)
				const score = getScore(boardWithMove, player, 0)
				const winner = findWinnerInternal(boardWithMove)
				if (winner !== emptyField) {
					return score
				}
				return getBestMoves(boardWithMove, player, depth - 1).map(
					(move) => move.score,
				)
			})
			.flat(),
	)
}

const sortMovesByScore = (moves: Move[]): Move[] => {
	return moves.sort((a, b) => b.score - a.score)
}

const shuffle = <T>(array: T[]): T[] => array.sort(() => 0.5 - Math.random())

type Move = {
	position: Position
	score: number
}

const averageScore = (scores: number[]): number =>
	scores.length === 0
		? Number.NEGATIVE_INFINITY
		: scores.reduce((sum, score) => sum + score, 0) / scores.length

const getBestMoves = (
	board: Board,
	player: AnyPlayerField,
	depth: number,
): Move[] => {
	if (depth === 0) {
		return []
	}
	const emptyPositions = getEmptyAdjacentPositions(board)
	const moves: Move[] = emptyPositions.map((position) => {
		const boardWithMove = copyBoard(board)
		boardWithMove[position.y][position.x] = player
		return { position, score: getScore(boardWithMove, player, depth) }
	})
	return sortMovesByScore(shuffle(moves)).slice(0, 8)
}

const getBestMovePosition = (moves: Move[]): Position => {
	const bestScore = moves.reduce(
		(bestScore, move) => (move.score > bestScore ? move.score : bestScore),
		Number.NEGATIVE_INFINITY,
	)
	const bestMoves = moves.filter((move) => move.score === bestScore)
	return bestMoves[Math.floor(Math.random() * bestMoves.length)].position
}

const getCurrentPlayer = (board: Board): AnyPlayerField => {
	let player1Moves = 0
	let player2Moves = 0

	board.forEach((row) =>
		row.forEach((field) => {
			if (valueIsPlayer1(field)) {
				player1Moves++
			}
			if (valueIsPlayer2(field)) {
				player2Moves++
			}
		}),
	)

	if (player1Moves > player2Moves) {
		return player2Value
	}
	return player1Value
}

export const suggestNextMove = (board: PermissiveBoard): Position => {
	const validatedBoard = validateBoard(board)

	if (findWinnerInternal(validatedBoard) !== 0) {
		throw new Error('Game is already over.')
	}

	// Empty board
	if (
		validatedBoard.every((row) => row.every((field) => field === emptyField))
	) {
		const middle = Math.floor(validatedBoard.length / 2)
		return { x: middle, y: middle }
	}

	console.time('Execution Time')

	const currentPlayer = getCurrentPlayer(validatedBoard)
	const moves = getBestMoves(
		validatedBoard,
		currentPlayer,
		1 /* @TODO: increase this number without burning the CPU */,
	)
	const bestMove = getBestMovePosition(moves)

	console.timeEnd('Execution Time')

	return bestMove
}
