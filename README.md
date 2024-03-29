# Piškvorky (tic-tac-toe) [![npm](https://img.shields.io/npm/v/piskvorky.svg)](https://www.npmjs.com/package/piskvorky) ![npm type definitions](https://img.shields.io/npm/types/piskvorky.svg)

Helper functions for tic-tac-toe game.

## Installation

```bash
npm install piskvorky
```

## Usage

### Functions

#### `findWinner`

Expects a 1D or 2D array of strings representing the board. Returns the winner (`'o'` or `'x'`), `'tie'` or `null` if there is no winner.

| Value   | Description              |
| ------- | ------------------------ |
| `'o'`   | player O                 |
| `'x'`   | player X                 |
| `'_'`   | empty field              |
|         |                          |
| `'tie'` | tie                      |
| `null`  | the game is not over yet |

#### `suggestNextMove`

Expects the board and current player (`'o'` or `'x'`). Returns a suggested move position calculated by a very sophisticated 🙃 AI.

---

### Package

```js
import { findWinner, suggestNextMove } from 'piskvorky'

const board = [
	['_', '_', 'o'],
	['x', 'o', 'o'],
	['x', 'x', 'o'],
]

const winner = findWinner(board) // the winner is player 'o'

const flatBoard = ['_', '_', 'o', 'x', 'o', 'o', 'x', 'x', 'o'] // same as board.flat()

const winnerOfFlatBoard = findWinner(flatBoard) // the winner is player 'o'

const nextMove = suggestNextMove([
	['o', 'x', 'o'],
	['_', 'o', 'x'],
	['x', 'o', 'x'],
]) // the next move is {x: 0, y: 1}
```

#### CDN

```js
import { findWinner, suggestNextMove } from 'https://unpkg.com/piskvorky@latest'
```

---

### Online api

#### Find winner

```js
const board = [
	['_', '_', 'o'],
	['x', 'o', 'o'],
	['x', 'x', 'o'],
]

const response = await fetch(
	'https://piskvorky.czechitas-podklady.cz/api/find-winner',
	{
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({ board }),
	},
)
const { winner, error } = await response.json()
console.log({ winner, error })
```

#### Suggest next move

```js
const response = await fetch(
	'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
	{
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify({
			board: [
				['_', '_', 'o'],
				['_', 'o', '_'],
				['_', 'x', 'x'],
			],
			player: 'o',
		}),
	},
)
const { position, error } = await response.json()
console.log({ position, error })
```
