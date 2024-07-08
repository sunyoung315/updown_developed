import { bottomSheetProps } from '@/types/type';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalWraper = styled.div`
  position: fixed;
  bottom: 3.25rem;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 10;
  font-family: omyudapretty;
`;

const BackDrop = styled.div`
  margin: auto;
  max-width: 430px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.grey};
  opacity: 40%;
`;

const Modal = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  max-width: 430px;
  max-height: 50rem;
  padding: 1.5rem 2rem;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.2);
  z-index: 15;
`;

const BottomSheet = (bottomSheetProps: bottomSheetProps) => {
  const { isOpen, onClose, children } = bottomSheetProps;
  const portalElement = document.getElementById('modal') as HTMLElement;

  if (!isOpen) return null;

  return createPortal(
    <ModalWraper>
      <BackDrop onClick={onClose}></BackDrop>
      <Modal>{children}</Modal>
    </ModalWraper>,
    portalElement,
  );
};

export default BottomSheet;
