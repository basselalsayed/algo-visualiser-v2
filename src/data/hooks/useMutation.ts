import { useInsertMutation } from '@supabase-cache-helpers/postgrest-swr';
import { useCallback } from 'react';
import { type CamelCasedPropertiesDeep } from 'type-fest';

import { apiClient } from '../client';
import { mapKeysToSnake } from '../transformers/objects/mapKeysToSnake';
import { type Database } from '../types';

interface useMutationParams {
  tableName: keyof Database['public']['Tables'];
}

export const useMutation = ({ tableName }: useMutationParams) => {
  const { trigger } = useInsertMutation(apiClient.from(tableName), ['id']);

  type params = CamelCasedPropertiesDeep<
    Database['public']['Tables'][typeof tableName]['Insert']
  >;

  const _trigger = useCallback(
    (entity: params[]) => trigger(mapKeysToSnake(entity)),
    [trigger]
  );

  return _trigger;
};
