# Piškvorky [![npm](https://img.shields.io/npm/v/piskvorky.svg)](https://www.npmjs.com/package/piskvorky) ![npm type definitions](https://img.shields.io/npm/types/piskvorky.svg)

## Installation

```bash
npm install piskvorky
```

## Usage

### Package

```js
import { findWinner, suggestNextMove } from 'piskvorky'

const board = [
	[0, 0, 1],
	[2, 1, 1],
	[2, 2, 1],
]

const winner = findWinner(board) // the winner is player 1

const flatBoard = [0, 0, 1, 2, 1, 1, 2, 2, 1] // same as board.flat()

const winnerOfFlatBoard = findWinner(flatBoard) // the winner is player 1

const nextMove = suggestNextMove([
	[1, 2, 1],
	[0, 1, 2],
	[2, 1, 2],
]) // the next move is {x: 0, y: 1}
```

#### CDN

```js
import { findWinner, suggestNextMove } from 'https://unpkg.com/piskvorky@latest'
```

### Online api

#### Find winner

```js
const board = [
	[0, 0, 1],
	[2, 1, 1],
	[2, 2, 1],
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
const { winner, error: winnerError } = await response.json()
console.log({ winner, winnerError })
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
				[0, 0, 1],
				[0, 1, 0],
				[0, 2, 2],
			],
		}),
	},
)
const { position, error: positionError } = await response.json()
console.log({ position, positionError })
```

## Values

- `1` - player 1
- `2` - player 2
- `0` - empty field, no winner
- `-1` - draw
