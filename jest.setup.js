import "@testing-library/jest-dom";

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = jest.fn();

// Mock Date.now for consistent testing
global.Date.now = jest.fn(() => new Date("2026-06-01T10:00:00Z").getTime());
