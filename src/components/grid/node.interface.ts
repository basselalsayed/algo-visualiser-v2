import { type NodeType } from './node-type.enum';

export interface INode {
  distance: number;
  domNode: HTMLDivElement;
  heuristic: number;
  isEnd: boolean;
  isStart: boolean;
  isWall: boolean;
  manhatten: number;
  pastNode?: INode;
  reset(resetType: boolean | NodeType[]): void;
  setDistance(distance: number): void;
  setHeuristic(heuristic: number): void;
  setManhatten(manhatten: number): void;
  setPastNode(pastNode?: INode): void;
  setType(type: NodeType): void;
  setVisited(visited: boolean): void;
  type: NodeType;
  visited: boolean;
  xIndex: number;
  yIndex: number;
}
