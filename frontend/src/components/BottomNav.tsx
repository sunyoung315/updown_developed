import styled from 'styled-components';

const BottomNavWrapper = styled.div`
  height: 3.25rem;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.white};
`;

const BottomNav = () => {
  return (
    <BottomNavWrapper>
      <div>단식</div>
      <div>HOME</div>
      <div>마이페이지</div>
    </BottomNavWrapper>
  );
};

export default BottomNav;
