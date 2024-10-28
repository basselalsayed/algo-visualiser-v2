import { ArrayKeyMap } from '@/lib/array-key-map';

export type NodeCoordinates = [x: number, y: number];
export type NodeMap = ArrayKeyMap<NodeCoordinates, Node>;
