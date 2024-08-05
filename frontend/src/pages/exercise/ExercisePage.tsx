import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, BottomSheet, Button, Header, IconButton } from '@/components';
import { Exercise, ExerciseInfo } from '@/types/type';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import Running from '/images/running.png';
import styled from 'styled-components';

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.blue};
  text-align: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin: 1.5rem 0;
`;

const Info = styled.span`
  font-size: 1.8rem;
  color: ${props => props.theme.white};
`;

const Text = styled.span`
  font-size: 1.25rem;
  color: ${props => props.theme.black};
`;

const ImageBox = styled.div`
  width: 13rem;
  height: 13rem;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.skyblue};
  margin-left: auto;
  margin-right: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageIcon = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  margin: 5%;
`;

const ExerciseListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.7rem 1.7rem 3.25rem;
`;

const TodayCount = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.black};
  padding-left: 0.5rem;
  padding-bottom: 1rem;
`;

const Count = styled.span`
  color: ${props => props.theme.blue};
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 1.3rem;
  column-gap: 1.3rem;
  padding: 1rem 0 1rem;
`;

const ButtonBox = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$gap}rem;
`;

const ExercisePage = () => {
  const navigator = useNavigate();

  const goMain = () => {
    navigator('/main');
  };

  const regDate = localStorage.getItem('date');

  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInfo>();
  const [exerciseList, setExerciseList] = useState<Exercise[]>();
  const recentWeight = useRef<number>(0);
  const [refreshed, setRefreshed] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 운동 리스트 조회
  const getExerciseList = async () => {
    try {
      const response = await useAxios.get(`/exercise/list/${regDate}`);

      if (response.status === httpStatusCode.OK) {
        setExerciseList(response.data.exerciseList);
        setExerciseInfo(response.data.exerciseInfo);
        recentWeight.current = response.data.exerciseInfo.recentWeight;
      } else if (response.status === httpStatusCode.NOCONTENT) {
        setExerciseList(undefined);
        setExerciseInfo(undefined);
        recentWeight.current = 0;
      }
    } catch (err) {
      console.log('운동 리스트 조회 에러:', err);
    }
  };

  useEffect(() => {
    getExerciseList();
    setRefreshed(false);
  }, [refreshed]);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // 버튼을 눌렀을 때 input 클릭
  const onClickImageUploadHandler = (): void => {
    imageInputRef.current?.click();
  };

  // 사진 등록 모달 열기
  const openModal = () => {
    setIsOpen(true);
  };

  // 사진 등록 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
  };

  // 운동 사진 등록
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('exerciseImg', e.target.files[0]);
      if (regDate) formData.append('regDate', regDate);

      try {
        const response = await useAxios.post('/exercise/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === httpStatusCode.OK) {
          getExerciseList();
          closeModal();
        }
      } catch (err) {
        console.log('사진 등록 에러:', err);
      }
    }
  };

  // 사진 삭제
  const deleteImage = async () => {
    const exerciseRecordId = exerciseInfo?.exerciseRecordId;
    try {
      const response = await useAxios.delete(
        `/exercise/img/${exerciseRecordId}`,
      );

      if (response.status === httpStatusCode.OK) {
        getExerciseList();
        closeModal();
      }
    } catch (err) {
      console.log('사진 삭제 에러:', err);
    }
  };

  return (
    <>
      <SummaryWrapper>
        <Header iconName="back" onClick={goMain} />
        <ImageBox>
          <Image
            src={
              exerciseInfo?.exerciseImg ? exerciseInfo?.exerciseImg : Running
            }
            alt="dietImg"
          />
          <ImageIcon>
            <IconButton iconName="photo" onClick={openModal} />
            <BottomSheet isOpen={isOpen} onClose={closeModal} noModal={true}>
              <ButtonBox $gap={1}>
                <ButtonBox $gap={0.15}>
                  <Button
                    buttonName="사진 보관함"
                    color="blue"
                    radius={0}
                    dir="top"
                    onClick={onClickImageUploadHandler}
                  />
                  <input
                    type="file"
                    ref={imageInputRef}
                    style={{ display: 'none' }}
                    onChange={uploadImage}
                  />
                  <Button
                    buttonName="사진 찍기"
                    color="blue"
                    radius={0}
                    dir="bottom"
                  />
                </ButtonBox>
                {exerciseInfo?.exerciseImg && (
                  <Button
                    buttonName="삭제하기"
                    color="blue"
                    onClick={deleteImage}
                  />
                )}
              </ButtonBox>
            </BottomSheet>
          </ImageIcon>
        </ImageBox>
        <InfoWrapper>
          <div>
            <Info>{exerciseInfo?.totalTime || 0} 분 </Info>
            <Text> 동안</Text>
          </div>
          <div>
            <Info>{exerciseInfo?.totalCaloriesBurned || 0} kcal </Info>
            <Text> 소모했어요</Text>
          </div>
        </InfoWrapper>
      </SummaryWrapper>
      <ExerciseListWrapper>
        <TodayCount>
          오늘 한 운동 <Count>{exerciseList?.length || 0}</Count>
        </TodayCount>
        {exerciseList?.map((exercise: Exercise) => (
          <Box
            type="exercise"
            info={exercise}
            key={exercise.exerciseId}
            setRefreshed={setRefreshed}
            recentWeight={recentWeight.current}
          />
        ))}
        <ButtonWrapper>
          <Button
            buttonName="검색"
            onClick={() => navigator('/exercise/search')}
            color="blue"
          />
          <Button
            buttonName="직접 등록"
            onClick={() => navigator('/exercise/regist')}
            color="blue"
          />
        </ButtonWrapper>
      </ExerciseListWrapper>
    </>
  );
};

export default ExercisePage;
