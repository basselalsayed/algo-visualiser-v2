import { AStarBase } from './a-star-base';

import type { Node } from '../types';

export class AStarManhatten extends AStarBase {
  findManhatten(this: this, node: Node, endNode: Node) {
    const manhatten =
      Math.abs(node.xIndex - endNode.xIndex) +
      Math.abs(node.yIndex - endNode.yIndex);

    return manhatten;
  }
}
