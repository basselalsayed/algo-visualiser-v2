import { renderDialogSnapshot } from '@/test/utils';

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
    expect(
      renderDialogSnapshot(
        <Dialog open>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Title</DialogTitle>
              <DialogDescription>DialogDescription</DialogDescription>
            </DialogHeader>

            <DialogFooter>Footer</DialogFooter>
          </DialogContent>
        </Dialog>
      )
    ).toMatchSnapshot();
  });
});
