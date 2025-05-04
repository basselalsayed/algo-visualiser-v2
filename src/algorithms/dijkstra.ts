import { PathFindingAlgorithm } from './path-finding-algorithm';

export class Dijkstra extends PathFindingAlgorithm {
  readonly name = 'dijkstra';

  *traverse(this: this) {
    this.startNode.setDistance(0);
    // If a start node is not chosen then it will set all nodes to 0
    // so make a check to be sure that it exists!!!
    const unvisitedNodes = [...this.grid.values()];

    while (unvisitedNodes.length > 0) {
      Dijkstra.sortNodesByDistance(unvisitedNodes);

      const closestNode = unvisitedNodes.shift()!;

      if (closestNode.isWall) {
        this.visitNode(closestNode);
        yield this.sleep();
        continue;
      }
      if (closestNode.distance === Infinity) break;

      this.visitNode(closestNode);
      if (closestNode.isEnd) break;
      this.updateUnvisitedNeighbors(closestNode);

      yield this.sleep();
    }

    return this.visitedNodes.length;
  }

  private static sortNodesByDistance(nodes: INode[]) {
    nodes.sort((a, b) => a.distance - b.distance);
  }

  private updateUnvisitedNeighbors(this: this, node: INode): void {
    for (const neighbour of this.getUnvisitedNeighbors(node)) {
      neighbour.setDistance(node.distance + 1);
      // iterating the distance
      neighbour.setPastNode(node);
      // the new node is the neighbour of the previous node
    }
  }
}
