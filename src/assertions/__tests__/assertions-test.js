'use strict';

describe('assertions', () => {
  describe('#toBe', () => {
    it('should work with primitive values', () => {
      expect(1).toBe(1);
      expect('string').toBe('string');
      expect(true).toBe(true);
    });

    it('should not be true with different objects with same structure', () => {
      expect({foo: 'bar'}).not.toBe({foo: 'bar'});
    });

    it('should work with object references', () => {
      const obj = {foo: 'bar'};

      expect(obj).toBe(obj);
    });

    it('should work with array references', () => {
      const array = [1, 2, 3];
      expect(array).toBe(array);
    });

    it('should not work with arrays with same elements', () => {
      expect([1, 2, 3]).not.toBe([1, 2, 3]);
    });
  });

  describe('#toEqual', () => {
    it('should work with objects of the same structure', () => {
      expect({foo: 'bar'}).toEqual({foo: 'bar'});
    });

    it('should work with arrays of the same structure', () => {
      expect([1, 2, 3]).toEqual([1, 2, 3]);
      expect([{foo: 'bar'}]).toEqual([{foo: 'bar'}]);
    });
  });

  describe('helpful methods', () => {
    describe('#toBeDefined', () => {
      it('should test that values are defined', () => {
        const foo = 'bar';
        expect(foo).toBeDefined();

        const object = {foo: 'bar'};
        expect(object.foo).toBeDefined();
        expect(object.bar).not.toBeDefined();
      });
    });

    describe('#toMatchSnapshot', () => {
      it('should work for structural-testing', () => {
        const object = {foo: 'bar'};
        // Try changing the object to see the diff and how to update!
        expect(object).toMatchSnapshot();
      });
    });
  });

  describe('matchers', () => {
    describe('expect.stringContaining', () => {
      it('should work with strings', () => {
        expect('some_string').toEqual(expect.stringContaining('str'));
      });
    });

    describe('expect.stringMatching', () => {
      it('should work with regular expressions', () => {
        expect('file.js').toEqual(expect.stringMatching(/\.js$/));
      });
    });

    describe('expect.objectContaining', () => {
      it('should work with objects', () => {
        const object = {foo: {bar: {baz: 'foobarbaz'}}};
        expect(object).toEqual(
          expect.objectContaining({
            foo: {
              bar: {
                baz: expect.any(String),
              },
            },
          }),
        );
      });
    });
  });
});
