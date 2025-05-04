import { BaseFirstSearch } from './base-first-search';

export class BreadthFirstSearch extends BaseFirstSearch {
  readonly name = 'bfs';

  getCurrentNode(): INode {
    return this.queue.shift()!;
  }
}
