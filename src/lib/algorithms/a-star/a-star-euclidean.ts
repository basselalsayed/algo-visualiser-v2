import { Grid, Node } from '../types';
import { AStarBase } from './a-star-base';

export class AStarEuclidean extends AStarBase {
  constructor(grid: Grid, start: Node, end: Node) {
    super(grid, start, end);
  }

  findManhatten(this: this, node: Node, endNode: Node) {
    const manhatten =
      (node.xIndex - endNode.xIndex) ** 2 + (node.yIndex - endNode.yIndex) ** 2;

    return manhatten;
  }
}
