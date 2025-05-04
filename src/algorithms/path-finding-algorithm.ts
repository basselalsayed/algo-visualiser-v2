import { type Duration, assert, convertToSeconds, sleep } from '@/lib';

import { ShortestPath } from './shortest-path';
import type {
  AlgoName,
  IPathFindingAlgorithm,
  RuntimeInfo,
  TraverseGenerator,
} from './types';

export abstract class PathFindingAlgorithm implements IPathFindingAlgorithm {
  abstract name: AlgoName;

  async run(
    this: this,
    onDone?: (results: RuntimeInfo) => unknown
  ): Promise<void> {
    if (this.paused) {
      this.resume();
    }

    if (!this.traverseGenerator) {
      this.executionStart = performance.now();
    }

    this.traverseGenerator ??= this.traverse();
    this.nodesProcessed =
      (await this.executeGenerator(this.traverseGenerator)) ?? 0;

    if (this.traverseGenerator.next().done) {
      this.executionEnd = performance.now();
      ShortestPath.addPath(this.name, this.shortestPath);
      this.shortestPathGenerator ??= ShortestPath.run(this.animationSpeed);

      await this.executeGenerator(this.shortestPathGenerator);

      if (this.shortestPathGenerator.next().done) {
        onDone?.({
          name: this.name,
          nodesProcessed: this.nodesProcessed,
          nodesUntouched: this.totalNodes - this.nodesProcessed,
          runtime: this.runtime,
          shortestPath: this.shortestPath.length,
        });
      }
    }
  }

  pause(this: this): void {
    this.paused = true;
  }
  resume(this: this): void {
    this.paused = false;
  }

  reset(this: this): void {
    for (const node of this.grid.values()) {
      node.reset(false);
    }
    this.visitedNodes = [];
    this.traverseGenerator = undefined;
    this.shortestPathGenerator = undefined;
  }

  constructor(
    protected readonly grid: NodeMap,
    protected readonly start: NodeCoordinates,
    protected readonly end: NodeCoordinates,
    private readonly animationSpeed: Duration
  ) {
    this.run = this.run.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.reset = this.reset.bind(this);
  }

  protected queue: INode[] = [];
  protected visitedNodes: INode[] = [];

  protected get startNode(): INode {
    return this.getNodeFromPosition(...this.start);
  }
  protected get endNode(): INode {
    return this.getNodeFromPosition(...this.end);
  }

  protected get animationDuration() {
    return this.animationSpeed.multiply(5, { max: 300 });
  }

  protected getUnvisitedNeighbors(
    this: this,
    node: INode,
    includeFences = true
  ): INode[] {
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

  protected getNodeFromPosition(this: this, x: number, y: number): INode {
    if (!this.grid.has([x, y])) throw new Error('Invalid coordinates');

    return this.grid.get([x, y])!;
  }

  protected async sleep() {
    await sleep(this.animationDuration.inMillis);
  }

  protected visitNode(this: this, node: INode): void {
    node.setVisited(true);
    if (node.isWall) return;
    this.visitedNodes.push(node);
    if (node.isStart || node.isEnd) return;
  }

  protected abstract traverse(this: this): TraverseGenerator;

  private accessor traverseGenerator: TraverseGenerator | undefined;
  private accessor shortestPathGenerator:
    | Generator<Promise<void>, void>
    | undefined;
  private accessor executionStart: number | undefined;
  private accessor executionEnd: number | undefined;
  private accessor nodesProcessed = 0;
  private accessor paused = false;

  private get totalNodes() {
    return this.grid.size;
  }

  private get shortestPath(): INode[] {
    const shortestPath = [];
    let thisNode: INode | undefined = this.endNode;

    while (thisNode) {
      shortestPath.unshift(thisNode);
      thisNode = thisNode.pastNode;
    }

    return shortestPath;
  }

  private get runtime(): number {
    assert(this.executionStart, 'number');
    assert(this.executionEnd, 'number');

    return convertToSeconds(this.executionStart, this.executionEnd);
  }

  private async executeGenerator<
    T = unknown,
    TReturn = unknown,
    TNext = unknown,
  >(gen: Generator<T, TReturn, TNext>) {
    let result = gen.next();
    while (!result.done && !this.paused) {
      await result.value;
      result = gen.next();
    }
    return result.value;
  }
}
