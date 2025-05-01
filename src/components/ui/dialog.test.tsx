import { render } from '@testing-library/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';

describe('Dialog.component', () => {
  it('looks the same', () => {
    const { baseElement } = render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription>DialogDescription</DialogDescription>
          </DialogHeader>

          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>
    );
    expect(baseElement).toMatchSnapshot();
  });
});
