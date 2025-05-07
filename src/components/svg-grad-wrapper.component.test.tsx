/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render } from '@testing-library/react';
import { type ComponentProps, type FC } from 'react';

import { SVGGradWrapper } from './svg-grad-wrapper.component';

const Component: FC<ComponentProps<'div'>> = (props) => (
  <div {...props}>
    <svg>
      <path />
      <circle />
    </svg>
  </div>
);
const Component2: FC<ComponentProps<'svg'>> = (props) => (
  <svg {...props}>
    <path />
    <circle />
  </svg>
);

describe('SVGGradWrapper', () => {
  it('clones children and adds a gradient to nested svg and child elements', () => {
    const { container } = render(
      <SVGGradWrapper color1='red' color2='blue'>
        <Component />
      </SVGGradWrapper>
    );

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

  it('clones children and adds a gradient to direct svg and child elements', () => {
    const { container } = render(
      <SVGGradWrapper color1='red' color2='blue'>
        <Component2 />
      </SVGGradWrapper>
    );

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
