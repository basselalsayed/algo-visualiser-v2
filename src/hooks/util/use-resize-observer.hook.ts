import { throttle } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';
import { useIsMounted } from 'usehooks-ts';

interface Size {
  height: number | undefined;
  width: number | undefined;
}

interface UseResizeObserverOptions<T extends HTMLElement = HTMLElement> {
  box?: 'border-box' | 'content-box' | 'device-pixel-content-box';
  onResize?: (size: Size) => void;
  ref: React.RefObject<T | null>;
  throttleDelay?: number;
}

const initialSize: Size = {
  height: undefined,
  width: undefined,
};

export function useResizeObserver<T extends HTMLElement = HTMLElement>(
  options: UseResizeObserverOptions<T>
): Size {
  const { box = 'content-box', ref, throttleDelay = 100 } = options;
  const [{ height, width }, setSize] = useState<Size>(initialSize);
  const isMounted = useIsMounted();
  const previousSize = useRef<Size>({ ...initialSize });
  const onResize = useRef<((size: Size) => void) | undefined>(undefined);
  onResize.current = options.onResize;

  useEffect(() => {
    if (!ref.current) return;

    if (typeof globalThis === 'undefined' || !('ResizeObserver' in globalThis))
      return;

    const observer = new ResizeObserver(([entry]) => {
      const boxProp =
        box === 'border-box'
          ? 'borderBoxSize'
          : box === 'device-pixel-content-box'
            ? 'devicePixelContentBoxSize'
            : 'contentBoxSize';

      const newWidth = extractSize(entry, boxProp, 'inlineSize');
      const newHeight = extractSize(entry, boxProp, 'blockSize');

      const hasChanged =
        previousSize.current.width !== newWidth ||
        previousSize.current.height !== newHeight;

      if (hasChanged) {
        const newSize: Size = { height: newHeight, width: newWidth };
        previousSize.current = newSize;

        const handleResize = () => {
          if (onResize.current) {
            onResize.current(newSize);
          } else if (isMounted()) {
            setSize(newSize);
          }
        };

        throttle(handleResize, throttleDelay)();
      }
    });

    observer.observe(ref.current, { box });

    return () => {
      observer.disconnect();
    };
  }, [box, ref, isMounted, throttleDelay]);

  return { height, width };
}

type BoxSizesKey = keyof Pick<
  ResizeObserverEntry,
  'borderBoxSize' | 'contentBoxSize' | 'devicePixelContentBoxSize'
>;

function extractSize(
  entry: ResizeObserverEntry,
  box: BoxSizesKey,
  sizeType: keyof ResizeObserverSize
): number | undefined {
  if (!entry[box]) {
    if (box === 'contentBoxSize') {
      return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height'];
    }
    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Array.isArray(entry[box])
    ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      entry[box][0][sizeType]
    : // @ts-expect-error Support Firefox's non-standard behavior
      (entry[box][sizeType] as number);
}
