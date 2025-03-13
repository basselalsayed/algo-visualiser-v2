import { BaseFirstSearch } from './base-first-search';

export class DepthFirstSearch extends BaseFirstSearch {
  name = 'DFS';

  getCurrentNode(): INode {
    return this.queue.pop()!;
  }
}
