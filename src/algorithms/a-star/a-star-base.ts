import { PathFindingAlgorithm } from '../path-finding-algorithm';

export abstract class AStarBase extends PathFindingAlgorithm {
  abstract calculateHeuristic(this: this, node: INode, endNode: INode): number;

  *traverse(this: this) {
    this.queue = [this.startNode];

    this.startNode.setCostFromStart(0);
    this.startNode.setEstimatedCostToGoal(
      this.calculateHeuristic(this.startNode, this.endNode)
    );
    this.startNode.setTotalEstimatedCost(
      AStarBase.findHeuristicTotal(this.startNode)
    );

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

  protected static getPositionDifference(
    a: INode,
    b: INode
  ): [deltaX: number, deltaY: number] {
    const deltaX = a.xIndex - b.xIndex;
    const deltaY = a.yIndex - b.yIndex;

    return [deltaX, deltaY];
  }

  protected static findHeuristicTotal(node: INode) {
    return node.costFromStart + node.estimatedCostToGoal;
  }
  protected static maybeUpdateHeuristic(node: INode) {
    const heuristicTotal = node.costFromStart + node.estimatedCostToGoal;
    if (node.totalEstimatedCost > heuristicTotal) {
      node.setTotalEstimatedCost(heuristicTotal);
    }
  }

  private sortOpenHeuritsicUnvisited(this: this) {
    this.queue = this.queue
      .sort((a, b) => a.totalEstimatedCost - b.totalEstimatedCost)
      .filter((nodes) => !nodes.visited);
  }

  private addNeighboursToOpen(this: this, node: INode) {
    for (const neighbour of this.getUnvisitedNeighbors(node)) {
      if (neighbour.isWall) {
        this.visitNode(neighbour);
        continue;
      }
      neighbour.setCostFromStart(node.costFromStart + 1);
      neighbour.setEstimatedCostToGoal(
        this.calculateHeuristic(neighbour, this.endNode)
      );
      AStarBase.maybeUpdateHeuristic(neighbour);
      neighbour.setPastNode(node);
      if (!this.queue.includes(neighbour)) {
        this.queue.push(neighbour);
      }
    }
  }
}
