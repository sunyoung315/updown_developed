import theme from '@/styles/theme';
import { themeProps } from '@/types/type';
import styled from 'styled-components';

const BackgroundBox = styled.div<{ $color: keyof typeof theme }>`
  width: 100%;
  padding: 7%;
  border-radius: 0.6rem;
  background-color: ${props => theme[props.$color]};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  height: auto;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.6rem;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.white};
  font-size: 1.7rem;
`;

const Box = styled.div<{ $color: keyof typeof theme }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 0.6rem;
  background-color: ${props => theme[props.$color]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  padding: 5%;
  width: 90%;
`;

const Name = styled.div`
  color: ${props => props.theme.darkgrey};
  font-size: 1.13rem;
  line-height: 1.13rem;
`;

const ThemeBox = (themeProps: themeProps) => {
  const {
    name,
    imgName,
    backgroundColor,
    color,
    isSelected,
    idx,
    setSelectedTheme,
  } = themeProps;

  return (
    <button onClick={() => setSelectedTheme(idx)}>
      <BackgroundBox $color={backgroundColor}>
        <Box $color={color}>
          {isSelected && <Overlay>선택됨</Overlay>}
          <Image src={`/images/${imgName}.png`} alt={imgName} />
        </Box>
        <Name>{name}</Name>
      </BackgroundBox>
    </button>
  );
};

export default ThemeBox;
