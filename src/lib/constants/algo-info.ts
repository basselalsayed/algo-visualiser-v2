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
  description: TKey<'algoInfo'>;
  header: TKey<'algoInfo'>;
  id: string;
  name: TKey<'algoInfo'>;
  runTime: string;
};

export const algoInfo: AlgoInfo[] = [
  {
    class: Dijkstra,
    description: 'dijkstra.description',
    header: 'dijkstra.header',
    id: 'dijkstra',
    name: 'dijkstra.name',
    runTime: '( O((V + E) \\log V) )',
  },
  {
    class: AStarEuclidean,
    description: 'aStarE.description',
    header: 'aStarE.header',
    id: 'astar-e',
    name: 'aStarE.name',
    runTime: '( O((V + E) \\log V) )',
  },
  {
    class: AStarManhatten,
    description: 'aStarM.description',
    header: 'aStarM.header',
    id: 'astar-m',
    name: 'aStarM.name',
    runTime: '( O((V + E) \\log V) )',
  },
  {
    class: DepthFirstSearch,
    description: 'dfs.description',
    header: 'dfs.header',
    id: 'dfs',
    name: 'dfs.name',
    runTime: '( O(V + E) )',
  },
  {
    class: BreadthFirstSearch,
    description: 'bfs.description',
    header: 'bfs.header',
    id: 'bfs',
    name: 'bfs.name',
    runTime: '( O(V + E) )',
  },
];
