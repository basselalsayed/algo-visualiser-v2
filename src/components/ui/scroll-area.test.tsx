import { renderFragmentSnapshot } from '@/test/utils';

import { ScrollArea } from './scroll-area';

describe('ScrollArea.component', () => {
  it('looks the same', () => {
    expect(renderFragmentSnapshot(<ScrollArea />)).toMatchSnapshot();
  });
});
