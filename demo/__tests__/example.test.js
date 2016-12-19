describe('example', () => {
  it('should test things', () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
    expect(undefined).toBe(undefined);
  });

  describe('details', () => {
    it('should do some details', () => {
      expect(() => { undefined() }).toThrow();
    });
    it('should do some more details', () => {
      expect(() => { throw new Error('unittestError') }).toThrow();
    });
  });
});
