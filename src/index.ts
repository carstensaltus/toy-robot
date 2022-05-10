#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const program = require('commander');
import { place, report, move, left, right } from './service';

clear();

console.log(
  chalk.red(
    figlet.textSync('Toy-Robot', { horizontalLayout: 'full' })
  )
);

program
  .command('place')
  .alias('p')
  .description('PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.')
  .action(place)

program
  .command('move')
  .alias('m')
  .description('MOVE will move the toy robot one unit forward in the direction it is currently facing.')
  .action(move)

program
  .command('left')
  .alias('l')
  .description('LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
  .action(left)

program
  .command('right')
  .alias('r')
  .description('RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
  .action(right)

program
  .command('report')
  .description('REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.')
  .action(report)

program
  .version('0.0.1')
  .description("CLI for Toy Robot")
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
