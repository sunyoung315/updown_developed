import { infoProps } from '@/types/type';
import theme from '@/styles/theme';
import styled from 'styled-components';

const InfoWrapper = styled.div<{
  $infodir: string | undefined;
  $titlecolor: string | undefined;
  $size?: boolean;
}>`
  height: ${props => (props.$infodir === 'row' ? 'auto' : '2.94rem')};
  display: ${props => (props.$infodir === 'row' ? 'flex' : 'grid')};
  grid-template-columns: ${props =>
    props.$infodir === 'row' ? 'none' : 'repeat(2, 1fr)'};
  align-items: ${props => (props.$infodir === 'row' ? 'none' : 'center')};
  flex-direction: ${props => (props.$infodir === 'row' ? 'column' : 'row')};
  gap: ${props =>
    props.$infodir !== 'row' ? '1.2rem' : props.$size ? '1rem' : '0.3rem'};
  color: ${props =>
    props.$titlecolor === 'grey' ? props.theme.grey : props.theme.black};
`;

const InfoTitle = styled.span`
  font-size: 1.13rem;
`;

const InfoContent = styled.label<{
  $infodir?: string;
  $ntr?: boolean;
  $size?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.$ntr ? 'flex-end' : 'space-between')};
  gap: ${props => (props.$ntr ? '1rem' : '0')};
  padding: 0.3rem;
  font-size: ${props =>
    props.$infodir === 'row' && !props.$size ? '1.88rem' : '1.25rem'};
`;

const Unit = styled.span`
  font-size: 1.25rem;
  padding-left: 0.5rem;
`;

const Info = (infoProps: infoProps) => {
  const {
    infodir,
    title,
    content,
    isRequired,
    starColor,
    titleColor,
    unit,
    ntr,
    size,
  } = infoProps;

  return (
    <InfoWrapper $infodir={infodir} $titlecolor={titleColor} $size={size}>
      <InfoTitle>
        {title}
        {isRequired && (
          <span style={{ color: theme[starColor ? starColor : 'black'] }}>
            {' *'}
          </span>
        )}
      </InfoTitle>
      <InfoContent $infodir={infodir} $ntr={ntr} $size={size}>
        {content ? content : '-'}
        {unit && <Unit>{unit}</Unit>}
      </InfoContent>
    </InfoWrapper>
  );
};

export default Info;
