import { useEffect } from 'react';
import { modalProps } from '@/types/type';
import { IconButton } from '@/components';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalWraper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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
  background-color: ${props => props.theme.darkgrey};
  opacity: 40%;
`;

const ModalBox = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: 1rem;
  width: 90%;
  height: 60%;
  max-width: 400px;
  padding: 1.3rem 1.5rem;
  z-index: 150;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.div`
  font-size: 1.35rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const ModalContent = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const Modal = (modalProps: modalProps) => {
  const { isOpen, onClose, title, children } = modalProps;
  const portalElement = document.getElementById('modal') as HTMLElement;

  // 모달이 열렸을 때 배경화면의 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <ModalWraper>
      <BackDrop onClick={onClose}></BackDrop>
      <ModalBox>
        <ModalTitle>
          <div>{title}</div>
          <IconButton iconName="close" onClick={onClose} size={1.6} />
        </ModalTitle>
        <ModalContent>{children}</ModalContent>
      </ModalBox>
    </ModalWraper>,
    portalElement,
  );
};

export default Modal;
