import { useEffect, useState } from 'react';
import useAxios from '@/util/http-commons';
import { Button, Input } from '@/components';
import BottomSheet from '@/components/BottomSheet';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import theme from '@/styles/theme';
import styled from 'styled-components';

const DailyWeightWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: ${props => props.theme.green};
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  font-size: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem;
  gap: 0.5rem;
  margin-top: 0.6rem;
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
  gap: 3rem;
  margin-top: 3rem;
`;

const ChartWrapper = styled.div`
  width: 17.56rem;
  height: 12.56rem;
  backgroundcolor: ${props => props.theme.lightgreen};
  margin: 1rem;
`;

const DailyWeight = ({ regDate }: { regDate: string }) => {
  const weightList = [
    { weight: 51.6, regDate: '2024-07-08' },
    { weight: 52.4, regDate: '2024-07-09' },
    { weight: 53.3, regDate: '2024-07-10' },
    { weight: 56.9, regDate: '2024-07-11' },
    { weight: 54.1, regDate: '2024-07-12' },
    { weight: 50.2, regDate: '2024-07-13' },
  ];

  // 오늘 날짜의 정보만 추출
  const todayInfo = weightList.find(w => w.regDate === regDate);
  // chart에 쓰기 위해 weightInfoList의 key를 x, y로 변경
  const chartInfo = weightList.map(w => ({
    x: w.weight,
    y: w.regDate,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [weight, setWeight] = useState(todayInfo?.weight || 0);

  useEffect(() => {}, [regDate, weight]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const registWeight = () => {
    console.log('몸무게 입력');
  };

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const data = {
    datasets: [
      {
        borderColor: theme['darkgreen'],
        borderWidth: 2,
        data: chartInfo,
      },
    ],
  };

  return (
    <DailyWeightWrapper>
      <Title>몸무게</Title>
      <Content>
        <div>오늘 나의 몸무게는?</div>
        <Weight>
          {todayInfo?.weight || 0}
          <Unit> kg</Unit>
        </Weight>
        <ChartWrapper>
          <Line data={data} />
        </ChartWrapper>
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
