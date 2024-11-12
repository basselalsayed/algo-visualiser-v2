import { type FC } from 'react';

import { Skeleton } from '../ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

import { DEDFAULT_SKELETON_COUNT } from './constants';
import { type StatsProps } from './types';

export const StatsTable: FC<StatsProps> = ({ loading, results }) => (
  <Table className='relative'>
    <TableHeader>
      <TableRow className='[&_th]:sticky [&_th]:top-0 [&_th]:bg-primary'>
        <TableHead>#</TableHead>
        <TableHead>Algorithm</TableHead>
        <TableHead>Nodes processed</TableHead>
        <TableHead>Shortest path</TableHead>
        <TableHead>Nodes untouched</TableHead>
        <TableHead>Runtime</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {results.map(
        (
          { name, nodesProcessed, nodesUntouched, runtime, shortestPath },
          index
        ) => (
          <TableRow key={index}>
            <TableCell className='font-medium'>{index + 1}</TableCell>
            <TableCell className='font-medium'>{name}</TableCell>
            <TableCell>{nodesProcessed}</TableCell>
            <TableCell>{shortestPath}</TableCell>
            <TableCell>{nodesUntouched}</TableCell>
            <TableCell>{runtime}</TableCell>
          </TableRow>
        )
      )}
      {loading &&
        [...Array(DEDFAULT_SKELETON_COUNT)].map((_, index) => (
          <SkeletonTableRow key={index} />
        ))}
    </TableBody>
  </Table>
);

const SkeletonTableRow: FC<{ columnCount?: number }> = ({
  columnCount = 6,
}) => (
  <TableRow>
    {[...Array(columnCount)].map((_, index) => (
      <TableCell key={index}>
        <Skeleton className='h-4' />
      </TableCell>
    ))}
  </TableRow>
);
