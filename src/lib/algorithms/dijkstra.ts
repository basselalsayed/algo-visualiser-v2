import type { Grid, Node } from './types';
import { PathFindingAlgorithm } from './path-finding-algorithm';
import { sleep } from '../utils';

export class Dijkstra extends PathFindingAlgorithm {
  constructor(grid: Grid, start: Node, end: Node) {
    super(grid, start, end);
  }

  updateUnvisitedNeighbors(this: this, node: Node): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
    for (const neighbour of unvisitedNeighbors) {
      neighbour.distance = node.distance + 1;
      // iterating the distance
      neighbour.pastNode = node;
      // the new node is the neighbour of the previous node
    }
  }

  sortNodesByDistance(this: this, nodes: Node[]) {
    nodes.sort((a, b) => a.distance - b.distance);
  }

  async traverse(this: this) {
    this.start.distance = 0;
    // If a start node is not chosen then it will set all nodes to 0
    // so make a check to be sure that it exists!!!
    const unvisitedNodes = [...this.flatGrid];

    this.start.distance = 0;
    while (unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);

      const closestNode = unvisitedNodes.shift()!;

      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) break;

      this.visitNode(closestNode);
      // change this to be  closestNode.isEnd
      if (closestNode === this.end) break;
      this.updateUnvisitedNeighbors(closestNode);

      await sleep(5);
    }

    return this.visitedNodes.length;
  }
}
