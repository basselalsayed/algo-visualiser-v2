import { type FC, Fragment } from 'react';

import { Card } from '../card.component';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import { type RuntimeInfo } from '@/lib/algorithms';

import { DEDFAULT_SKELETON_COUNT } from './constants';
import { type StatsProps } from './types';

export const StatsCards: FC<StatsProps> = ({ loading, results }) => (
  <div className='space-y-6'>
    {results.map((info, index) => (
      <Fragment key={index}>
        <StatsCard result={info} index={index} />
        <Separator className='last-of-type:hidden' />
      </Fragment>
    ))}
    {loading &&
      [...Array(DEDFAULT_SKELETON_COUNT)].map((_, index) => (
        <SkeletonStatsCard key={index} />
      ))}
  </div>
);

const StatsCard: FC<{ index: number; result: RuntimeInfo }> = ({
  index,
  result: { name, nodesProcessed, nodesUntouched, runtime, shortestPath },
}) => (
  <Card
    title={`${index + 1}. ${name}`}
    contentClassName='grid grid-cols-2 items-center gap-y-2'
  >
    <h4>Nodes processed</h4>
    <h3>{nodesProcessed}</h3>
    <h4>Shortest path</h4>
    <h3>{shortestPath}</h3>
    <h4>Nodes untouched</h4>
    <h3>{nodesUntouched}</h3>
    <h4>Runtime</h4>
    <h3>{runtime}</h3>
  </Card>
);

const SkeletonStatsCard: FC = () => (
  <Card
    title={<Skeleton className='h-8' />}
    contentClassName='grid grid-cols-2 items-center gap-y-2'
  >
    <h4>Nodes processed</h4>
    <Skeleton className='h-8' />
    <h4>Shortest path</h4>
    <Skeleton className='h-8' />
    <h4>Nodes untouched</h4>
    <Skeleton className='h-8' />
    <h4>Runtime</h4>
    <Skeleton className='h-8' />
  </Card>
);
