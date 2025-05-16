/* eslint-disable @typescript-eslint/consistent-type-imports */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NodeType, emitCustomEvent } from '@/lib';
import { isRunning, useGrid } from '@/store';

import { handleNodeClick } from './util';

vi.mock('@/lib', async () => {
  const actual = await vi.importActual<typeof import('@/lib')>('@/lib');
  return {
    ...actual,
    emitCustomEvent: vi.fn(),
  };
});

vi.mock('@/store', async () => {
  const actual = await vi.importActual<typeof import('@/store')>('@/store');
  return {
    ...actual,
    isRunning: vi.fn(),
  };
});

describe('handleNodeClick', () => {
  const mockDispatch = vi.fn();
  const mockEmit = emitCustomEvent as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    (isRunning as ReturnType<typeof vi.fn>).mockReturnValue({
      anyRunning: false,
    });
    useGrid.setState({
      dispatch: mockDispatch,
      endNode: [5, 5],
      startNode: [1, 1],
      wallMode: false,
    });
  });

  const baseNode = { xIndex: 2, yIndex: 2 } as INode;

  it('returns original type if algorithm is running', () => {
    (isRunning as ReturnType<typeof vi.fn>).mockReturnValue({
      anyRunning: true,
    });
    const result = handleNodeClick({ ...baseNode, type: NodeType.start });
    expect(result).toBe(NodeType.start);
  });

  it('toggles to wall when wallMode is on and node is empty', () => {
    useGrid.setState({ wallMode: true });
    const result = handleNodeClick({ ...baseNode, type: NodeType.none });
    expect(result).toBe(NodeType.wall);
  });

  it('toggles to none when wallMode is on and node is wall', () => {
    useGrid.setState({ wallMode: true });
    const result = handleNodeClick({ ...baseNode, type: NodeType.wall });
    expect(result).toBe(NodeType.none);
  });

  it('sets start node if undefined and type is none', () => {
    useGrid.setState({ startNode: undefined });
    const result = handleNodeClick({ ...baseNode, type: NodeType.none });
    expect(mockDispatch).toHaveBeenCalledWith('startNode', [2, 2]);
    expect(mockEmit).toHaveBeenCalledWith('startSelected');
    expect(result).toBe(NodeType.start);
  });

  it('sets end node if undefined and type is none', () => {
    useGrid.setState({ endNode: undefined, startNode: [1, 1] });
    const result = handleNodeClick({ ...baseNode, type: NodeType.none });
    expect(mockDispatch).toHaveBeenCalledWith('endNode', [2, 2]);
    expect(mockEmit).toHaveBeenCalledWith('endSelected');
    expect(result).toBe(NodeType.end);
  });

  it('clears start node when type is start', () => {
    const result = handleNodeClick({ ...baseNode, type: NodeType.start });
    expect(mockDispatch).toHaveBeenCalledWith('startNode', undefined);
    expect(result).toBe(NodeType.none);
  });

  it('clears end node when type is end', () => {
    const result = handleNodeClick({ ...baseNode, type: NodeType.end });
    expect(mockDispatch).toHaveBeenCalledWith('endNode', undefined);
    expect(result).toBe(NodeType.none);
  });

  it('returns type unchanged when nothing matches', () => {
    const result = handleNodeClick({ ...baseNode, type: NodeType.wall });
    expect(result).toBe(NodeType.wall);
  });
});
