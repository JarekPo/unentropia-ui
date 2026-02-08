import {getFirstName} from './utils';

describe('getFirstName function', () => {
  it('should return the first name from a full name', () => {
    expect(getFirstName('John Smith Jr.')).toBe('John');
    expect(getFirstName('Jane')).toBe('Jane');
    expect(getFirstName('  Alice   Smith  ')).toBe('Alice');
  });

  it('should return an empty string if the input is not a string', () => {
    expect(getFirstName(123 as unknown as string)).toBe('');
    expect(getFirstName(null as unknown as string)).toBe('');
    expect(getFirstName(undefined as unknown as string)).toBe('');
  });
});
