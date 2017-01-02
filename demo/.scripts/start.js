#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const observer = require('jest-observer');

console.log('🚀 ', '~~~ start script ~~~');

const child = observer({
  config: path.join(__dirname, '../.jestrc')
}, (results) => {
  /* results are the jest test-results */
  if (results && results.wasInterrupted === false) {
    console.log('\n', results);
  }
});

child.on('data', data => console.log('data: ',data));
