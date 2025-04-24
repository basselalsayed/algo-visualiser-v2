import { type NodeType } from '@/components';
import { type ArrayKeyMap } from '@/lib';

declare global {
  declare interface INode {
    coordinates: NodeCoordinates;
    distance: number;
    domNode: HTMLDivElement;
    heuristic: number;
    isEnd: boolean;
    isNone: boolean;
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
    toggleWall(): void;
    type: NodeType;
    visited: boolean;
    xIndex: number;
    yIndex: number;
  }

  declare type NodeCoordinates = [x: number, y: number];

  declare type NodeMap = ArrayKeyMap<NodeCoordinates, INode>;
}
