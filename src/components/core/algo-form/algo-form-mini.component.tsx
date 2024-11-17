import { Button } from '@/components/ui/button';
import { useSettings } from '@/hooks/state/useSettings';
import { algoInfo } from '@/lib/constants/algoInfo';

export const AlgoFormMini = () => {
  const { currentAlgo, dispatch } = useSettings();

  return (
    <>
      {algoInfo.map((algo) => (
        <Button
          key={algo.id}
          variant={algo.id === currentAlgo.id ? 'default' : 'outline'}
          onClick={() => dispatch('currentAlgo', algo)}
        >
          {algo.name}
        </Button>
      ))}
    </>
  );
};
