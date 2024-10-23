import { FC, useRef } from 'react';
import Tex2SVG, { MathJaxProvider } from 'react-hook-mathjax';

import { algoInfo } from '@/lib/constants/algoInfo';

import { Carousel, CarouselItem } from '../carousel.component';
import { Card } from '../card.component';
import { SettingsAction, useSettings } from '@/hooks/state/useSettings';
import { CarouselApi } from '../ui/carousel';
import { cn } from '@/lib/utils';

export const AlgoForm: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useSettings((state) => state.dispatch);

  const startIndex = useRef<number>(
    algoInfo.indexOf(useSettings.getState().currentAlgo)
  );

  return (
    <>
      <MathJaxProvider
        options={{
          options: { enableMenu: false },
        }}
      />
      <Carousel
        className={cn('flex w-8/12', className)}
        opts={{
          loop: true,
          align: 'center',
          startIndex: startIndex.current,
        }}
        onItemSelect={(api: CarouselApi) => {
          if (api?.selectedScrollSnap) {
            dispatch(
              SettingsAction.currentAlgo,
              algoInfo[api.selectedScrollSnap()]
            );
          }
        }}
      >
        {algoInfo.map(({ id, name, header, footer, runTime }) => (
          <CarouselItem key={id} className='flex items-center justify-center'>
            <Card title={name} description={header}>
              <ul className='text-left flex flex-col gap-2'>
                <div className='flex text-base items-center gap-1'>
                  <p>Runtime:</p>
                  <Tex2SVG display='inline' latex={runTime} />
                </div>
                {footer.split('\n').map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Card>
          </CarouselItem>
        ))}
      </Carousel>
    </>
  );
};
