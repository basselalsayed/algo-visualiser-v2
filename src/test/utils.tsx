import { render } from '@testing-library/react';
import { type ReactElement } from 'react';

export function renderFragmentSnapshot(element: ReactElement) {
  const { asFragment } = render(element);

  return asFragment();
}
