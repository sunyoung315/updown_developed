import { useEffect, useState } from 'react';
import useAxios from '@/util/http-commons';
import { Button, Input } from '@/components';
import BottomSheet from '@/components/BottomSheet';
import { Chart, Line } from 'react-chartjs-2';
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
  width: 19rem;
  height: 13rem;
  background-color: ${props => props.theme.lightgreen};
  margin: 1rem;
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
    return [`${yyyy}.`, `${mm}.${dd}`];
  });
  const yInfo = weightList.map(w => w.weight);

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
    labels: xInfo,
    datasets: [
      {
        pointBackgroundColor: theme['darkgreen'],
        pointBorderWidth: 1,
        borderColor: theme['darkgreen'],
        borderWidth: 1.5,
        data: yInfo,
      },
    ],
  };

  const options = {
    responsive: false,
    scales: {
      x: {
        grid: {
          color: theme['green'],
          width: 0.5,
        },
        border: {
          display: true,
          color: theme['darkgreen'],
          width: 1.5,
        },
        ticks: {
          color: theme['black'],
          font: {
            size: 9.5,
            family: 'omyudapretty',
          },
        },
      },
      y: {
        grid: {
          color: theme['green'],
          width: 0.5,
        },
        border: {
          display: true,
          color: theme['darkgreen'],
          width: 1.5,
        },
        ticks: {
          color: theme['black'],
          font: {
            size: 10,
            family: 'omyudapretty',
          },
        },
        afterDataLimits: (scale: { max: number; min: number }) => {
          scale.max = scale.max + 2;
          scale.min = scale.min - 2;
        },
      },
    },
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
          <Line
            data={data}
            options={options}
            style={{ height: '13rem', width: '19rem' }}
          />
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
