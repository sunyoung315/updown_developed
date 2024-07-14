import { useEffect, useState } from 'react';
// import useAxios from '@/util/http-commons';
import { Button, Input } from '@/components';
import BottomSheet from '@/components/BottomSheet';
import styled from 'styled-components';
import { BmiChart, RecordChart } from '../components';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';

const DailyWeightWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: ${props => props.theme.green};
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
`;

const TitleButton = styled.button<{ $color: boolean }>`
  color: ${props => (props.$color ? props.theme.black : props.theme.darkgreen)};
  font-size: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
  gap: 0.5rem;
`;

const Weight = styled.div`
  font-size: 2.1rem;
  color: ${props => props.theme.white};
`;

const Unit = styled.span`
  font-size: 1.56rem;
  color: ${props => props.theme.white};
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const GaugeChartWrapper = styled.div`
  width: 19rem;
  margin: 1.2rem 0 2rem;
  padding: 0.5rem;
`;

const LineChartWrapper = styled.div`
  width: 19rem;
  display: flex;
  justify-content: center;
  margin: 1rem 0 1.5rem;
`;

const DailyWeight = ({ regDate }: { regDate: string }) => {
  const [height, setHeight] = useState<number>(0);
  const [weightList, setWeightList] = useState<
    { weight: number; regDate: string }[]
  >([]);

  const getWeightInfo = async () => {
    try {
      const response = await useAxios.get(`/weight/${regDate}`);

      if (response.status === httpStatusCode.OK) {
        setHeight(response.data.height);
        setWeightList(response.data.weightList);
      }
    } catch (err) {
      console.log('체중 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getWeightInfo();
  }, [regDate]);

  // 오늘 날짜의 정보만 추출
  const todayInfo = weightList?.find(w => w.regDate === regDate);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(todayInfo?.weight || 0);

  // bmi 지수 계산
  const bmi = todayInfo ? weight / Math.pow(height / 100, 2) : 0;

  // chart에 들어갈 정보
  const xInfo = weightList.map(w => {
    const [yyyy, mm, dd] = w.regDate.split('-');
    return [`${mm}/${dd}`];
  });

  const yInfo = weightList.map(w => w.weight);

  useEffect(() => {}, [regDate, weight]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeToRecordChart = () => {
    setIsRecord(true);
  };

  const changeToBmiChart = () => {
    setIsRecord(false);
  };

  const registWeight = async () => {
    try {
      const response = await useAxios.post('/weight', { weight, regDate });

      if (response.status === httpStatusCode.OK) {
        closeModal();
      }
    } catch (err) {
      console.log('몸무게 등록 오류:', err);
    }
  };

  const updataWeight = async () => {
    try {
      const response = await useAxios.put('/weight', { weight, regDate });

      if (response.status === httpStatusCode.OK) {
        closeModal();
      }
    } catch (err) {
      console.log('몸무게 수정 에러:', err);
    }
  };

  return (
    <DailyWeightWrapper>
      <Title>
        <TitleButton onClick={changeToBmiChart} $color={!isRecord}>
          몸무게
        </TitleButton>
        <TitleButton onClick={changeToRecordChart} $color={isRecord}>
          기록
        </TitleButton>
      </Title>
      <Content>
        <div>오늘 나의 몸무게는?</div>
        <Weight>
          {weight}
          <Unit> kg</Unit>
        </Weight>
        {!isRecord ? (
          <GaugeChartWrapper>
            <BmiChart bmi={bmi} />
          </GaugeChartWrapper>
        ) : (
          <LineChartWrapper>
            <RecordChart xInfo={xInfo} yInfo={yInfo} />
          </LineChartWrapper>
        )}
        <Button
          buttonName="기록하기"
          onClick={openModal}
          color="darkgreen"
          size={10.25}
          radius={1}
        />
      </Content>
      <BottomSheet isOpen={isOpen} onClose={closeModal} title="몸무게 입력">
        <ModalContent>
          <Input value={weight} onChange={setWeight} isBig={true} unit="kg" />
          <Button
            buttonName={!todayInfo ? '등록하기' : '수정하기'}
            onClick={!todayInfo ? registWeight : updataWeight}
            color="darkgreen"
          />
        </ModalContent>
      </BottomSheet>
    </DailyWeightWrapper>
  );
};

export default DailyWeight;
