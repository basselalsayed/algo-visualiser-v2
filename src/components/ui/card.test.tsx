import { renderFragmentSnapshot } from '@/test/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './card';

describe('Card.component', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      )
    ).toMatchSnapshot();
  });
});
