module.exports = (results) => {
  if (process.send) {
    process.send(results);
  }
  return results;
};
