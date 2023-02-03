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
	[2, 1, 2],
	[2, 2, 1],
]

const winner = findWinner(board) // the winner is player 1
```
