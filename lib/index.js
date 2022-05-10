#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var program = require('commander');
var service_1 = require("./service");
clear();
console.log(chalk.red(figlet.textSync('Toy-Robot', { horizontalLayout: 'full' })));
program
    .command('place')
    .alias('p')
    .description('PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.')
    .action(service_1.place);
program
    .command('move')
    .alias('m')
    .description('MOVE will move the toy robot one unit forward in the direction it is currently facing.')
    .action(service_1.move);
program
    .command('left')
    .alias('l')
    .description('LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
    .action(service_1.left);
program
    .command('right')
    .alias('r')
    .description('RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
    .action(service_1.right);
program
    .command('report')
    .description('REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.')
    .action(service_1.report);
program
    .version('0.0.1')
    .description("CLI for Toy Robot")
    .parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
