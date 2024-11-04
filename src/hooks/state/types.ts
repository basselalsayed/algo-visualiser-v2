export type DispatchFunction<Store, ExcludedKeys> = <
  K extends Exclude<keyof Store, ExcludedKeys>,
>(
  key: K,
  value: Store[K]
) => void;
