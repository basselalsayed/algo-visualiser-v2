import { renderFragmentSnapshot } from '@/test/utils';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table';

describe('Table.component', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <Table>
          <TableCaption />
          <TableHeader>
            <TableRow>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell />
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell />
            </TableRow>
          </TableFooter>
        </Table>
      )
    ).toMatchSnapshot();
  });
});
