import type { INode } from '../types';

import { BaseFirstSearch } from './base-first-search';

export class BreadthFirstSearch extends BaseFirstSearch {
  name = 'BFS';

  getCurrentNode(): INode {
    return this.queue.shift()!;
  }
}
