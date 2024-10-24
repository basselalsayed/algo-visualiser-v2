import type { Node } from '@/components/grid/node.component';

export type Grid = Node[][];

export interface RuntimeInfo {
  nodesProcessed: number;
  nodesUntouched: number;
  shortestPath: number;
  runtime: number;
}

export { Node };

export type TPathFindingAlgorithm = new (
  grid: Grid,
  start: Node,
  end: Node
) => { run: () => Promise<RuntimeInfo> };
