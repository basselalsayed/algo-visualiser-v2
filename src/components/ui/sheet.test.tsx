import { renderDialogSnapshot } from '@/test/utils';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';

describe('Sheet.component', () => {
  it('looks the same', () => {
    expect(
      renderDialogSnapshot(
        <Sheet open>
          <SheetTrigger asChild>
            <button>Open Sheet</button>
          </SheetTrigger>
          <SheetContent side='right'>
            <SheetHeader>
              <SheetTitle>Profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here.
              </SheetDescription>
            </SheetHeader>
            <div className='p-4'>Some form or content</div>
            <SheetFooter>
              <button>Save</button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )
    ).toMatchSnapshot();
  });
});
