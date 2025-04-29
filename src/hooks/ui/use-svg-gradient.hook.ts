import { nanoid } from 'nanoid';
import { type RefCallback, useCallback } from 'react';

function addLinearGradient(
  svgElement: SVGElement | SVGSVGElement,
  color1: string,
  color2: string
) {
  const defs =
    svgElement.querySelector('defs') ??
    document.createElementNS('http://www.w3.org/2000/svg', 'defs');

  if (!svgElement.contains(defs)) svgElement.append(defs);

  const gradientId = `gradient-${nanoid()}`;

  if (defs.querySelector('linearGradient')) {
    return;
  }

  const gradient = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'linearGradient'
  );
  gradient.id = gradientId;
  gradient.setAttribute('x1', '0%');
  gradient.setAttribute('y1', '0%');
  gradient.setAttribute('x2', '100%');
  gradient.setAttribute('y2', '100%');
  gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
  gradient.style.setProperty('--grad-1', color1);
  gradient.style.setProperty('--grad-2', color2);

  const stops = [
    { color: 'var(--grad-1)', offset: '0%' },
    { color: 'var(--grad-2)', offset: '100%' },
  ];

  for (const { color, offset } of stops) {
    const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop.setAttribute('offset', offset);
    stop.style.stopColor = color;
    gradient.append(stop);
  }

  defs.append(gradient);

  for (const el of svgElement.querySelectorAll(
    'path, rect, circle, line, polygon, polyline, ellipse, text, use'
  )) {
    el.setAttribute('stroke', `url(#${gradientId})`);
  }
}

interface useSvgGradientParams {
  color1?: string;
  color2?: string;
}

export const useSvgGradient = <T extends Element>({
  color1 = 'hsl(var(--grad-accent-1))',
  color2 = 'hsl(var(--grad-accent-2))',
}: useSvgGradientParams = {}): RefCallback<T> => {
  const ref = useCallback(
    (el: T) => {
      if (el) {
        if (el instanceof SVGElement || el instanceof SVGSVGElement) {
          addLinearGradient(el, color1, color2);
        }

        if (el instanceof HTMLElement) {
          for (const svg of el.querySelectorAll('svg')) {
            addLinearGradient(svg, color1, color2);
          }
        }
      }
    },
    [color1, color2]
  );

  return ref;
};
