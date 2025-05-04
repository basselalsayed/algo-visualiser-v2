import { useTranslation } from 'react-i18next';

import { algoInfo } from '@/algorithms';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/store';

export const AlgoFormMini = () => {
  const { currentAlgo, dispatch } = useSettings();

  const { t } = useTranslation('algoInfo');

  return (
    <>
      {algoInfo.map((algo) => (
        <Button
          key={algo.id}
          variant={algo.id === currentAlgo.id ? 'secondary' : 'default'}
          onClick={() => dispatch('currentAlgo', algo)}
        >
          {t(algo.name)}
        </Button>
      ))}
    </>
  );
};
