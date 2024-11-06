import { FC, Fragment } from 'react';
import { RuntimeInfo } from '@/lib/algorithms';
import { Card } from '../card.component';
import { Separator } from '../ui/separator';

export const StatsCards: FC<{ results: RuntimeInfo[] }> = ({ results }) => (
  <div className='space-y-6'>
    {[...results].reverse().map((info) => {
      const index = results.indexOf(info) + 1;

      return (
        <Fragment key={index}>
          <StatsCard result={info} index={index} />
          <Separator className='last-of-type:hidden' />
        </Fragment>
      );
    })}
  </div>
);

const StatsCard: FC<{ result: RuntimeInfo; index: number }> = ({
  result: { name, nodesProcessed, shortestPath, nodesUntouched, runtime },
  index,
}) => (
  <Card
    title={`${index}. ${name}`}
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
