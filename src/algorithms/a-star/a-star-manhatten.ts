import { AStarBase } from './a-star-base';

export class AStarManhatten extends AStarBase {
  readonly name = 'aStarM';

  // eslint-disable-next-line class-methods-use-this
  findManhatten(this: this, node: INode, endNode: INode) {
    return (
      Math.abs(node.xIndex - endNode.xIndex) +
      Math.abs(node.yIndex - endNode.yIndex)
    );
  }
}
