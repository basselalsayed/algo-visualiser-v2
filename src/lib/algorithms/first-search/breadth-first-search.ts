import type { Node } from '../types';
import { BaseFirstSearch } from './base-first-search';

export class BreadthFirstSearch extends BaseFirstSearch {
  getCurrentNode(): Node {
    return this.queue.shift()!;
  }
}
