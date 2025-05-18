import { AStarBase } from './a-star-base';

export class AStarManhatten extends AStarBase {
  readonly name = 'aStarM';

  // eslint-disable-next-line class-methods-use-this
  calculateHeuristic(this: this, node: INode, endNode: INode) {
    const [deltaX, deltaY] = AStarBase.getPositionDifference(node, endNode);

    const manhatten = Math.abs(deltaX) + Math.abs(deltaY);

    return manhatten;
  }
}
