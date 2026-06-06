import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

const modalContainer = document.getElementById('modal-container');

if (!modalContainer) {
  throw new Error('Modal container element not found');
}

type PortalProps = {
  children: ReactNode;
};

export const Portal: FC<PortalProps> = ({children}) => {
  return createPortal(children, modalContainer);
}