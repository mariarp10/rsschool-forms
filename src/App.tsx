import { useState, useRef } from 'react';
import { Modal } from './components/modal/modal';
import { UncontrolledForm } from '@components/uncontrolled-form/uncontrolled-form';
import { Profiles } from '@components/profiles/profiles';
import { ControlledForm } from '@components/controlled-form/controlled-form';

type ActiveForm = 'uncontrolled' | 'controlled' | null;

const App = () => {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);

  const openUncontrolledRef = useRef<HTMLButtonElement>(null);
  const openControlledRef = useRef<HTMLButtonElement>(null);

  const triggerRef =
    activeForm === 'uncontrolled' ? openUncontrolledRef : openControlledRef;

  const closeModal = () => {
    setActiveForm(null);
  };

  const isModalOpen = activeForm !== null;

  return (
    <>
      <button
        ref={openUncontrolledRef}
        type="button"
        onClick={() => setActiveForm('uncontrolled')}
      >
        Uncontrolled form
      </button>

      <button
        ref={openUncontrolledRef}
        type="button"
        onClick={() => setActiveForm('controlled')}
      >
        Controlled form
      </button>

      <Modal
        isOpen={isModalOpen}
        title="User information"
        triggerRef={triggerRef}
        handleClose={closeModal}
      >
        {activeForm === 'uncontrolled' && (
          <UncontrolledForm closeModal={closeModal} />
        )}

        {activeForm === 'controlled' && (
          <ControlledForm closeModal={closeModal} />
        )}
      </Modal>
      <Profiles />
    </>
  );
};

export default App;
