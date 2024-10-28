import { sleep } from '../../utils';
import { PathFindingAlgorithm } from '../path-finding-algorithm';
import type { Node } from '../types';

export abstract class AStarBase extends PathFindingAlgorithm {
  override queue = [this.start];

  get hasRun(): boolean {
    return !!this.visitedNodes.length;
  }

  abstract findManhatten(this: this, node: Node, endNode: Node): number;

  async traverse(this: this) {
    this.queue = [this.start];

    this.start.distance = 0;
    this.start.manhatten = this.findManhatten(this.start, this.end);
    this.setHeuristicTotal(this.start);

    while (this.queue.length) {
      this.sortOpenHeuritsicUnvisited();

      const currentNode = this.queue.shift()!;

      this.visitNode(currentNode);

      if (currentNode.isEnd) {
        break;
      }

      this.addNeighboursToOpen(currentNode);

      await sleep(10);
    }

    return this.visitedNodes.length;
  }

  setHeuristicTotal(this: this, node: Node) {
    node.heuristic = node.distance + node.manhatten;
  }

  sortOpenHeuritsicUnvisited(this: this) {
    this.queue = this.queue
      .sort((a, b) => a.heuristic - b.heuristic)
      .filter((nodes) => !nodes.visited);
  }

  heuristicCheck(this: this, node: Node) {
    const heuristicTotal = node.distance + node.manhatten;
    if (node.heuristic > heuristicTotal) {
      node.heuristic = heuristicTotal;
    }
  }

  addNeighboursToOpen(this: this, node: Node) {
    const notWallNeighbours = this.getUnvisitedNeighbors(node, false);
    for (const neighbour of notWallNeighbours) {
      neighbour.distance = node.distance + 1;
      neighbour.manhatten = this.findManhatten(neighbour, this.end);
      this.heuristicCheck(neighbour);
      neighbour.pastNode = node;
      if (!this.queue.includes(neighbour)) {
        this.queue.push(neighbour);
      }
    }
  }
}
