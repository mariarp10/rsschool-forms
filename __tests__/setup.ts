import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

HTMLDialogElement.prototype.showModal = vi.fn(function (
  this: HTMLDialogElement,
) {
  this.open = true;
});

HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
  this.open = false;
});
