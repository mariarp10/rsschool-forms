import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

export const Portal: FC<PortalProps> = ({children}) => {
  const modalContainer = document.getElementById('modal-container');

  if (!modalContainer) {
    throw new Error('Modal container element not found');
  }
  
  return createPortal(children, modalContainer);
}