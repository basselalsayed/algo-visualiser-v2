import { type NodeType } from './node-type.enum';

export interface INode {
  domNode: HTMLDivElement;
  type: NodeType;
  setType(type: NodeType): void;
  isStart: boolean;
  isEnd: boolean;
  isWall: boolean;
  xIndex: number;
  yIndex: number;
  visited: boolean;
  setVisited(visited: boolean): void;
  pastNode?: INode;
  setPastNode(pastNode?: INode): void;
  heuristic: number;
  setHeuristic(heuristic: number): void;
  manhatten: number;
  setManhatten(manhatten: number): void;
  distance: number;
  setDistance(distance: number): void;
}
