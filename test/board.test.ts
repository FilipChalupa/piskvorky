import assert from 'assert'
import { findWinner, suggestNextMove } from './../src/board'

describe('Find winner', () => {
	describe('3x3', () => {
		it('should return 0', () => {
			const board = [
				[0, 0, 1],
				[0, 1, 2],
				[2, 2, 1],
			] as const
			assert.equal(findWinner(board), 0)
		})
		it('should return 1', () => {
			const board = [
				[2, 2, 0],
				[2, 1, 0],
				[1, 1, 1],
			] as const
			assert.equal(findWinner(board), 1)
		})
		it('should return 2', () => {
			const board = [
				[1, 1, 0],
				[1, 2, 0],
				[2, 2, 2],
			] as const
			assert.equal(findWinner(board), 2)
		})
		it('should return -1', () => {
			const board = [
				[2, 1, 1],
				[1, 1, 2],
				[2, 2, 1],
			] as const
			assert.equal(findWinner(board), -1)
		})
		it('should return next move position', () => {
			const board = [
				[2, 2, 0],
				[2, 1, 1],
				[1, 1, 0],
			] as const
			const nextMove = suggestNextMove(board)
			assert.equal(nextMove.x, 2)
			assert.ok([0, 2].includes(nextMove.y))
		})
	})
	describe('Flat', () => {
		it('should return 0', () => {
			const board = [0, 0, 1, 0, 1, 2, 2, 2, 1] as const
			assert.equal(findWinner(board), 0)
		})
	})
})
