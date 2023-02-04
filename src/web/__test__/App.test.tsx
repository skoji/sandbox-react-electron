import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { App } from '../App';

(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

let container: any;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  document.body.removeChild(container);
  container.remove();
  container = null;
});

it('will rendered', () => {
  act(() => {
    createRoot(container).render(<App />);
  });
  expect(container.textContent).toBe("Hello.");
});
