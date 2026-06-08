import {
  type FC,
  type ReactNode,
  type MouseEvent,
  type RefObject,
  useId,
  useRef,
  useEffect,
} from 'react';
import { CrossIcon } from '@icons/cross-icon';
import { Portal } from '@components/portal/portal';
import classNames from 'classnames/bind';
import styles from './modal.module.css';

const cn = classNames.bind(styles);

export type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  handleClose: () => void;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  title,
  triggerRef,
  handleClose,
}) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;

    if (!dialog || !isOpen) {
      return;
    }

    dialog.showModal();
    closeButtonRef.current?.focus();

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      trigger?.focus();
    };
  }, [isOpen, triggerRef]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <Portal>
      <dialog
        ref={dialogRef}
        className={cn('modal')}
        aria-labelledby={titleId}
        onCancel={handleClose}
        onMouseDown={handleBackdropClick}
      >
        <div className={cn('header')}>
          <h2 id={titleId}>{title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close modal"
            className={cn('close-button')}
            onClick={handleClose}
          >
            <CrossIcon />
          </button>
        </div>
        <div className={cn('content')}>{children}</div>
      </dialog>
    </Portal>
  );
};
