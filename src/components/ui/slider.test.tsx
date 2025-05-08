import { renderFragmentSnapshot } from '@/test/utils';

import { Slider } from './slider';

describe('Slider.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<Slider />)).toMatchSnapshot();
  });
});
