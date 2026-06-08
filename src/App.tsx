import { useState, useRef } from 'react';
import { Modal } from './components/modal/modal';
import { UncontrolledForm } from '@components/uncontrolled-form/uncontrolled-form';
import { Profiles } from '@components/profiles/profiles';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={openButtonref} onClick={() => setIsModalOpen(true)}>
        Uncontrolled form
      </button>
      <Modal
        isOpen={isModalOpen}
        title="User information"
        triggerRef={openButtonref}
        handleClose={() => setIsModalOpen(false)}
      >
        <UncontrolledForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
      <Profiles />
    </>
  );
};

export default App;
