#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const fork = require('child_process').fork;

module.exports = (options, callback) => {
  options.out = options.out || 'ignore';
  options.err = options.err || 'ignore';
  options.detached = options.detached || false;
  callback = callback || (m => console.log(m));

  const parameters = ['-c', options.config, '--watch', '--testResultsProcessor', './src/jest-results-processor'];
  const runner = path.join(__dirname, 'jest-runner.js')
  const processor = path.join(__dirname, 'jest-results-processor.js')

  console.log('🛰 ', 'jest-observer: ON - jest running in background');

  const child = fork(runner, ['-c', options.config, '--watch', '--testResultsProcessor', processor], {
    detached: options.detached,
    stdio: [ 'ignore', options.out, options.err, 'ipc' ]
  });

  child.on('message', callback);
};
