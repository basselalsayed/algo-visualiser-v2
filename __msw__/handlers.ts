import { HttpResponse, http } from 'msw';

import { type Database } from '@/data';

const response: Database['public']['Tables']['algo_result']['Row'][] = [
  {
    created_at: '2024-11-09T13:32:50.609156+00:00',
    id: 1,
    name: 'Dijkstra',
    nodes_processed: 100,
    nodes_untouched: 200,
    runtime: 0.588_42,
    shortest_path: 30,
  },
];

const url = new RegExp('.*/rest/v1/algo_result.*');

export default [
  http.get(url, () => HttpResponse.json(response)),
  http.post(url, () => HttpResponse.json(response, { status: 200 })),
];
