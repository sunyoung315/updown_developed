import { HomeIcon, MyPageIcon, CalendarIcon } from '@/assets/icons';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  z-index: 20;
`;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding-top: 0.3rem;
`;

const ButtonName = styled.div<{
  $iscalendar?: boolean;
  $ismain?: boolean;
  $ismypage?: boolean;
}>`
  font-size: 0.8rem;
  color: ${props =>
    props.$iscalendar
      ? props.theme.orange
      : props.$ismain
        ? props.theme.darkgreen
        : props.$ismypage
          ? props.theme.darkpink
          : props.theme.grey};
`;

const BottomNav = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const url = location.pathname;
    if (url.substring(0, 7) === '/mypage') setPath('mypage');
    else if (url.substring(0, 5) === '/main') setPath('main');
    else if (url.substring(0, 9) === '/calendar') setPath('calendar');
    else setPath('');
  }, [location.pathname]);

  useEffect(() => {});

  const goMain = () => {
    navigator('/main');
  };

  const goMyPage = () => {
    navigator('/mypage');
  };

  const goCalendar = () => {
    navigator('/calendar');
  };

  return (
    <BottomNavWrapper>
      <Button onClick={goCalendar}>
        <CalendarIcon
          color={path === 'calendar' ? 'orange' : 'grey'}
          size={25.5}
        />
        <ButtonName $iscalendar={path === 'calendar'}>달력</ButtonName>
      </Button>
      <Button onClick={goMain}>
        <HomeIcon color={path === 'main' ? 'darkgreen' : 'grey'} />
        <ButtonName $ismain={path === 'main'}>홈</ButtonName>
      </Button>
      <Button onClick={goMyPage}>
        <MyPageIcon color={path === 'mypage' ? 'darkpink' : 'grey'} />
        <ButtonName $ismypage={path === 'mypage'}>마이</ButtonName>
      </Button>
    </BottomNavWrapper>
  );
};

export default BottomNav;
