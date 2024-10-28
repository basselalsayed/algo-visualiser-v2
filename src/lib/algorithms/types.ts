import type { Node } from '@/components/grid/node.component';
import { NodeMap } from '@/hooks/useGrid';

export type Grid = Node[][];

export interface RuntimeInfo {
  nodesProcessed: number;
  nodesUntouched: number;
  shortestPath: number;
  runtime: number;
}

export { Node };

export type TPathFindingAlgorithm = new (
  grid: NodeMap,
  start: Node,
  end: Node
) => { run: () => Promise<RuntimeInfo> };
