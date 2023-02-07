import assert from 'assert'
import { findWinner, suggestNextMove } from '../src/board'

const _ = '_' as const
const o = 'o' as const
const x = 'x' as const

describe('Find winner', () => {
	describe('3x3', () => {
		it('should return null', () => {
			const board = [
				[_, _, o],
				[_, o, x],
				[x, x, o],
			] as const
			assert.equal(findWinner(board), null)
		})
		it('should return o', () => {
			const board = [
				[x, x, _],
				[x, o, _],
				[o, o, o],
			] as const
			assert.equal(findWinner(board), o)
		})
		it('should return x', () => {
			const board = [
				[o, o, _],
				[o, x, _],
				[x, x, x],
			] as const
			assert.equal(findWinner(board), x)
		})
		it('should return tie', () => {
			const board = [
				[x, o, o],
				[o, o, x],
				[x, x, o],
			] as const
			assert.equal(findWinner(board), 'tie')
		})
		it('should return next move position', () => {
			const board = [
				[x, x, _],
				[x, o, o],
				[o, o, _],
			] as const
			const nextMove = suggestNextMove(board, x)
			assert.equal(nextMove.x, 2)
			assert.ok([0, 2].includes(nextMove.y))
		})
	})
	describe('Flat', () => {
		it('should return null', () => {
			const board = [_, _, o, _, o, x, x, x, o] as const
			assert.equal(findWinner(board), null)
		})
	})
})
