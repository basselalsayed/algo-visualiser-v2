import {
  AStarEuclidean,
  AStarManhatten,
  BreadthFirstSearch,
  DepthFirstSearch,
  Dijkstra,
  type IPathFindingAlgorithmConstructor,
} from '../algorithms';

export type AlgoInfo = {
  class: IPathFindingAlgorithmConstructor;
  footer: string;
  header: string;
  id: string;
  name: string;
  runTime: string;
};

export const algoInfo: AlgoInfo[] = [
  {
    class: Dijkstra,
    footer:
      'Always finds the shortest path.\nUses distance of nodes to choose the direction to travel.',
    header: 'Weighted',
    id: 'dijkstra',
    name: 'Dijkstra',
    runTime: '( O((V + E) \\log V) )',
  },
  {
    class: AStarEuclidean,
    footer:
      'May find the shortest path.\nUses as the crow flies heuristic to decide direction of search.',
    header: 'Weighted',
    id: 'astar-e',
    name: 'A* Euclidean',
    runTime: '( O((V + E) \\log V) )',
  },
  {
    class: AStarManhatten,
    footer:
      'Will find the shortest path.\nSimilar to Dijkstra, but with the “taxi cab” heuristic to guide the search.',
    header: 'Weighted',
    id: 'astar-m',
    name: 'A* Manhatten',
    runTime: '( O((V + E) \\log V) )',
  },
  {
    class: DepthFirstSearch,
    footer:
      'Will not find the shortest path.\nSearches every branch of a graph.',
    header: 'Not Weighted',
    id: 'dfs',
    name: 'Depth First Search',
    runTime: '( O(V + E) )',
  },
  {
    class: BreadthFirstSearch,
    footer:
      'Will find the shortest path.\nSearches every branch of a graph.\nWill search paths only after its current path has been fully explored.',
    header: 'Not Weighted',
    id: 'bfs',
    name: 'Breadth First Search',
    runTime: '( O(V + E) )',
  },
];
