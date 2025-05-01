import { renderFragmentSnapshot } from '@/test/utils';

import { Button } from './button';

describe('Button.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<Button />)).toMatchSnapshot();
    expect(
      renderFragmentSnapshot(<Button variant='secondary' />)
    ).toMatchSnapshot();
  });
});
