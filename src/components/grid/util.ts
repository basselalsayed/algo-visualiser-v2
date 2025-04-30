import { match } from 'ts-pattern';

import { useGrid } from '@/hooks';
import { emitCustomEvent } from '@/lib';

import { NodeType } from './node-type.enum';

export function handleNodeClick({ type, xIndex, yIndex }: INode) {
  const { dispatch, endNode, startNode, wallMode } = useGrid.getState();

  return match({ endNode, startNode, type, wallMode })
    .returnType<NodeType>()
    .with({ type: NodeType.none, wallMode: true }, () => NodeType.wall)
    .with({ type: NodeType.wall, wallMode: true }, () => NodeType.none)
    .with({ startNode: undefined, type: NodeType.none }, () => {
      dispatch('startNode', [xIndex, yIndex]);
      emitCustomEvent('startSelected');

      return NodeType.start;
    })
    .with({ endNode: undefined, type: NodeType.none }, () => {
      dispatch('endNode', [xIndex, yIndex]);
      emitCustomEvent('endSelected');

      return NodeType.end;
    })
    .with({ type: NodeType.start }, () => {
      dispatch('startNode', undefined);

      return NodeType.none;
    })
    .with({ type: NodeType.end }, () => {
      dispatch('endNode', undefined);

      return NodeType.none;
    })
    .otherwise(() => type);
}

export function getDistance(p1: PointerEvent, p2: PointerEvent) {
  const dx = p2.clientX - p1.clientX;
  const dy = p2.clientY - p1.clientY;

  return Math.hypot(dx, dy);
}
