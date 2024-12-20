import { type FC, useRef } from 'react';
import TexSVG from 'react-hook-mathjax';
import { useTranslation } from 'react-i18next';

import { Card, Carousel, CarouselItem } from '@/components';
import { useSettings } from '@/hooks';
import { algoInfo } from '@/lib/constants';
import { cn } from '@/lib/utils';

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
        if (api?.selectedScrollSnap) {
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
              <p>{t('algoForm.runtime')}</p>
              <TexSVG display='inline' id='math-svg' latex={runTime} />
            </div>
            {t(description, { ns: 'algoInfo' })
              .split('\n')
              .map((s) => (
                <p key={s}>{s}</p>
              ))}
          </Card>
        </CarouselItem>
      ))}
    </Carousel>
  );
};
