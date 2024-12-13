import { type FC, type ReactElement, cloneElement } from 'react';
import { useSvgGradient } from '@/hooks/ui/use-svg-gradient.hook';

export const SVGGradWrapper: FC<{
  children: ReactElement;
  color1?: string;
  color2?: string;
}> = ({ children, color1, color2 }) => {
  const svgRef = useSvgGradient<Element>({ color1, color2 });

  return cloneElement(children, { ref: svgRef });
};
