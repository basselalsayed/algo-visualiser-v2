import { renderFragmentSnapshot } from '@/test/utils';

import {
  Carousel,
  CarouselContent,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

describe('Carousel UI snapshot', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <Carousel>
          <CarouselContent>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
            <CarouselItem>Slide 3</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDotButtons />
        </Carousel>
      )
    ).toMatchSnapshot();
  });
});
