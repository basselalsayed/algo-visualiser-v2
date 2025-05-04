export type DispatchFunction<Store, ExcludedKeys> = <
  K extends Exclude<keyof Store, ExcludedKeys>,
>(
  key: K,
  payload: Store[K]
) => void;
