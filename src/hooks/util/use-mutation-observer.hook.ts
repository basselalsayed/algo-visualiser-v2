import { type RefObject, useCallback, useEffect, useRef } from 'react';

interface Params {
  callback: MutationCallback;
  cleanup?: boolean;
  options?: MutationObserverInit;
  target?: RefObject<HTMLElement> | HTMLElement;
}

export function useMutationObserver({
  callback,
  cleanup = true,
  options,
  target,
}: Params): VoidFunction {
  const observer = useRef<MutationObserver | undefined>();

  const stop = useCallback(() => {
    observer.current?.disconnect();
    observer.current = undefined;
  }, []);

  useEffect(() => {
    const element = target
      ? 'current' in target
        ? target.current
        : target
      : document.body;

    if (!element) return;

    observer.current = new MutationObserver(callback);
    observer.current?.observe(element, options);

    if (cleanup) return stop;
  }, [callback, cleanup, options, stop, target]);

  return stop;
}
