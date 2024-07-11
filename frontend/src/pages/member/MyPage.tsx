import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/api/auth';
import { Header, Button } from '@/components';
import { tokenStore } from '@/store';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { Member } from '@/types/type';
import TargetIcon from '@/assets/icons/target-icon.svg';
import styled from 'styled-components';

const MyPageWrapper = styled.div`
  padding: 0 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const Box = styled.div`
  background-color: ${props => props.theme.lightgrey};
  border-radius: 0.63rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 0.4rem;
`;

const Column = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Target = styled.div`
  margin-top: 3rem;
  text-align: right;
  color: ${props => props.theme.grey};
`;

const Kilogram = styled.span`
  color: ${props => props.theme.black};
  font-size: 1.4rem;
`;

const MyPage = () => {
  const { checkToken } = tokenStore();

  const [myInfo, setMyInfo] = useState<Member>();
  const [loseWeight, setLoseWeight] = useState<number>(0);

  useEffect(() => {
    const getMyPageInfo = async () => {
      try {
        const response = await useAxios.get('/mypage');

        if (response.status === httpStatusCode.OK) {
          setMyInfo(response.data);
          // 가장 최근 등록한 몸무게와 최초 몸무게의 차
          setLoseWeight(response.data?.recentWeight - response.data?.nowWeight);
        }
      } catch (err) {
        console.log('마이페이지 조회 에러:', err);
      }
    };

    // 토큰 확인이 완료되면 마이페이지 정보 가져오기
    if (checkToken) {
      getMyPageInfo();
    }
  }, [checkToken]);

  const navigator = useNavigate();
  const goBack = () => {
    navigator(-1);
  };

  const logout = async () => {
    try {
      const response = await useAxios.get('/auth/logout');
      if (response.status === httpStatusCode.OK) {
        console.log('로그아웃 성공');
        // 로그아웃 후 access token 초기화
        setAccessToken('');
        navigator('/');
      }
    } catch (err) {
      console.log('로그아웃 에러:', err);
    }
  };

  return (
    <>
      <Header iconName="close" onClick={goBack} mypage={true} logout={logout} />
      <MyPageWrapper>
        <div>
          <Button
            buttonName="나의 목표"
            color="transparent"
            textColor="black"
            size={6}
          />
          <Box>
            <Content>
              <Column>
                <span>목표 체중</span>
                <span>{myInfo?.targetWeight} kcal</span>
              </Column>
              <Column>
                <span>목표 칼로리</span>
                <span>{myInfo?.targetCalories} kcal</span>
              </Column>
            </Content>
            <Target>
              <img src={TargetIcon} alt="icon" /> 지금까지{' '}
              <Kilogram>{loseWeight} kg</Kilogram> 감량했어요!
            </Target>
          </Box>
        </div>
      </MyPageWrapper>
    </>
  );
};

export default MyPage;
