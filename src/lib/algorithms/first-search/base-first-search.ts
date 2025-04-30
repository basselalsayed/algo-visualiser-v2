import { PathFindingAlgorithm } from '../path-finding-algorithm';

export abstract class BaseFirstSearch extends PathFindingAlgorithm {
  abstract getCurrentNode(): INode;

  updateUnvisitedNeighbors(this: this, node: INode): void {
    for (const neighbour of this.getUnvisitedNeighbors(node)) {
      neighbour.setPastNode(node);
      this.queue.push(neighbour);
    }
  }

  *traverse(this: this) {
    this.queue = [this.startNode];

    while (this.queue.length > 0) {
      const currentNode = this.getCurrentNode();

      if (currentNode.isWall) {
        this.visitNode(currentNode);
        yield this.sleep();
        continue;
      }

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
