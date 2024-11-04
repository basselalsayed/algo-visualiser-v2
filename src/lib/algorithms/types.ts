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

export interface TPathFindingAlgorithm {
  run: (onDone?: VoidFunction) => Promise<RuntimeInfo>;
  pause: VoidFunction;
}

export type TPathFindingAlgorithmConstructor = new (
  grid: NodeMap,
  start: Node,
  end: Node
) => TPathFindingAlgorithm;

export type TraverseGenerator = Generator<
  void | Promise<void>,
  RuntimeInfo['nodesProcessed']
>;
