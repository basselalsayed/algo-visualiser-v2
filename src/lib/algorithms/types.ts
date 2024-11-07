import { INode } from '@/components/grid/node.interface';
import { NodeCoordinates, NodeMap } from '@/hooks/state/useGrid';

export interface RuntimeInfo {
  nodesProcessed: number;
  nodesUntouched: number;
  shortestPath: number;
  runtime: number;
}

export type { INode };

export interface TPathFindingAlgorithm {
  run: (onDone?: VoidFunction) => Promise<RuntimeInfo>;
  pause: VoidFunction;
}

export interface IPathFindingAlgorithmConstructor {
  new (
    grid: NodeMap,
    start: NodeCoordinates,
    end: NodeCoordinates
  ): IPathFindingAlgorithm;
}

export type TraverseGenerator = Generator<
  void | Promise<void>,
  RuntimeInfo['nodesProcessed']
>;
