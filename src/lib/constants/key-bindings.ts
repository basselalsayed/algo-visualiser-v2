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

// --- GRID NAVIGATION KEYS ---
export const FOCUS_GRID = 'g' as const;
export const NAVIGATE_GRID_UP = 'ArrowUp' as const;
export const NAVIGATE_GRID_DOWN = 'ArrowDown' as const;
export const NAVIGATE_GRID_LEFT = 'ArrowLeft' as const;
export const NAVIGATE_GRID_RIGHT = 'ArrowRight' as const;

export const GRID_NAVIGATION_KEYS = [
  NAVIGATE_GRID_UP,
  NAVIGATE_GRID_DOWN,
  NAVIGATE_GRID_LEFT,
  NAVIGATE_GRID_RIGHT,
] as const;
export type T_GRID_NAVIGATION_KEYS = (typeof GRID_NAVIGATION_KEYS)[number];

// --- NODE EDIT KEYS ---
export const NODE_TYPE_CYCLE = ' ' as const;
export const NODE_TYPE_START = 's' as const;
export const NODE_TYPE_END = 'e' as const;
export const NODE_TYPE_WALL = 'w' as const;
export const NODE_TYPE_NONE = 'd' as const;

export const NODE_EDIT_KEYS = [
  NODE_TYPE_CYCLE,
  NODE_TYPE_START,
  NODE_TYPE_END,
  NODE_TYPE_WALL,
  NODE_TYPE_NONE,
] as const;
export type T_NODE_EDIT_KEYS = (typeof NODE_EDIT_KEYS)[number];

export const ALL_USED_KEYS = [
  ...ACTION_KEYS,
  ...COMMAND_SEARCH_KEYS,
  ...GRID_NAVIGATION_KEYS,
  ...NODE_EDIT_KEYS,
] as const;

export type T_ALL_USED_KEYS = (typeof ALL_USED_KEYS)[number];
