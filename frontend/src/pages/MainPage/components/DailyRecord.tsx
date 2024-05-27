import styled from 'styled-components';

const DailyRecordWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: #f4bfc5;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  font-weight: bold;
`;

const DailyRecord = () => {
  return (
    <DailyRecordWrapper>
      <TitleWrapper>하루 기록</TitleWrapper>
    </DailyRecordWrapper>
  );
};

export default DailyRecord;
