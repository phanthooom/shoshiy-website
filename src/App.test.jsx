import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

class IntersectionObserverMock {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {}
  unobserve() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

HTMLCanvasElement.prototype.getContext = () => {
  return {
    setTransform: vi.fn(),
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    beginPath: vi.fn(),
    arc: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    closePath: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
  };
};

describe('App Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});
