import { PathFindingAlgorithm } from '../path-finding-algorithm';

export abstract class AStarBase extends PathFindingAlgorithm {
  abstract findManhatten(this: this, node: INode, endNode: INode): number;

  *traverse(this: this) {
    this.queue = [this.startNode];

    this.startNode.setDistance(0);
    this.startNode.setManhatten(
      this.findManhatten(this.startNode, this.endNode)
    );
    this.startNode.setHeuristic(AStarBase.findHeuristicTotal(this.startNode));

    while (this.queue.length > 0) {
      this.sortOpenHeuritsicUnvisited();

      const currentNode = this.queue.shift()!;

      this.visitNode(currentNode);

      if (currentNode.isEnd) {
        break;
      }

      this.addNeighboursToOpen(currentNode);

      yield this.sleep();
    }

    return this.visitedNodes.length;
  }

  protected static findHeuristicTotal(node: INode) {
    return node.distance + node.manhatten;
  }
  protected static maybeUpdateHeuristic(node: INode) {
    const heuristicTotal = node.distance + node.manhatten;
    if (node.heuristic > heuristicTotal) {
      node.setHeuristic(heuristicTotal);
    }
  }

  private sortOpenHeuritsicUnvisited(this: this) {
    this.queue = this.queue
      .sort((a, b) => a.heuristic - b.heuristic)
      .filter((nodes) => !nodes.visited);
  }

  private addNeighboursToOpen(this: this, node: INode) {
    for (const neighbour of this.getUnvisitedNeighbors(node)) {
      if (neighbour.isWall) {
        this.visitNode(neighbour);
        continue;
      }
      neighbour.setDistance(node.distance + 1);
      neighbour.setManhatten(this.findManhatten(neighbour, this.endNode));
      AStarBase.maybeUpdateHeuristic(neighbour);
      neighbour.setPastNode(node);
      if (!this.queue.includes(neighbour)) {
        this.queue.push(neighbour);
      }
    }
  }
}
