import { useRef, useEffect, useState } from 'react';
import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { BmiChart, RecordChart } from '../components';
import { Button, Input, BottomSheet } from '@/components';
import { WeightInfo } from '@/types/type';
import styled from 'styled-components';

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
  font-size: 1.4rem;
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

const DailyWeight = () => {
  const regDate = localStorage.getItem('date');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRecord, setIsRecord] = useState<boolean>(false);
  const todayRef = useRef<WeightInfo>();
  const [weight, setWeight] = useState<number>(0);
  const [inputValue, setInputValue] = useState<number>(weight);
  const xRef = useRef<string[]>([]);
  const yRef = useRef<number[]>([]);
  const bmiRef = useRef<number>(0);

  const getWeightInfo = async () => {
    try {
      const response = await useAxios.get(`/weight/${regDate}`);

      if (response.status === httpStatusCode.OK) {
        const height = response.data.height;
        const weightList = response.data.weightList;

        const todayInfo = weightList?.find(
          (w: WeightInfo) => w.regDate === regDate,
        );
        todayRef.current = todayInfo;

        // 오늘 날짜의 몸무게만 추출
        setWeight(todayInfo?.weight || 0);
        setInputValue(todayInfo?.weight || 0);

        // bmi 지수 계산
        bmiRef.current = todayInfo?.weight / Math.pow(height / 100, 2) || 0;

        // chart에 들어갈 정보
        xRef.current = weightList?.map((w: WeightInfo) => {
          const [yyyy, mm, dd] = w.regDate.split('-');
          return [`${mm}/${dd}`];
        });
        yRef.current = weightList?.map((w: WeightInfo) => w.weight);
      }
    } catch (err) {
      console.log('체중 정보 조회 에러:', err);
    }
  };

  useEffect(() => {
    getWeightInfo();
  }, [regDate]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setInputValue(weight);
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
      const response = await useAxios.post('/weight/record', {
        weight: inputValue,
        regDate,
      });

      if (response.status === httpStatusCode.OK) {
        getWeightInfo();
        setIsOpen(false);
      }
    } catch (err) {
      console.log('몸무게 등록 오류:', err);
    }
  };

  const updateWeight = async () => {
    try {
      const response = await useAxios.put('/weight/record', {
        weight: inputValue,
        regDate,
      });

      if (response.status === httpStatusCode.OK) {
        getWeightInfo();
        setIsOpen(false);
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
            <BmiChart value={bmiRef.current} />
          </GaugeChartWrapper>
        ) : (
          <LineChartWrapper>
            <RecordChart xInfo={xRef.current} yInfo={yRef.current} />
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
          <Input
            value={inputValue}
            onChange={setInputValue}
            isBig={true}
            unit="kg"
          />
          <Button
            buttonName={!todayRef.current ? '등록하기' : '수정하기'}
            onClick={!todayRef.current ? registWeight : updateWeight}
            color="darkgreen"
          />
        </ModalContent>
      </BottomSheet>
    </DailyWeightWrapper>
  );
};

export default DailyWeight;
