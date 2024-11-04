import { animate } from 'framer-motion/dom';
import type { Node, RuntimeInfo, TraverseGenerator } from './types';
import { assert, sleep } from '../utils';
import { NodeMap } from '@/hooks/useGrid';

export abstract class PathFindingAlgorithm {
  constructor(
    public grid: NodeMap,
    public start: Node,
    public end: Node
  ) {
    this.run = this.run.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
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

  *animateShortestPath(this: this) {
    for (const node of this.shortestPath) {
      animate(
        node.domNode!,
        {
          backgroundColor: ['#3434eb', '#eb9834', '#34eb4f'],
          scale: [0.8, 1.2, 1],
        },
        {
          duration: 0.15,
          ease: 'easeInOut',
        }
      );

      yield sleep(10);
    }
  }

  abstract traverse(this: this): TraverseGenerator;

  private accessor traverseGenerator: TraverseGenerator | undefined;
  private accessor shortestPathGenerator:
    | Generator<Promise<void>, void>
    | undefined;

  async executeGenerator(gen: Generator) {
    let result = gen.next();
    while (!result.done && !this.paused) {
      await result.value;
      result = gen.next();
    }
    return result.value;
  }

  private accessor executionStart: number | undefined;
  private accessor executionEnd: number | undefined;
  private accessor nodesProcessed: number = 0;

  get runtime(): number {
    assert(this.executionStart, 'number');
    assert(this.executionEnd, 'number');

    return (this.executionEnd - this.executionStart) / 1000;
  }

  async run(this: this): Promise<RuntimeInfo> {
    if (this.paused) {
      this.resume();
    }

    if (!this.traverseGenerator) {
      this.executionStart = performance.now();
    }

    this.traverseGenerator ??= this.traverse();

    if (this.traverseGenerator.next().done) {
      this.executionEnd = performance.now();

      this.shortestPathGenerator ??= this.animateShortestPath();

      await this.executeGenerator(this.shortestPathGenerator);
    } else {
      this.nodesProcessed = await this.executeGenerator(this.traverseGenerator);
    }

    return {
      nodesProcessed: this.nodesProcessed,
      shortestPath: this.shortestPath.length,
      nodesUntouched: this.totalNodes - this.nodesProcessed,
      runtime: this.runtime,
    };
  }

  protected accessor paused: boolean = false;
  pause(this: this): void {
    this.paused = true;
  }
  resume(this: this): void {
    this.paused = false;
  }
}
