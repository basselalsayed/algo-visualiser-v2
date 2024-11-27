import { sleep } from '@/lib/utils';

import { PathFindingAlgorithm } from '../path-finding-algorithm';
import type { INode } from '../types';

export abstract class BaseFirstSearch extends PathFindingAlgorithm {
  abstract getCurrentNode(): INode;

  override queue = [this.startNode];

  updateUnvisitedNeighbors(this: this, node: INode): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);

    for (const neighbour of unvisitedNeighbors) {
      neighbour.setPastNode(node);
      this.queue.push(neighbour);
    }
  }

  *traverse(this: this) {
    while (this.queue.length > 0) {
      const currentNode = this.getCurrentNode()!;
      if (currentNode.isWall) continue;

      if (currentNode.isEnd) break;

      if (!currentNode.visited) {
        this.visitNode(currentNode);
        this.updateUnvisitedNeighbors(currentNode);
      }

      yield sleep(10);
    }

    return this.visitedNodes.length;
  }

  override reset(this: this): void {
    super.reset();
    this.queue = [this.startNode];
  }
}
