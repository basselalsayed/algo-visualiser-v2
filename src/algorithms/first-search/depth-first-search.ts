import { BaseFirstSearch } from './base-first-search';

export class DepthFirstSearch extends BaseFirstSearch {
  readonly name = 'dfs';

  getCurrentNode(): INode {
    return this.queue.pop()!;
  }
}
