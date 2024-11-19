import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui';
import { useSettings } from '@/hooks';
import { algoInfo } from '@/lib/constants';

export const AlgoFormMini = () => {
  const { currentAlgo, dispatch } = useSettings();

  const { t } = useTranslation('algoInfo');

  return (
    <>
      {algoInfo.map((algo) => (
        <Button
          key={algo.id}
          variant={algo.id === currentAlgo.id ? 'default' : 'outline'}
          onClick={() => dispatch('currentAlgo', algo)}
        >
          {t(algo.name)}
        </Button>
      ))}
    </>
  );
};
