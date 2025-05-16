import { type Duration } from '@/lib';
import tAlgoInfo from '@/locales/en/algoInfo.json';

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
  reset(): Promise<void>;
  run(onDone?: (results?: RuntimeInfo) => unknown): Promise<void>;
}

export type IPathFindingAlgorithmConstructor = new (
  grid: NodeMap,
  start: NodeCoordinates,
  end: NodeCoordinates,
  animationSpeed: Duration
) => IPathFindingAlgorithm;

export type TraverseGenerator = Generator<
  Promise<void>,
  RuntimeInfo['nodesProcessed'],
  void
>;
