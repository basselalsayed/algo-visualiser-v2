if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query: string) => ({
    // deprecated
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    // deprecated
    removeListener: vi.fn(),
  });
}

class ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

if (!globalThis.ResizeObserver) {
  globalThis.ResizeObserver = ResizeObserver;
}
