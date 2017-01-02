const ipc = require('node-ipc');
let lastResult;
let emit = (type, payload) => {
  lastResult = {
    type,
    payload
  };
};

const process = (results) => {
  emit('jest.result', {
    id: ipc.config.id,
    message: results
  });
  return results;
};

ipc.config.id = 'jest-results-processor';
ipc.config.retry = 1000;
ipc.config.silent = true;

ipc.connectTo('jest-observer', () => {
  ipc.of['jest-observer'].on('connect', () => {
    emit = (type, payload) => ipc.of['jest-observer'].emit(type, payload);
    if (lastResult) { emit(lastResult.type, lastResult.payload); }
  });
});

module.exports = process;
