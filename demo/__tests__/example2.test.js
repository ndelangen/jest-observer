describe('example 2', () => {
  it('should test things in a second file', () => {
    expect(1).not.toBe(2);
    expect('false').not.toBe('true');
    expect(NaN).not.toBe(NaN);
  });
  it('should test things in a second file in a seperate test', () => {
    expect(1).not.toBe(2);
    expect('false').not.toBe('true');
    expect(undefined).not.toBe(NaN);
  });
  it('should do some snapshots', () => {
    expect({ unittestObject: true }).toMatchSnapshot();
  });
});
