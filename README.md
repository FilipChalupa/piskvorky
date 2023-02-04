# Piškvorky [![npm](https://img.shields.io/npm/v/piskvorky.svg)](https://www.npmjs.com/package/piskvorky) ![npm type definitions](https://img.shields.io/npm/types/piskvorky.svg)

## Installation

```bash
npm install piskvorky
```

## Usage

```js
import { findWinner } from 'piskvorky'

const board = [
	[0, 0, 1],
	[2, 1, 1],
	[2, 2, 1],
]

const winner = findWinner(board) // the winner is player 1

const flatBoard = [0, 0, 1, 2, 1, 1, 2, 2, 1] // same as board.flat()

const winnerOfFlatBoard = findWinner(flatBoard) // the winner is player 1
```

## Values

- `1` - player 1
- `2` - player 2
- `0` - empty field, no winner
- `-1` - draw
