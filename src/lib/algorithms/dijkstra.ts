import { sleep } from '../utils';

import { PathFindingAlgorithm } from './path-finding-algorithm';
import type { INode } from './types';

export class Dijkstra extends PathFindingAlgorithm {
  name = 'Dijkstra';

  updateUnvisitedNeighbors(this: this, node: INode): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
    for (const neighbour of unvisitedNeighbors) {
      neighbour.setDistance(node.distance + 1);
      // iterating the distance
      neighbour.setPastNode(node);
      // the new node is the neighbour of the previous node
    }
  }

  sortNodesByDistance(this: this, nodes: INode[]) {
    nodes.sort((a, b) => a.distance - b.distance);
  }

  *traverse(this: this) {
    this.startNode.setDistance(0);
    // If a start node is not chosen then it will set all nodes to 0
    // so make a check to be sure that it exists!!!
    const unvisitedNodes = [...this.grid.values()];

    while (unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);

      const closestNode = unvisitedNodes.shift()!;

      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) break;

      this.visitNode(closestNode);
      // change this to be  closestNode.isEnd
      if (closestNode.isEnd) break;
      this.updateUnvisitedNeighbors(closestNode);

      yield sleep(5);
    }

    return this.visitedNodes.length;
  }
}
