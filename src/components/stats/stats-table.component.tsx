import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

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

export const StatsTable: FC<StatsProps> = ({ loading, results }) => {
  const { t } = useTranslation();

  return (
    <Table className='relative'>
      <TableHeader>
        <TableRow className='[&_th]:sticky [&_th]:top-0 [&_th]:bg-primary'>
          <TableHead>#</TableHead>
          <TableHead>{t('stats.algorithm')}</TableHead>
          <TableHead>{t('stats.nodesProcessed')}</TableHead>
          <TableHead>{t('stats.shortestPath')}</TableHead>
          <TableHead>{t('stats.nodesUntouched')}</TableHead>
          <TableHead>{t('stats.runtime')}</TableHead>
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
          Array.from({ length: DEDFAULT_SKELETON_COUNT }).map((_, index) => (
            <SkeletonTableRow key={index} />
          ))}
      </TableBody>
    </Table>
  );
};

const SkeletonTableRow: FC<{ columnCount?: number }> = ({
  columnCount = 6,
}) => (
  <TableRow>
    {Array.from({ length: columnCount }).map((_, index) => (
      <TableCell key={index}>
        <Skeleton className='h-4' />
      </TableCell>
    ))}
  </TableRow>
);
