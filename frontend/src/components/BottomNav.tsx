import FastIcon from '@/assets/icons/fast-icon.svg';
import HomeIcon from '@/assets/icons/home-icon.svg';
import MypageIcon from '@/assets/icons/mypage-icon.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BottomNavWrapper = styled.div`
  max-width: 430px;
  width: 100%;
  height: 3.25rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.white};
  box-shadow: 0rem -0.1rem 0.5rem rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ButtonName = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.grey};
`;

const BottomNav = () => {
  const navigator = useNavigate();

  const goMain = () => {
    navigator('/main');
  };

  const goMyPage = () => {
    navigator('/mypage');
  };

  return (
    <BottomNavWrapper>
      <Button>
        <img src={FastIcon} alt="fast" />
        <ButtonName>단식</ButtonName>
      </Button>
      <Button onClick={goMain}>
        <img src={HomeIcon} alt="home" />
        <ButtonName>홈</ButtonName>
      </Button>
      <Button onClick={goMyPage}>
        <img src={MypageIcon} alt="mypage" />
        <ButtonName>마이</ButtonName>
      </Button>
    </BottomNavWrapper>
  );
};

export default BottomNav;
