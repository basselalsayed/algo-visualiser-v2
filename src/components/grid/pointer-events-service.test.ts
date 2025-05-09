/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  NODE_SIZE_STEP,
  NodeType,
  PERFORMANCE_NODE_SIZE_THRESHOLD,
} from '@/lib';

import { PointerEventService } from './pointer-events-service';

function createMockPointerEvent(
  props: Partial<PointerEvent> = {}
): PointerEvent {
  return {
    clientX: 0,
    clientY: 0,
    pointerId: 1,
    ...props,
  } as PointerEvent;
}

describe('PointerEventService', () => {
  let service: PointerEventService;

  beforeEach(() => {
    service = new PointerEventService();
  });

  it('should release pointer capture if node has it', () => {
    const mockNode = {
      hasPointerCapture: vi.fn().mockReturnValue(true),
      releasePointerCapture: vi.fn(),
    } as unknown as HTMLDivElement;

    const event = createMockPointerEvent({ target: mockNode });
    service.handleWallPointerDown(event);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockNode.releasePointerCapture).toHaveBeenCalledWith(
      event.pointerId
    );
  });

  it('should toggle node type from wall to none on move', () => {
    const dataset = {
      type: NodeType.wall,
      xIndex: '2',
      yIndex: '3',
    };
    const node = { dataset } as unknown as HTMLDivElement;
    const event = createMockPointerEvent({ target: node });

    service.handleWallPointerMove(event);
    expect(dataset.type).toBe(NodeType.none);
  });

  it('should toggle from none to wall', () => {
    const dataset = {
      type: NodeType.none,
      xIndex: '4',
      yIndex: '5',
    };
    const node = { dataset } as unknown as HTMLDivElement;
    const event = createMockPointerEvent({ target: node });

    service.handleWallPointerMove(event);
    expect(dataset.type).toBe(NodeType.wall);
  });

  it('should add pointer and calculate initial pinch distance when second pointer added', () => {
    const e1 = createMockPointerEvent({ clientX: 0, clientY: 0, pointerId: 1 });
    const e2 = createMockPointerEvent({ clientX: 3, clientY: 4, pointerId: 2 });

    service.handleZoomPointerDown(e1);
    service.handleZoomPointerDown(e2);

    expect((service as any).initialPinchDistance).toBe(5);
  });

  it('should update node size on zoom in (distance increase)', () => {
    const e1 = createMockPointerEvent({ clientX: 0, clientY: 0, pointerId: 1 });
    const e2 = createMockPointerEvent({
      clientX: 0,
      clientY: 10,
      pointerId: 2,
    });

    service.handleZoomPointerDown(e1);
    service.handleZoomPointerDown(e2);

    const moveEvent = createMockPointerEvent({
      clientX: 0,
      clientY: 25,
      pointerId: 2, // increased distance
    });

    const updateNodeSize = vi.fn();
    service.handleZoomPointerMove(moveEvent, 20, false, updateNodeSize);

    expect(updateNodeSize).toHaveBeenCalledWith(20 + NODE_SIZE_STEP);
  });

  it('should clear pointers when zooming out below threshold in non-performance mode', () => {
    const e1 = createMockPointerEvent({ clientX: 0, clientY: 0, pointerId: 1 });
    const e2 = createMockPointerEvent({
      clientX: 0,
      clientY: 15,
      pointerId: 2,
    });

    service.handleZoomPointerDown(e1);
    service.handleZoomPointerDown(e2);

    const moveEvent = createMockPointerEvent({
      clientX: 0,
      clientY: 0,
      pointerId: 2,
    });

    const updateNodeSize = vi.fn();
    service.handleZoomPointerMove(
      moveEvent,
      PERFORMANCE_NODE_SIZE_THRESHOLD,
      false,
      updateNodeSize
    );

    expect((service as any).pointers).toHaveLength(0);
    expect(updateNodeSize).toHaveBeenCalled();
  });

  it('should not update size if delta is within threshold (<=10)', () => {
    const e1 = createMockPointerEvent({ clientX: 0, clientY: 0, pointerId: 1 });
    const e2 = createMockPointerEvent({
      clientX: 0,
      clientY: 10,
      pointerId: 2,
    });

    service.handleZoomPointerDown(e1);
    service.handleZoomPointerDown(e2);

    const moveEvent = createMockPointerEvent({
      clientX: 0,
      clientY: 15,
      pointerId: 2,
    });
    const updateNodeSize = vi.fn();

    service.handleZoomPointerMove(moveEvent, 30, false, updateNodeSize);
    expect(updateNodeSize).not.toHaveBeenCalled();
  });

  it('should clear toggledRecently, remove pointer, and reset hoveredKey on pointer up/cancel', () => {
    (service as any).toggledRecently.add('0,0');
    (service as any).hoveredKey = '0,0';
    (service as any).pointers.push(createMockPointerEvent({ pointerId: 1 }));

    const event = createMockPointerEvent({ pointerId: 1 });
    service.handlePointerUpOrCancel(event);

    expect((service as any).toggledRecently.size).toBe(0);
    expect((service as any).pointers.length).toBe(0);
    expect((service as any).hoveredKey).toBeUndefined();
  });
});
