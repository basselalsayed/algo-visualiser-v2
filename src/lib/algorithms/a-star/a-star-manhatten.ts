import type { INode } from '../types';

import { AStarBase } from './a-star-base';

export class AStarManhatten extends AStarBase {
  name = 'A* Manhatten';

  findManhatten(this: this, node: INode, endNode: INode) {
    const manhatten =
      Math.abs(node.xIndex - endNode.xIndex) +
      Math.abs(node.yIndex - endNode.yIndex);

    return manhatten;
  }
}
