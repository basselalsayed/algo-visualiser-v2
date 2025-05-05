import { render } from '@testing-library/react';
import { type ReactElement } from 'react';

export const renderFragmentSnapshot = (element: ReactElement) =>
  render(element).asFragment();

export const renderDialogSnapshot = (element: ReactElement) =>
  render(element).baseElement;
