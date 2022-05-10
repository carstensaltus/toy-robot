import { place, left } from '../src/service';
import { getState } from '../src/state';
import 'jest'

describe('getDirectionByDegree', () => {
  test('place', () => {
    place()
    const state = getState();
    expect(state).toEqual(expect.objectContaining({ x: 0, y: 0 }))
    expect([0, 90, 180, 270]).toContain(state.f)
  })
})
