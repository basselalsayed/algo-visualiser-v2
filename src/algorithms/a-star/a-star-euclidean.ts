import { AStarBase } from './a-star-base';

export class AStarEuclidean extends AStarBase {
  readonly name = 'aStarE';

  // eslint-disable-next-line class-methods-use-this
  calculateHeuristic(this: this, node: INode, endNode: INode) {
    const [deltaX, deltaY] = AStarBase.getPositionDifference(node, endNode);

    const euclidean = deltaX ** 2 + deltaY ** 2;

    return euclidean;
  }
}
