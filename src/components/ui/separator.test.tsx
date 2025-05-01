import { renderFragmentSnapshot } from '@/test/utils';

import { Separator } from './separator';

describe('Separator.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<Separator />)).toMatchSnapshot();
  });
});
