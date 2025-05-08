import { renderFragmentSnapshot } from '@/test/utils';

import { Skeleton } from './skeleton';

describe('Skeleton.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<Skeleton />)).toMatchSnapshot();
  });
});
