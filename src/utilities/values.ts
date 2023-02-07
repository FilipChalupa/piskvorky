export const playerO = 'o' as const
export const playerX = 'x' as const
export const empty = '_' as const

export const outOfBounds = 'out-of-bounds'
export const tie = 'tie'

export type PlayerO = typeof playerO
export type PlayerX = typeof playerX
export type Empty = typeof empty
export type OutOfBoundsField = typeof outOfBounds
export type Tie = typeof tie
export type Field = PlayerO | PlayerX | Empty
export type Board = Readonly<Readonly<Field[]>[]>
export type FlatBoard = Readonly<Field[]>
export type Winner = PlayerO | PlayerX | Tie | null
export type Position = { x: number; y: number }
