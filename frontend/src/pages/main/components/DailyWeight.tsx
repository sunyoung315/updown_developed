import { useEffect, useState } from 'react';
// import useAxios from '@/util/http-commons';
import { Button, Input } from '@/components';
import BottomSheet from '@/components/BottomSheet';
import styled from 'styled-components';
import { BmiChart, RecordChart } from '../components';

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
  margin: 0.5rem 0 2rem;
`;

const DailyWeight = ({ regDate }: { regDate: string }) => {
  const weightList = [
    { weight: 51.6, regDate: '2024-07-08' },
    { weight: 52.4, regDate: '2024-07-09' },
    { weight: 53.3, regDate: '2024-07-10' },
    { weight: 56.9, regDate: '2024-07-11' },
    { weight: 54.1, regDate: '2024-07-12' },
    { weight: 52.2, regDate: '2024-07-13' },
    { weight: 50.2, regDate: '2024-07-14' },
  ];

  // 오늘 날짜의 정보만 추출
  const todayInfo = weightList.find(w => w.regDate === regDate);

  // chart에 들어갈 정보
  const xInfo = weightList.map(w => {
    const [yyyy, mm, dd] = w.regDate.split('-');
    return [`${mm}/${dd}`];
  });

  const yInfo = weightList.map(w => w.weight);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [weight, setWeight] = useState<number>(todayInfo?.weight || 0);

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

  const registWeight = () => {
    console.log('몸무게 입력');
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
          {todayInfo?.weight || 0}
          <Unit> kg</Unit>
        </Weight>
        {!isRecord ? (
          <GaugeChartWrapper>
            <BmiChart bmi={21.2} />
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
            buttonName="등록하기"
            onClick={registWeight}
            color="darkgreen"
          />
        </ModalContent>
      </BottomSheet>
    </DailyWeightWrapper>
  );
};

export default DailyWeight;
