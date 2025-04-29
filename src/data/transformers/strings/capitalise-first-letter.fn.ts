export const capitaliseFirstLetter = <S extends string>(
  input: S
): Capitalize<S> => {
  const [firstLetter, ...rest] = input;

  return `${firstLetter.toUpperCase()}${rest.join('')}` as Capitalize<S>;
};
