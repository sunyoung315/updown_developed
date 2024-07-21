import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '@/api/auth';
import { ImgIcon } from '@/assets/icons';
import { Header, Button } from '@/components';
import { tokenStore } from '@/store';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { Member } from '@/types/type';
import TargetIcon from '@/assets/icons/target-icon.svg';
import Running from '@/assets/images/running.png';
import styled from 'styled-components';

const MyPageWrapper = styled.div`
  margin: 1rem 1.8rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ImageBox = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.pink};
  margin-left: auto;
  margin-right: auto;
  position: relative;
`;

const ImageIcon = styled.button`
  position: absolute;
  bottom: -11%;
  right: -13%;
`;

const Image = styled.img`
  width: 90%;
  margin: 5%;
`;

const Hr = styled.div`
  background-color: ${props => props.theme.lightgrey};
  height: 0.1rem;
  border: none;
  margin: 1.5rem 0 1rem;
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

const TextButton = styled.button`
  color: ${props => props.theme.grey};
  text-decoration: underline;
  font-size: 1rem;
  position: absolute;
  bottom: 0;
  right: 0;
  // bottom: 4.5rem;
  // right: 2.1rem;
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
          setLoseWeight(response.data?.nowWeight - response.data?.recentWeight);
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
    navigator('/main');
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

  const goMyEditPage = () => {
    navigator('/mypage/edit', { state: { myInfo } });
  };

  // 회원 탈퇴
  const deleteMember = async () => {
    try {
      const response = await useAxios.delete('/auth/delete');
      if (response.status === httpStatusCode.OK) {
        console.log('회원탈퇴 성공');
        setAccessToken('');
        navigator('/');
      }
    } catch (err) {
      console.log('회원탈퇴 에러:', err);
    }
  };

  return (
    <>
      <Header
        iconName="back"
        onClick={goBack}
        mypage={true}
        logout={logout}
        headerName="마이페이지"
      />
      <MyPageWrapper>
        <ImageBox>
          <Image src={Running} alt="themeImg" />
          <ImageIcon>
            <ImgIcon fillColor="darkpink" />
          </ImageIcon>
        </ImageBox>
        <Hr />
        <div>
          <Button
            buttonName="나의 목표"
            color="transparent"
            textColor="black"
            size={6}
            onClick={goMyEditPage}
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
        <TextButton onClick={deleteMember}>회원탈퇴</TextButton>
      </MyPageWrapper>
    </>
  );
};

export default MyPage;
