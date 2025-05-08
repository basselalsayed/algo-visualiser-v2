import { renderFragmentSnapshot } from '@/test/utils';

import { Label } from './label';

describe('Label.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<Label />)).toMatchSnapshot();
  });
});
