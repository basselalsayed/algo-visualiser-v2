import { match } from 'ts-pattern';

import { NodeType, emitCustomEvent } from '@/lib';
import { isRunning, useGrid } from '@/store';

export function handleNodeClick({ type, xIndex, yIndex }: INode) {
  const { dispatch, endNode, startNode, wallMode } = useGrid.getState();

  if (isRunning().anyRunning) return type;

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
