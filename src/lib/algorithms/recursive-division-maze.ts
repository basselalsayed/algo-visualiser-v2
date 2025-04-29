import { NodeType } from '@/components/grid/node-type.enum';
import { type Duration, sleep } from '@/lib';

export class Maze {
  constructor(
    private readonly grid: NodeMap,
    private readonly animationSpeed: Duration,
    readonly onDone?: VoidFunction
  ) {
    this.cols = Math.max(...[...this.grid.keys()].map(([x]) => x)) + 1;
    this.rows = Math.max(...[...this.grid.keys()].map(([, y]) => y)) + 1;

    this.run = this.run.bind(this);
  }

  cols: number;
  rows: number;

  wallIsHorizontal(this: this, width: number, height: number): boolean {
    return height > width;
  }

  async run(this: this) {
    await this.wallBorders();
    void this.divide(2, 2, this.cols - 2, this.rows - 2);
  }

  randomiseValue(this: this, value: number): number {
    return Math.floor(Math.random() * value);
  }

  async wallBorders(this: this) {
    const duration = this.animationSpeed.divide(6);
    //top
    for (let i = 0; i < this.cols; i++) {
      await this.animateWall(this.getNodeFromPosition(i, 0), duration);
    }
    //right
    for (let i = 0; i < this.rows; i++) {
      await this.animateWall(
        this.getNodeFromPosition(this.cols - 1, i),
        duration
      );
    }
    //bottom
    for (let i = this.cols - 1; i >= 0; i--) {
      await this.animateWall(
        this.getNodeFromPosition(i, this.rows - 1),
        duration
      );
    }
    // left
    for (let i = this.rows - 1; i >= 0; i--) {
      await this.animateWall(this.getNodeFromPosition(0, i), duration);
    }
  }

  getNodeFromPosition(this: this, x: number, y: number): INode {
    if (!this.grid.has([x, y])) throw new Error('Invalid coordinates');

    return this.grid.get([x, y])!;
  }

  async divide(
    this: this,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    // if the area is too small to divide
    if (width < 2 || height < 2) {
      this.onDone?.();
      return;
    }

    const horizontal = this.wallIsHorizontal(width, height);

    const wallLength = horizontal ? width : height;

    // Wall starting point
    const wallX = horizontal ? x : x + this.randomiseValue(width - 2);
    const wallY = horizontal ? y + this.randomiseValue(height - 2) : y;

    for (let i = 0; i < wallLength; i++) {
      const node = horizontal
        ? this.getNodeFromPosition(wallX + i, wallY)
        : this.getNodeFromPosition(wallX, wallY + i);

      await this.animateWall(node);
    }

    const passageIndex = this.randomiseValue(wallLength - 1);

    const passageNode = horizontal
      ? this.getNodeFromPosition(wallX + passageIndex, wallY)
      : this.getNodeFromPosition(wallX, wallY + passageIndex);
    passageNode.setType(NodeType.none);
    if (horizontal) {
      void this.divide(x, y, width, wallY - y); // upper part
      void this.divide(x, wallY + 2, width, y + height - wallY - 2); // lower part
    } else {
      void this.divide(x, y, wallX - x, height); // left part
      void this.divide(wallX + 2, y, x + width - wallX - 2, height); // right part
    }
  }

  async animateWall(
    this: this,
    node: INode,
    duration = this.animationSpeed
  ): Promise<void> {
    if (node.isNone) node.setType(NodeType.wall);

    await sleep(duration.inMillis);
  }

  getNotWallNeighbors(this: this, node: INode): number {
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
