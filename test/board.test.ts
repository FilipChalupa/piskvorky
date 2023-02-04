import assert from 'assert'
import { findWinner } from './../src/board'

describe('Find winner', () => {
	describe('3x3', () => {
		it('should return 0', () => {
			const board = [
				[0, 0, 1],
				[2, 1, 2],
				[2, 2, 1],
			] as const
			assert.equal(findWinner(board), 0)
		})
	})
	describe('Flat', () => {
		it('should return 0', () => {
			const board = [0, 0, 1, 2, 1, 2, 2, 2, 1] as const
			assert.equal(findWinner(board), 0)
		})
	})
})
