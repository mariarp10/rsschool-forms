import { screen, render } from '@testing-library/react';
import { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import { Modal, type ModalProps } from './modal';

const createDefaultProps = (): ModalProps => ({
  isOpen: true,
  title: 'User information',
  children: <p>Modal content</p>,
  triggerRef: createRef<HTMLButtonElement>(),
  handleClose: vi.fn(),
});

const renderModal = (props?: Partial<ModalProps>) => {
  const defaultProps = createDefaultProps();

  return render(<Modal {...defaultProps} {...props} />);
};

describe('Modal component', () => {
  beforeEach(() => {
    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-container');
    document.body.append(modalContainer);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders modal with a close button and passed children', () => {
    renderModal();

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /User information/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  test('does not render modal when isOpen is false', () => {
    renderModal({ isOpen: false });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('calls handleClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderModal({ handleClose });

    const closeButton = screen.getByRole('button');

    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls handleClose when backdrop is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    renderModal({ handleClose });

    await user.click(screen.getByRole('dialog'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('modal stays open when user clicks on modal content', async () => {
    const user = userEvent.setup();

    renderModal();

    await user.click(screen.getByText(/modal content/i));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('focuses on close button when modal is opened', () => {
    renderModal();

    expect(screen.getByRole('button')).toHaveFocus();
  });
});
