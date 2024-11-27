export const capitaliseFirstLetter = <S extends string>(
  input: S
): Capitalize<S> => {
  const [firstLetter, ...rest] = input;

  return <Capitalize<S>>`${firstLetter.toUpperCase()}${rest.join('')}`;
};
