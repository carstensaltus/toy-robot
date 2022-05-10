import { getDirectionByDegree, getRandomDirection, defaultState, getCharacter, getGrid } from '../src/state';
import 'jest'

describe('getDirectionByDegree', () => {
  test('it should return ???? if passed an unknown direction', () => {
    expect(getDirectionByDegree(2)).toBe('???');
  });

  test('it should return NORTH if passed a direction of 0', () => {
    expect(getDirectionByDegree(0)).toBe('NORTH');
  });

  test('it should return EAST if passed a direction of 90', () => {
    expect(getDirectionByDegree(90)).toBe('EAST');
  });

  test('it should return SOUTH if passed a direction of 180', () => {
    expect(getDirectionByDegree(180)).toBe('SOUTH');
  });

  test('it should return WEST if passed a direction of 270', () => {
    expect(getDirectionByDegree(270)).toBe('WEST');
  });
})

describe('getRandomDirection', () => {
  test('it should return ???? if passed an unknown direction', () => {
    expect([0, 90, 180, 270]).toContain(getRandomDirection());
  });
})

describe('getCharacter', () => {
  test('it should return ^ for north', () => {
    expect(getCharacter(0)).toBe("^");
  });

  test('it should return > for east', () => {
    expect(getCharacter(90)).toBe(">");
  });

  test('it should return v for south', () => {
    expect(getCharacter(180)).toBe("v");
  });

  test('it should return < for west', () => {
    expect(getCharacter(270)).toBe("<");
  });
})

describe('getGrid', () => {
  test('get grid', () => {
    expect(getGrid({ x: 1, y: 1, f: 0 })).toEqual([[0, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
  });

  test('get grid', () => {
    expect(getGrid({ x: 3, y: 1, f: 0 })).toEqual([[0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
  });
})