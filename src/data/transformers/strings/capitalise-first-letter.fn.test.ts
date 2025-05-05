import { capitaliseFirstLetter } from './capitalise-first-letter.fn';

describe('capitalise-first-letter.fn', () => {
  it('capitalises correctly', () => {
    const greeting = 'hello';

    expect(capitaliseFirstLetter(greeting)).toBe('Hello');
  });
});
