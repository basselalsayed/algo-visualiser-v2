import { animate } from 'framer-motion/dom';
import type { Node, RuntimeInfo } from './types';
import { sleep } from '../utils';
import { NodeMap } from '@/hooks/useGrid';

export abstract class PathFindingAlgorithm {
  constructor(
    public grid: NodeMap,
    public start: Node,
    public end: Node
  ) {
    this.run = this.run.bind(this);
  }

  totalNodes = this.grid.size;

  protected queue: Node[] = [];
  protected visitedNodes: Node[] = [];

  getUnvisitedNeighbors(this: this, node: Node, includeFences = true): Node[] {
    const { xIndex, yIndex } = node;

    const directions = [
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }, // Right
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 }, // Down
    ];

    return directions
      .map(({ x, y }) => this.grid.get([xIndex + x, yIndex + y]))
      .filter(Boolean)
      .filter(
        (neighbor) => (includeFences || !neighbor.isWall) && !neighbor.visited
      );
  }

  getNodeFromPosition(this: this, x: number, y: number): Node {
    if (!this.grid.has([x, y])) throw new Error('Invalid coordinates');

    return this.grid.get([x, y])!;
  }

  get shortestPath(): Node[] {
    const shortestPath = [];
    let thisNode: Node | undefined = this.end;

    while (thisNode) {
      shortestPath.unshift(thisNode);
      thisNode = thisNode.pastNode;
    }

    return shortestPath;
  }

  visitNode(this: this, node: Node): void {
    this.visitedNodes.push(node);

    node.visited = true;

    animate(
      node.domNode!,
      {
        // backgroundColor: ['#eb9834', '#34eb4f', '#3434eb', 'rgba(0, 0, 0, 0)'],
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderWidth: [0.7, 0.4, 0.1, 0],
        scale: [0.8, 1.2, 1],
      },
      {
        duration: 0.3,
        ease: 'easeInOut',
      }
    );
  }

  async animateShortestPath(this: this): Promise<void> {
    for (const node of this.shortestPath) {
      animate(
        node.domNode!,
        {
          backgroundColor: ['#3434eb', '#eb9834', '#34eb4f'],
          scale: [0.8, 1.2, 1],
        },
        {
          duration: 0.3,
          ease: 'easeInOut',
        }
      );

      await sleep(10);
    }
  }

  abstract traverse(this: this): Promise<RuntimeInfo['nodesProcessed']>;

  async run(this: this): Promise<RuntimeInfo> {
    const timerBegin = performance.now();
    const nodesProcessed = await this.traverse();
    const timerComplete = performance.now();
    await this.animateShortestPath();

    return {
      nodesProcessed,
      shortestPath: this.shortestPath.length,
      nodesUntouched: this.totalNodes - nodesProcessed,
      runtime: (timerComplete - timerBegin) / 1000,
    };
  }
}
