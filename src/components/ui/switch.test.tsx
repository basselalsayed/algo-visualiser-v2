import { renderFragmentSnapshot } from '@/test/utils';

import { Switch } from './switch';

describe('Switch.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<Switch />)).toMatchSnapshot();
    expect(renderFragmentSnapshot(<Switch variant='icon' />)).toMatchSnapshot();
  });
});
