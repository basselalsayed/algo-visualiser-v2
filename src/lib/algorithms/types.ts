import type tAlgoInfo from '@/locales/en/algoInfo.json';

export interface RuntimeInfo {
  name: string;
  nodesProcessed: number;
  nodesUntouched: number;
  runtime: number;
  shortestPath: number;
}

export type AlgoName = keyof typeof tAlgoInfo;
export const ALGO_NAMES = Object.keys(tAlgoInfo) as AlgoName[];

export interface IPathFindingAlgorithm {
  name: AlgoName;
  pause(): void;
  reset(): void | Promise<void>;
  run(onDone?: (results: RuntimeInfo) => unknown): Promise<void>;
}

export interface IPathFindingAlgorithmConstructor {
  new (
    grid: NodeMap,
    start: NodeCoordinates,
    end: NodeCoordinates,
    animationSpeed: Duration
  ): IPathFindingAlgorithm;
}

export type TraverseGenerator = Generator<
  void | Promise<void>,
  RuntimeInfo['nodesProcessed']
>;
