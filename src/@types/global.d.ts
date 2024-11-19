import { type ParseKeys } from 'i18next';

declare type AsyncVoidFunction = () => Promise<void>;
/** See https://stackoverflow.com/a/51390763/1470607  */
type Falsy = false | 0 | '' | null | undefined;

declare interface Array<T> {
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  filter<S extends T>(
    predicate: BooleanConstructor,
    thisArg?: unknown
  ): Exclude<S, Falsy>[];
}

declare global {
  declare type TKey = ParseKeys;

  declare interface TProp {
    tKey: TKey;
  }
}
