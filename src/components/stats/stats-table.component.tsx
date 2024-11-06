import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { RuntimeInfo } from '@/lib/algorithms';

export const StatsTable: FC<{ results: RuntimeInfo[] }> = ({ results }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>#</TableHead>
        <TableHead>Algorithm</TableHead>
        <TableHead>Nodes processed</TableHead>
        <TableHead>Shortest path</TableHead>
        <TableHead>Nodes untouched</TableHead>
        <TableHead>Runtime</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...results].reverse().map((info) => {
        const { name, nodesProcessed, shortestPath, nodesUntouched, runtime } =
          info;

        const index = results.indexOf(info) + 1;

        return (
          <TableRow key={index}>
            <TableCell className='font-medium'>
              {results.indexOf(info) + 1}
            </TableCell>
            <TableCell className='font-medium'>{name}</TableCell>
            <TableCell>{nodesProcessed}</TableCell>
            <TableCell>{shortestPath}</TableCell>
            <TableCell>{nodesUntouched}</TableCell>
            <TableCell>{runtime}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
