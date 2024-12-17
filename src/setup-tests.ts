import '@testing-library/jest-dom' // Adiciona matchers customizados para assertions no Jest

class IntersectionObserverMock {
  constructor(private callback: IntersectionObserverCallback) {}

  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock as any
