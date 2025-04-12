import { AStarBase } from './a-star-base';

export class AStarEuclidean extends AStarBase {
  readonly name = 'aStarE';

  findManhatten(this: this, node: INode, endNode: INode) {
    const manhatten =
      (node.xIndex - endNode.xIndex) ** 2 + (node.yIndex - endNode.yIndex) ** 2;

    return manhatten;
  }
}
