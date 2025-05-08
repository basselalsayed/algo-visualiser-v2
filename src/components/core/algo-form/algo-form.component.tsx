import { type FC, useRef } from 'react';
import TexSVG from 'react-hook-mathjax';
import { useTranslation } from 'react-i18next';

import { algoInfo } from '@/algorithms';
import { Card } from '@/components/card.component';
import { Carousel, CarouselItem } from '@/components/carousel.component';
import { cn } from '@/lib';
import { useSettings } from '@/store';

export const AlgoForm: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useSettings((state) => state.dispatch);

  const startIndex = useRef<number>(
    algoInfo.indexOf(useSettings.getState().currentAlgo)
  );

  const { t } = useTranslation();

  return (
    <Carousel
      className={cn('flex w-8/12', className)}
      opts={{
        align: 'center',
        loop: true,
        startIndex: startIndex.current,
      }}
      onItemSelect={(api) => {
        if (
          api?.selectedScrollSnap &&
          api.selectedScrollSnap() !== startIndex.current
        ) {
          dispatch('currentAlgo', algoInfo[api.selectedScrollSnap()]);
        }
      }}
    >
      {algoInfo.map(({ description, header, id, name, runTime }) => (
        <CarouselItem key={id} className='flex items-center justify-center'>
          <Card
            title={t(name, { ns: 'algoInfo' })}
            description={t(header, { ns: 'algoInfo' })}
            contentClassName='text-background text-left flex flex-col gap-2'
          >
            <div className='flex items-center gap-1 text-base'>
              <p className='text-foreground'>{t('algoForm.runtime')}</p>
              <TexSVG display='inline' id='math-svg' latex={runTime} />
            </div>
            {t(description, { ns: 'algoInfo' })
              .split('\n')
              .map((s) => (
                <p className='text-foreground' key={s}>
                  {s}
                </p>
              ))}
          </Card>
        </CarouselItem>
      ))}
    </Carousel>
  );
};
