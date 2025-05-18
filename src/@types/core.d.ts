import { type ArrayKeyMap, type NodeType } from '@/lib';

declare global {
  declare interface INode {
    coordinates: NodeCoordinates;
    costFromStart: number;
    domNode?: HTMLDivElement;
    estimatedCostToGoal: number;
    isEnd: boolean;
    isNone: boolean;
    isStart: boolean;
    isWall: boolean;
    pastNode?: INode;
    reset: (resetType: boolean | NodeType[]) => void;
    setCostFromStart: (cost: number) => void;
    setEstimatedCostToGoal: (cost: number) => void;
    setPastNode: (pastNode?: INode) => void;
    setTotalEstimatedCost: (heuristic: number) => void;
    setType: (type: NodeType) => void;
    setVisited: (visited: boolean) => void;
    totalEstimatedCost: number;
    type: NodeType;
    visited: boolean;
    xIndex: number;
    yIndex: number;
  }

  declare type NodeCoordinates = [x: number, y: number];

  declare type NodeMap = ArrayKeyMap<NodeCoordinates, INode>;
}
