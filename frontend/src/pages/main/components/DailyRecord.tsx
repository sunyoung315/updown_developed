import styled from 'styled-components';

const DailyRecordWrapper = styled.div`
  width: 100%;
  height: 30rem;
  background-color: ${props => props.theme.pink};
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  font-size: 1.25rem;
`;

const ShareButtonWrapper = styled.button`
  width: 4.5rem;
  padding: 0.4rem;
  background-color: ${props => props.theme.darkpink};
  font-size: 1rem;
  color: ${props => props.theme.white};
  border-radius: 0.5rem;
`;

const DailyRecord = () => {
  return (
    <DailyRecordWrapper>
      <TitleWrapper>
        <span>하루 기록</span>
        <ShareButtonWrapper>공유하기</ShareButtonWrapper>
      </TitleWrapper>
    </DailyRecordWrapper>
  );
};

export default DailyRecord;
