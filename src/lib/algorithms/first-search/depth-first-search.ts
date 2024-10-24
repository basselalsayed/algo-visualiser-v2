import type { Grid, Node } from '../types';
import { BaseFirstSearch } from './base-first-search';

export class DepthFirstSearch extends BaseFirstSearch {
  constructor(grid: Grid, start: Node, end: Node) {
    super(grid, start, end);
  }

  getCurrentNode(): Node {
    return this.queue.pop()!;
  }
}
