import { PathFindingAlgorithm } from './path-finding-algorithm';

export class Dijkstra extends PathFindingAlgorithm {
  readonly name = 'dijkstra';

  *traverse(this: this) {
    this.startNode.setCostFromStart(0);

    const unvisitedNodes = [...this.grid.values()];

    while (unvisitedNodes.length > 0) {
      Dijkstra.sortNodesByDistance(unvisitedNodes);

      const closestNode = unvisitedNodes.shift()!;

      if (closestNode.isWall) {
        this.visitNode(closestNode);
        yield this.sleep();
        continue;
      }
      if (closestNode.costFromStart === Infinity) break;

      this.visitNode(closestNode);
      if (closestNode.isEnd) break;
      this.updateUnvisitedNeighbors(closestNode);

      yield this.sleep();
    }

    return this.visitedNodes.length;
  }

  private static sortNodesByDistance(nodes: INode[]) {
    nodes.sort((a, b) => a.costFromStart - b.costFromStart);
  }

  private updateUnvisitedNeighbors(this: this, node: INode): void {
    for (const neighbour of this.getUnvisitedNeighbors(node)) {
      neighbour.setCostFromStart(node.costFromStart + 1);
      // iterating the distance
      neighbour.setPastNode(node);
      // the new node is the neighbour of the previous node
    }
  }
}
