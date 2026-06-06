import { useState, useRef } from 'react';
import { Modal } from './components/modal/modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={openButtonref} onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        title="User information"
        triggerRef={openButtonref}
        handleClose={() => setIsModalOpen(false)}
      >
        <p>This modal will render forms</p>
      </Modal>
    </>
  );
}

export default App
