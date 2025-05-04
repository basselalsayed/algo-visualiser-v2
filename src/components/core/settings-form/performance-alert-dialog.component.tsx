import { useTranslation } from 'react-i18next';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useSettings } from '@/store';

export const PerformanceAlertDialog = () => {
  const { dispatch, performanceModeDialogOpen } = useSettings();

  const { t } = useTranslation();

  return (
    <AlertDialog
      open={performanceModeDialogOpen}
      onOpenChange={(open) => dispatch('performanceModeDialogOpen', open)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('settings.performanceCheck')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('settings.performanceCheckTitle')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('buttons.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={() => dispatch('performanceMode', true)}>
            {t('buttons.next')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
