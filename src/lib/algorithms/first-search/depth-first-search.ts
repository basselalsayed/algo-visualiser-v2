import type { Node } from '../types';
import { BaseFirstSearch } from './base-first-search';

export class DepthFirstSearch extends BaseFirstSearch {
  getCurrentNode(): Node {
    return this.queue.pop()!;
  }
}
