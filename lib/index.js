#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var program = require('commander');
var state_1 = require("./state");
clear();
console.log(chalk.red(figlet.textSync('Toy-Robot', { horizontalLayout: 'full' })));
program
    .version('0.0.1')
    .description("CLI for Toy Robot")
    .option('-p, --place', 'PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.')
    .option('-m, --move', 'MOVE will move the toy robot one unit forward in the direction it is currently facing.')
    .option('-l, --left', 'LEFT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
    .option('-r, --right', 'RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.')
    .option('--report', 'REPORT will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.')
    .parse(process.argv);
var options = program.opts();
var printHeading = function (title) {
    if (title === void 0) { title = ''; }
    console.log(title);
    console.log('---------------------');
    console.log('');
};
if (options.left) {
    printHeading('  Rotating 90° Left');
    var state = (0, state_1.getState)();
    var f = state.f === 0 ? 270 : state.f - 90;
    var newState = __assign(__assign({}, state), { f: f });
    (0, state_1.updateState)(newState);
    console.log((0, state_1.generateGrid)(newState));
}
if (options.right) {
    printHeading('  Rotating 90° Right');
    var state = (0, state_1.getState)();
    var f = state.f === 270 ? 0 : state.f + 90;
    var newState = __assign(__assign({}, state), { f: f });
    (0, state_1.updateState)(newState);
    console.log((0, state_1.generateGrid)(newState));
}
if (options.place) {
    printHeading('      Placing');
    (0, state_1.updateState)(state_1.defaultState);
    console.log((0, state_1.generateGrid)(state_1.defaultState));
}
if (options.move) {
    printHeading('        Moved');
    var state = (0, state_1.getState)();
    switch (state.f) {
        case state_1.DIRECTION.NORTH:
            if (state.y > 0) {
                (0, state_1.updateState)(__assign(__assign({}, state), { y: state.y - 1 }));
            }
            break;
        case state_1.DIRECTION.SOUTH:
            if (state.y < 4) {
                (0, state_1.updateState)(__assign(__assign({}, state), { y: state.y + 1 }));
            }
            break;
        case state_1.DIRECTION.WEST:
            if (state.x > 0) {
                (0, state_1.updateState)(__assign(__assign({}, state), { x: state.x - 1 }));
            }
            break;
        case state_1.DIRECTION.EAST:
            if (state.x < 4) {
                (0, state_1.updateState)(__assign(__assign({}, state), { x: state.x + 1 }));
            }
            break;
    }
    console.log((0, state_1.generateGrid)((0, state_1.getState)()));
}
if (options.report) {
    printHeading('       Report');
    var state = (0, state_1.getState)();
    console.log((0, state_1.generateGrid)((0, state_1.getState)()));
    console.log("X = ".concat(state.x, "     Y = ").concat(state.y, "     F = ").concat((0, state_1.getDirectionByDegree)(state.f)));
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
