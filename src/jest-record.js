#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

module.exports = (options, callback) => {
  options.out = options.out || 'ignore';
  options.err = options.err || 'ignore';
  options.detached = options.detached || false;
  callback = callback || (m => console.log('callback', m));

  const runner = path.join(__dirname, 'jest-runner.js')
  const processor = path.join(__dirname, 'jest-results-processor.js')
  const parameters = [runner, '--', '-c', options.config, '--watch', '--testResultsProcessor', processor];

  console.log('🛰 ', 'jest-observer: ON - jest running in background');

  const child = spawn('node', parameters, {
    detached: true,
    stdio: ['ignore', options.out, options.err, 'ipc']
  });

  child.on('message', callback);

  return child;
};
