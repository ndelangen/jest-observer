# jest-observer

A library for running jest in watch-mode within a system and record the test-output.

This can be used to intergrate jest into your development tool.

## Install

```
yarn add jest-observer
```
```
npm install jest-observer
```

## Usage

```js
const observer = require('jest-observer');

observer({
  config: path.join(__dirname, './jest.json')
}, (results) => {
  console.log('\n', results);
});
```

### Options

The observer supports these options:

#### config
Path to a jest config file *same as in `jest -c <configfile>`*

#### out
Node Stream of jest's normal terminal output (stdout)

#### err
Node Stream of jest's err terminal output (stderr)

#### more
TODO

### Callback
The callback will receive the jest test-result json identical as `jest --json`.

The json will only contain data on the tests jest has run, which will only be what is staged.
I plan to add an 'run-all-on-first-run' option.

## Why make this?
I'm interested in adding real-time jest test-results to react-storybook.
And I wanted to learn how to do some process management and communication in nodeJS.

## Known issues
If you use the jest config option: `testResultsProcessor`, it will be ignored, since this is what's being used to capture the test-results.
