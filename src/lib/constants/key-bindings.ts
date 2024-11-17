// --- ACTION KEYS ---
export const OPEN_COMMAND_KEY = 'k' as const;
export const RUN_ALGO_KEY = 'b' as const;
export const RUN_MAZE_KEY = 'm' as const;

export const ACTION_KEYS = [
  OPEN_COMMAND_KEY,
  RUN_ALGO_KEY,
  RUN_MAZE_KEY,
] as const;
export type T_ACTION_KEYS = (typeof ACTION_KEYS)[number];

// --- COMMAND SEARCH KEYS ---
export const EDIT_NODE_SIZE = 'y' as const;
export const EDIT_GRID_WIDTH = 'u' as const;
export const EDIT_GRID_HEIGHT = 'i' as const;
export const EDIT_DRAW_SQUARE = 'o' as const;
export const EDIT_ANIMATION_SPEED = 'p' as const;
export const EDIT_ALGORITHM = 'a' as const;

export const COMMAND_SEARCH_KEYS = [
  EDIT_NODE_SIZE,
  EDIT_GRID_WIDTH,
  EDIT_GRID_HEIGHT,
  EDIT_DRAW_SQUARE,
  EDIT_ANIMATION_SPEED,
  EDIT_ALGORITHM,
] as const;
export type T_COMMAND_SEARCH_KEYS = (typeof COMMAND_SEARCH_KEYS)[number];

