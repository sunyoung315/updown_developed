import { Header } from '@/components';
import { FirstPage, SecondPage } from './components';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Member } from '@/types/type';
import styled from 'styled-components';

const SignUpWrapper = styled.div`
  padding: 0 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SignUpPage = () => {
  const navigator = useNavigate();

  const [data, setData] = useState<Member>({
    gender: '',
    age: 0,
    height: 0,
    nowWeight: 0,
    targetWeight: 0,
    activeLevel: '',
    targetCalories: 0,
  });

  const [next, setNext] = useState<boolean>(false);

  const signUp = async () => {
    try {
      const response = await useAxios.post('/auth/signup', data);
      if (response.status === httpStatusCode.OK) {
        navigator('/main');
      }
    } catch (error) {
      console.log('회원가입 에러: ', error);
    }
  };

  const goBack = () => {
    if (!next) {
      navigator('/');
    } else {
      setNext(false);
    }
  };

  return (
    <>
      <Header iconName="back" onClick={goBack} />
      <SignUpWrapper>
        {!next ? (
          <FirstPage data={data} setData={setData} setNext={setNext} />
        ) : (
          <SecondPage
            data={data}
            setData={setData}
            next={next}
            onClick={signUp}
          />
        )}
      </SignUpWrapper>
    </>
  );
};

export default SignUpPage;
