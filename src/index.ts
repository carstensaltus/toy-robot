#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');
import { getState, updateState, defaultState, DIRECTION, generateGrid, getDirectionByDegree } from './state';

clear();
console.log(
  chalk.red(
    figlet.textSync('Toy-Robot', { horizontalLayout: 'full' })
  )
);

program
  .version('0.0.1')
  .description("CLI for Toy Robot")
  .option('-p, --place', 'PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.')
  .option('-m, --move', 'MOVE will move the toy robot one unit forward in the direction it is currently facing.')
  .option('-l, --left', 'LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
  .option('-r, --right', 'RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
  .option('--report', 'REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.')
  .parse(process.argv);

const options = program.opts();

const printHeading = (title: string = ''): void => {
  console.log(title);
  console.log('---------------------')
  console.log('')
}

if (options.left) {
  printHeading('  Rotating 90° Left');

  const state = getState();
  const f = state.f === 0 ? 270 : state.f - 90;
  const newState = { ...state, f };
  updateState(newState);
  console.log(generateGrid(newState))
}

if (options.right) {
  printHeading('  Rotating 90° Right');

  const state = getState();
  const f = state.f === 270 ? 0 : state.f + 90
  const newState = { ...state, f };
  updateState(newState);
  console.log(generateGrid(newState))
}

if (options.place) {
  printHeading('      Placing');

  updateState(defaultState);
  console.log(generateGrid(defaultState))
}

if (options.move) {
  printHeading('        Moved');

  const state = getState();

  switch (state.f) {
    case DIRECTION.NORTH:
      if (state.y > 0) {
        updateState({ ...state, y: state.y - 1 });
      }
      break;
    case DIRECTION.SOUTH:
      if (state.y < 4) {
        updateState({ ...state, y: state.y + 1 });
      }
      break;
    case DIRECTION.WEST:
      if (state.x > 0) {
        updateState({ ...state, x: state.x - 1 });
      }
      break;
    case DIRECTION.EAST:
      if (state.x < 4) {
        updateState({ ...state, x: state.x + 1 });
      }
      break;
  }

  console.log(generateGrid(getState()))
}

if (options.report) {
  printHeading('       Report');

  const state = getState();
  console.log(generateGrid(getState()))
  console.log(`X = ${state.x}     Y = ${state.y}     F = ${getDirectionByDegree(state.f)}`);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
