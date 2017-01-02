#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const pty = require('pty.js');
const ipc = require('node-ipc');

module.exports = (options, callback) => {
  options.out = options.out || 'ignore';
  options.err = options.err || 'ignore';
  callback = callback || (m => console.log(m));

  const processor = path.join(__dirname, 'jest-results-processor.js')
  const runner = path.join(__dirname, 'jest-runner.js');

  const parameters = [
    '-c', options.config,
    '--watch',
    '--testResultsProcessor', processor];
  const spawnOptions = {
    name: 'xterm-256color',
    cols: process.stdout.columns,
    rows: process.stdout.rows,
    cwd: process.cwd(),
    env: process.env
  };

  ipc.config.id = 'jest-observer';
  ipc.config.retry = 1500;
  ipc.config.silent = true;
  ipc.serve(() => ipc.server.on('jest.result', callback));
  ipc.server.start();

  const child = pty.spawn(runner, parameters, spawnOptions);

  console.log('🛰 ', 'jest-observer: ON - jest running in background', child.process);

  return child;
};
