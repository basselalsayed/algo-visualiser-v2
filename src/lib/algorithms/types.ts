import { type INode } from '@/components/grid/node.interface';
import { type NodeCoordinates, type NodeMap } from '@/hooks/state/useGrid';

export interface RuntimeInfo {
  name: string;
  nodesProcessed: number;
  nodesUntouched: number;
  runtime: number;
  shortestPath: number;
}

export type { INode };

export interface IPathFindingAlgorithm {
  pause(): void;
  reset(): void | Promise<void>;
  run(onDone?: (results: RuntimeInfo) => unknown): Promise<void>;
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
