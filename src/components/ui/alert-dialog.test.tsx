import { renderDialogSnapshot } from '@/test/utils';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';

describe('AlertDialog.component', () => {
  it('looks the same', () => {
    expect(
      renderDialogSnapshot(
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Title</AlertDialogTitle>
              <AlertDialogDescription>
                DesAlertDialogDescription
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    ).toMatchSnapshot();
  });
});
