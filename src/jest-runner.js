#!/usr/bin/env node

/**
 * Copyright (c) 2014, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *
 */

'use strict';

const prcs = process;
const args = require('jest-cli/build/cli/args');
const getJest = require('jest-cli/build/cli/getJest');
const getPackageRoot = require('jest-util').getPackageRoot;
const warnAboutUnrecognizedOptions = require('jest-util').warnAboutUnrecognizedOptions;
const yargs = require('yargs');

function run(argv, root) {
  argv = yargs(argv || process.argv.slice(2)).
  usage(args.usage).
  help().
  options(args.options).
  check(args.check).
  argv;

  warnAboutUnrecognizedOptions(argv, args.options);

  if (!root) {
    root = getPackageRoot();
  }

  getJest(root).runCLI(argv, root, result => {
    const code = !result || result.success ? 0 : 1;
    process.on('exit', () => process.exit(code));
    if (argv && argv.forceExit) {
      process.exit(code);
    }
    // process.send('MESSAGE!')
  });
}

// process.send('📡  jest: RUNNING');

run();



exports.run = run;
