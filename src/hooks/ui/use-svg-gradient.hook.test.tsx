import { render } from '@testing-library/react';

import { useSvgGradient } from './use-svg-gradient.hook';

const Component = () => {
  const ref = useSvgGradient<HTMLDivElement>({ color1: 'red', color2: 'blue' });

  return (
    <div ref={ref}>
      <svg>
        <path />
        <circle />
      </svg>
    </div>
  );
};

describe('useSvgGradient', () => {
  it('adds a gradient to an svg and child elements', () => {
    const { container } = render(<Component />);

    const lg = container.querySelector<SVGLinearGradientElement>(
      'defs linearGradient'
    );

    expect(lg).toBeTruthy();

    expect(lg?.style.getPropertyValue('--grad-1')).toBe('red');
    expect(lg?.style.getPropertyValue('--grad-2')).toBe('blue');

    expect(
      container.querySelector('path')?.getAttribute('stroke')
    ).toBeTruthy();

    expect(
      container.querySelector('circle')?.getAttribute('stroke')
    ).toBeTruthy();
  });
});
