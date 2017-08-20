'use strict';

describe('List', () => {
  let List;

  beforeEach(() => {
    List = require('../List').default;
  });

  describe('#flatten', () => {
    it('should be defined', () => {
      expect(List.flatten).toBeDefined();
    });

    it('should flatten the given list of nested lists', () => {
      const list = [[1, 2], [3, 4], [5, 6]];
      expect(List.flatten(list)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
