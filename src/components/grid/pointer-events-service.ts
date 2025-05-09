/* eslint-disable class-methods-use-this */

import { match } from 'ts-pattern';

import {
  NODE_SIZE_STEP,
  NodeType,
  PERFORMANCE_NODE_SIZE_THRESHOLD,
} from '@/lib';

export class PointerEventService {
  handleWallPointerDown = (e: PointerEvent) => {
    const node = e.target as HTMLDivElement | undefined;

    if (node?.hasPointerCapture(e.pointerId)) {
      node.releasePointerCapture(e.pointerId);
    }
  };

  handleWallPointerMove = (e: PointerEvent) => {
    const node = e.target as HTMLDivElement;
    if (!node?.dataset) return;

    const { type, xIndex, yIndex } = node.dataset;
    const key = `${xIndex},${yIndex}`;
    if (this.hoveredKey === key || this.toggledRecently.has(key)) return;

    this.hoveredKey = key;
    this.toggledRecently.add(key);
    setTimeout(() => this.toggledRecently.delete(key), 300);

    node.dataset.type = match(type as NodeType)
      .with(NodeType.wall, () => NodeType.none)
      .with(NodeType.none, () => NodeType.wall)
      .otherwise(() => type);
  };

  handleZoomPointerDown = (e: PointerEvent) => {
    this.pointers.push(e);

    if (this.pointers.length === 2) {
      this.initialPinchDistance = PointerEventService.getDistance(
        this.pointers[0],
        this.pointers[1]
      );
    }
  };

  handleZoomPointerMove = (
    e: PointerEvent,
    nodeSize: number,
    performanceMode: boolean,
    updateNodeSize: (size: number) => void
  ) => {
    const index = this.pointers.findIndex((p) => p.pointerId === e.pointerId);
    if (index === -1) {
      this.pointers.push(e);
    } else {
      this.pointers[index] = e;
    }

    if (this.pointers.length !== 2) return;

    const currentDistance = PointerEventService.getDistance(
      this.pointers[0],
      this.pointers[1]
    );
    const delta = currentDistance - this.initialPinchDistance;

    if (Math.abs(delta) <= 10) return;

    const sizeChange = delta > 0 ? NODE_SIZE_STEP : -NODE_SIZE_STEP;
    const newSize = nodeSize + sizeChange;

    if (
      sizeChange < 0 &&
      newSize <= PERFORMANCE_NODE_SIZE_THRESHOLD &&
      !performanceMode
    ) {
      this.pointers = [];
    }

    updateNodeSize(newSize);
    this.initialPinchDistance = currentDistance;
  };

  setInitialPinchDistance(distance: number) {
    this.initialPinchDistance = distance;
  }

  resetPointers() {
    this.pointers = [];
  }

  handlePointerUpOrCancel = (e: PointerEvent) => {
    this.toggledRecently.clear();
    this.pointers = this.pointers.filter((p) => p.pointerId !== e.pointerId);
    this.hoveredKey = undefined;
  };

  private static getDistance(p1: PointerEvent, p2: PointerEvent) {
    const dx = p2.clientX - p1.clientX;
    const dy = p2.clientY - p1.clientY;

    return Math.hypot(dx, dy);
  }

  private hoveredKey: string | undefined = undefined;
  private readonly toggledRecently = new Set<string>();
  private initialPinchDistance = 0;
  private pointers: PointerEvent[] = [];
}
