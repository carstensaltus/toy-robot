import { existsSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { State, Grid } from './types'

const filename = path.join(__dirname, 'state.json');

export const DIRECTION: Record<string, number> = {
  NORTH: 0,
  EAST: 90,
  SOUTH: 180,
  WEST: 270,
}

export const getDirectionByDegree = (degree: number): string => {
  const keys = Object.keys(DIRECTION);

  for (let i = 0; i < keys.length; i++) {
    if (DIRECTION[keys[i]] === degree) {
      return keys[i];
    }
  }

  return '???'
}

export const getRandomDirection = (): number => DIRECTION[Object.keys(DIRECTION).sort(() => 0.5 - Math.random())[0]]

export const defaultState: State = { x: 0, y: 0, f: getRandomDirection() }

export const updateState = (state: State) => writeFileSync(filename, JSON.stringify(state))

export const getState = (): State => {
  try {
    if (!existsSync(filename)) {
      updateState(defaultState)
    }

    return JSON.parse(readFileSync(filename).toString())
  } catch (err) {
    console.error(err)
    return defaultState
  }
}

export const getGrid = (state: State): Grid => {
  let grid: Grid = [];

  for (let row = 0; row < 5; row++) {
    const r: number[] = [];
    for (let col = 0; col < 5; col++) {
      r.push(state.x === row && state.y === col ? 1 : 0)
    }
    grid.push(r);
  }

  return grid;
}

const getCharacter = (characterDirection: number): string => {
  switch (characterDirection) {
    case DIRECTION.NORTH:
      return "^"
    case DIRECTION.EAST:
      return ">"
    case DIRECTION.SOUTH:
      return "v"
    case DIRECTION.WEST:
      return "<"
    default:
      return "?"
  }
}

export const generateGrid = (state: State): string => {
  const grid = getGrid(state);

  return grid.map((r, row) => {
    return r.map((c, col) => {
      return `| ${state.x === col && state.y === row ? getCharacter(state.f) : ' '} `
    }).join("") + "|\n"
  }).join("") + "\n"
}

