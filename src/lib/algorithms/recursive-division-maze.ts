import { NodeMap } from '@/hooks/useGrid';

import { sleep } from '../utils';
import { Node } from './types';
import { NodeType } from '@/components/grid/node-type.enum';

export class RecursiveDivisionMaze {
  constructor(public readonly grid: NodeMap) {
    this.run = this.run.bind(this);
  }

  cols = Math.max(...[...this.grid.keys()].map(([x]) => x)) + 1;
  rows = Math.max(...[...this.grid.keys()].map(([, y]) => y)) + 1;

  wallIsHorizontal(this: this, width: number, height: number): boolean {
    return height > width;
  }

  async run(this: this) {
    await this.wallBorders();
    this.recursiveDivision(2, 2, this.cols - 2, this.rows - 2);
  }

  randomiseValue(this: this, value: number): number {
    return Math.floor(Math.random() * value);
  }

  async wallBorders(this: this) {
    //top
    for (let i = 0; i < this.cols; i++) {
      await this.animateWall(this.getNodeFromPosition(i, 0), 5);
    }
    //right
    for (let i = 0; i < this.rows; i++) {
      await this.animateWall(this.getNodeFromPosition(this.cols - 1, i), 5);
    }
    //bottom
    for (let i = this.cols - 1; i >= 0; i--) {
      await this.animateWall(this.getNodeFromPosition(i, this.rows - 1), 5);
    }
    // left
    for (let i = this.rows - 1; i >= 0; i--) {
      await this.animateWall(this.getNodeFromPosition(0, i), 5);
    }
  }

  getNodeFromPosition(this: this, x: number, y: number): Node {
    if (!this.grid.has([x, y])) throw new Error('Invalid coordinates');

    return this.grid.get([x, y])!;
  }

  async recursiveDivision(
    this: this,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    // if the area is too small to divide
    if (width < 2 || height < 2) return;

    const horizontal = this.wallIsHorizontal(width, height);

    const wallLength = horizontal ? width : height;

    // Wall starting point
    const wallX = horizontal ? x : x + this.randomiseValue(width - 2);
    const wallY = horizontal ? y + this.randomiseValue(height - 2) : y;

    for (let i = 0; i < wallLength; i++) {
      const node = horizontal
        ? this.getNodeFromPosition(wallX + i, wallY)
        : this.getNodeFromPosition(wallX, wallY + i);

      this.animateWall(node);

      await sleep(10);
    }

    const passageIndex = this.randomiseValue(wallLength - 1);

    const passageNode = horizontal
      ? this.getNodeFromPosition(wallX + passageIndex, wallY)
      : this.getNodeFromPosition(wallX, wallY + passageIndex);
    passageNode.setState({ type: NodeType.none });
    if (horizontal) {
      this.recursiveDivision(x, y, width, wallY - y); // upper part
      this.recursiveDivision(x, wallY + 2, width, y + height - wallY - 2); // lower part
    } else {
      this.recursiveDivision(x, y, wallX - x, height); // left part
      this.recursiveDivision(wallX + 2, y, x + width - wallX - 2, height); // right part
    }
  }

  async animateWall(this: this, node: Node, ms = 10): Promise<void> {
    node.setState({ type: NodeType.wall });
    await sleep(ms);
  }

  getNotWallNeighbors(this: this, node: Node): number {
    const { xIndex, yIndex } = node;

    const directions = [
      { x: -1, y: 0 }, // left
      { x: 1, y: 0 }, // right
      { x: 0, y: -1 }, // up
      { x: 0, y: 1 }, // down
    ];

    return directions
      .map(({ x, y }) => this.grid.get([xIndex + x, yIndex + y]))
      .filter((neighbor) => neighbor && !neighbor.isWall).length;
  }
}
