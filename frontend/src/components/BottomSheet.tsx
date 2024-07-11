import { useEffect } from 'react';
import { bottomSheetProps } from '@/types/type';
import { IconButton } from '@/components';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const ModalWraper = styled.div<{ $signup?: boolean }>`
  position: fixed;
  bottom: ${props => (props?.$signup ? '0' : '3.25rem')};
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
  background-color: ${props => props.theme.darkgrey};
  opacity: 40%;
`;

const Modal = styled.div<{ $nomodal?: boolean }>`
  background-color: ${props =>
    props?.$nomodal ? 'transparent' : props.theme.white};
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  max-width: 430px;
  max-height: 90%;
  padding: 1.5rem 0;
  box-shadow: ${props =>
    props?.$nomodal ? 'none' : '0 -3px 10px rgba(0, 0, 0, 0.2)'};
  z-index: 15;
  display: flex;
  flex-direction: column;
`;

const ModalTitle = styled.div`
  padding: 0 2rem;
  font-size: 1.63rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  flex-shrink: 0;
`;

const ModalContent = styled.div`
  padding: 0 2rem;
  overflow-y: auto;
  flex-grow: 1;
`;

const BottomSheet = (bottomSheetProps: bottomSheetProps) => {
  const { isOpen, onClose, title, children, noModal, signup } =
    bottomSheetProps;
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
    <ModalWraper $signup={signup}>
      <BackDrop onClick={onClose}></BackDrop>
      <Modal $nomodal={noModal}>
        {!noModal && (
          <ModalTitle>
            <div>{title}</div>
            <IconButton iconName="close" onClick={onClose} size={1.6} />
          </ModalTitle>
        )}
        <ModalContent>{children}</ModalContent>
      </Modal>
    </ModalWraper>,
    portalElement,
  );
};

export default BottomSheet;
