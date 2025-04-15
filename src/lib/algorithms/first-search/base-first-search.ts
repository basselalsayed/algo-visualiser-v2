import { sleep } from '@/lib/utils';

import { PathFindingAlgorithm } from '../path-finding-algorithm';

export abstract class BaseFirstSearch extends PathFindingAlgorithm {
  abstract getCurrentNode(): INode;

  updateUnvisitedNeighbors(this: this, node: INode): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);

    for (const neighbour of unvisitedNeighbors) {
      neighbour.setPastNode(node);
      this.queue.push(neighbour);
    }
  }

  *traverse(this: this) {
    this.queue = [this.startNode];

    while (this.queue.length > 0) {
      const currentNode = this.getCurrentNode()!;
      if (currentNode.isWall) continue;

      if (currentNode.isEnd) break;

      if (!currentNode.visited) {
        this.visitNode(currentNode);
        this.updateUnvisitedNeighbors(currentNode);
      }

      yield this.sleep();
    }

    return this.visitedNodes.length;
  }
}
