import { sleep } from '@/lib/utils';
import { PathFindingAlgorithm } from '../path-finding-algorithm';
import type { Node, RuntimeInfo } from '../types';

export abstract class BaseFirstSearch extends PathFindingAlgorithm {
  abstract getCurrentNode(): Node;

  override queue = [this.start];

  updateUnvisitedNeighbors(this: this, node: Node): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);

    for (const neighbour of unvisitedNeighbors) {
      neighbour.pastNode = node;
      this.queue.push(neighbour);
    }
  }

  async traverse(this: this): Promise<RuntimeInfo['nodesProcessed']> {
    while (this.queue.length) {
      const currentNode = this.getCurrentNode()!;
      if (currentNode.isWall) continue;

      if (currentNode.isEnd) break;

      if (!currentNode.visited) {
        this.visitNode(currentNode);

        this.updateUnvisitedNeighbors(currentNode);
      }

      await sleep(10);
    }

    return this.visitedNodes.length;
  }
}
