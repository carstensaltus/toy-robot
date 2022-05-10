import { getState, updateState, defaultState, DIRECTION, generateGrid, getDirectionByDegree } from './state';

export const printHeading = (title: string = ''): void => {
  console.log(title);
  console.log('---------------------')
  console.log('')
}

export const report = () => {
  const state = getState();
  console.log(`${state.x},${state.y},${getDirectionByDegree(state.f)}`)
}

export const place = () => {
  printHeading('      Placing');
  updateState(defaultState);
  console.log(generateGrid(defaultState))
}

export const move = () => {
  printHeading('        Moved');

  const state = getState();

  switch (state.f) {
    case DIRECTION.NORTH: // up
      if (state.y > 0) {
        updateState({ ...state, y: state.y - 1 });
      }
      break;
    case DIRECTION.SOUTH: // down
      if (state.y < 4) {
        updateState({ ...state, y: state.y + 1 });
      }
      break;
    case DIRECTION.WEST: // left
      if (state.x > 0) {
        updateState({ ...state, x: state.x - 1 });
      }
      break;
    case DIRECTION.EAST: // right
      if (state.x < 4) {
        updateState({ ...state, x: state.x + 1 });
      }
      break;
  }

  console.log(generateGrid(getState()))
}

export const left = () => {
  printHeading('  Rotating 90° Left');

  const state = getState();
  const f = state.f === 0 ? 270 : state.f - 90;
  const newState = { ...state, f };
  updateState(newState);
  console.log(generateGrid(newState))
}

export const right = () => {
  printHeading('  Rotating 90° Right');

  const state = getState();
  const f = state.f === 270 ? 0 : state.f + 90
  const newState = { ...state, f };
  updateState(newState);
  console.log(generateGrid(newState))
}