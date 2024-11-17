import { type FC, useEffect, useRef, useState } from 'react';
import Tex2SVG from 'react-hook-mathjax';

import { Carousel } from '@/components';
import { Card, CarouselItem } from '@/components/ui';
import { useSettings } from '@/hooks/state/useSettings';
import { algoInfo } from '@/lib/constants/algoInfo';
import { cn } from '@/lib/utils';


export const AlgoForm: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useSettings((state) => state.dispatch);
  const { currentAlgo, dispatch } = useSettings();

  const startIndex = useRef<number>(
    algoInfo.indexOf(useSettings.getState().currentAlgo)
  );

  return (
      <Carousel
        className={cn('flex w-8/12', className)}
        opts={{
          align: 'center',
          loop: true,
          startIndex: startIndex.current,
        }}
        onItemSelect={(api) => {
          if (api?.selectedScrollSnap) {
            dispatch('currentAlgo', algoInfo[api.selectedScrollSnap()]);
          }
        }}
      >
        {algoInfo.map(({ footer, header, id, name, runTime }) => (
          <CarouselItem key={id} className='flex items-center justify-center'>
            <Card
              title={name}
              description={header}
              contentClassName='text-background text-left flex flex-col gap-2'
            >
              <div className='flex items-center gap-1 text-base'>
                <p>Runtime:</p>
                <Tex2SVG display='inline' id='math-svg' latex={runTime} />
              </div>
              {footer.split('\n').map((s) => (
                <p key={s}>{s}</p>
              ))}
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
  );
};
