import { renderFragmentSnapshot } from '@/test/utils';

import { Tabs, TabsList, TabsTrigger } from './tabs';

describe('Tabs.component', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <Tabs value='1'>
          <TabsList>
            <TabsTrigger value='1'>1</TabsTrigger>
            <TabsTrigger value='2'>2</TabsTrigger>
          </TabsList>
        </Tabs>
      )
    ).toMatchSnapshot();
    expect(
      renderFragmentSnapshot(
        <Tabs>
          <TabsList>
            <TabsTrigger value='1'>1</TabsTrigger>
            <TabsTrigger value='2'>2</TabsTrigger>
          </TabsList>
        </Tabs>
      )
    ).toMatchSnapshot();
  });
});
