import { AStarBase } from './a-star-base';

import type { Grid, Node } from '../types';

export class AStarManhatten extends AStarBase {
  constructor(grid: Grid, start: Node, end: Node) {
    super(grid, start, end);
  }

  findManhatten(this: this, node: Node, endNode: Node) {
    const manhatten =
      Math.abs(node.xIndex - endNode.xIndex) +
      Math.abs(node.yIndex - endNode.yIndex);

    return manhatten;
  }
}
