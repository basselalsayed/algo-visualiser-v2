import { type FC, type ReactElement, type Ref, cloneElement } from 'react';

import { useSvgGradient } from '@/hooks';

export const SVGGradWrapper: FC<{
  children: ReactElement<{ ref: Ref<Element> }>;
  color1?: string;
  color2?: string;
}> = ({ children, color1, color2 }) => {
  const ref = useSvgGradient<Element>({ color1, color2 });

  return cloneElement(children, { ref });
};
