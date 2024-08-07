import { Header } from '@/components';
import { FirstPage, SecondPage } from './components';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Member } from '@/types/type';
import styled from 'styled-components';

const MyEditPageWrapper = styled.div`
  padding: 0 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 5.5rem;
`;

const MyEditPage = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const myInfo = location.state.myInfo;
  // 이전에 설정해둔 targetCalories
  const targetCalories = myInfo.targetCalories;

  const [data, setData] = useState<Member>(myInfo);
  const [next, setNext] = useState<boolean>(false);

  // 기본정보 수정
  const editMyInfo = async () => {
    try {
      const response = await useAxios.put('/mypage/info', data);
      if (response.status === httpStatusCode.OK) {
        navigator('/mypage');
      }
    } catch (error) {
      console.log('기본정보 수정 에러: ', error);
    }
  };

  const goBack = () => {
    if (!next) {
      navigator('/mypage');
    } else {
      setNext(false);
    }
  };

  return (
    <>
      <Header iconName="back" onClick={goBack} />
      <MyEditPageWrapper>
        {!next ? (
          <FirstPage data={data} setData={setData} setNext={setNext} />
        ) : (
          <SecondPage
            data={data}
            setData={setData}
            next={next}
            onClick={editMyInfo}
            targetCalories={targetCalories}
          />
        )}
      </MyEditPageWrapper>
    </>
  );
};

export default MyEditPage;
