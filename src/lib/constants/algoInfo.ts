import { Dijkstra } from '../algorithms';

export const algoInfo = [
  {
    id: 'dijkstra',
    name: 'Dijkstra',
    header: 'Weighted',
    runTime: '( O((V + E) \\log V) )',
    footer:
      'Always finds the shortest path.\nUses distance of nodes to choose the direction to travel.',
  },
  {
    id: 'astar-e',
    name: 'A* Euclidean',
    header: 'Weighted',
    runTime: '( O((V + E) \\log V) )',
    footer:
      'May find the shortest path.\nUses as the crow flies heuristic to decide direction of search.',
  },
  {
    id: 'astar-m',
    name: 'A* Manhatten',
    header: 'Weighted',
    runTime: '( O((V + E) \\log V) )',
    footer:
      'Will find the shortest path.\nSimilar to Dijkstra, but with the “taxi cab” heuristic to guide the search.',
  },
  {
    id: 'dfs',
    name: 'Depth First Search',
    header: 'Not Weighted',
    runTime: '( O(V + E) )',
    footer:
      'Will not find the shortest path.\nSearches every branch of a graph.',
  },
  {
    id: 'bfs',
    name: 'Breadth First Search',
    header: 'Not Weighted',
    runTime: '( O(V + E) )',
    footer:
      'Will find the shortest path.\nSearches every branch of a graph.\nWill search paths only after its current path has been fully explored.',
  },
];

export type AlgoInfo = (typeof algoInfo)[number];
