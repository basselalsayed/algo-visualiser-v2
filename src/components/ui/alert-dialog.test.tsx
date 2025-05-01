import { render } from '@testing-library/react';

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
    const { baseElement } = render(
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
    );
    expect(baseElement).toMatchSnapshot();
  });
});
