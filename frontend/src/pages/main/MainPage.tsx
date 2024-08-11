import { useEffect, useState } from 'react';
import {
  Header,
  DailyRecord,
  DailyDiet,
  DailyWeight,
  DailyExercise,
} from './components';
import styled from 'styled-components';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const ContentsWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3.25rem;
`;

const MainPage = () => {
  const selectedDate = localStorage.getItem('date');
  const today = format(new Date(), 'yyyy-MM-dd');
  const [date, setDate] = useState<string>(selectedDate || today);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    showCloseButton: true,
  });

  // 앱이 설치되어 있는지 확인
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  // 앱 설치 유도
  const handleBeforeInstallPrompt = (event: any) => {
    event.preventDefault();

    if (event) {
      Toast.fire({
        html: `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              <img src="/logo.svg" alt="App Icon" style="width: 40px; height: 40px; margin-right: 10px;" />
              <div style="display: flex; flex-direction: column; font-size: 14px; gap: 0.5rem;">
                <div style="font-weight: bold; font-size: 18px;">UpDown</div>
                <div>앱으로 편하게 사용해보세요 :)</div>
              </div>
            </div>
            <button id="install-button" style="width: 50px; height: 40px; margin-left: 10px; background-color: #F4B24E; border: none; color: white; padding: 10px; font-size: 16px; border-radius: 5px; cursor: pointer;">
              설치
            </button>
          </div>
        `,
        width: '90%',
      });

      // 설치 버튼을 누르면 설치 프롬프트 표시
      document
        .getElementById('install-button')
        ?.addEventListener('click', () => {
          event.prompt();

          event.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('사용자가 설치 프롬프트에 동의했습니다.');
            } else {
              console.log('사용자가 설치 프롬프트를 무시했습니다.');
            }
          });
        });
    }
  };

  return (
    <>
      <Header date={date} setDate={setDate} />
      <ContentsWrapper>
        <DailyRecord />
        <DailyDiet />
        <DailyWeight />
        <DailyExercise />
      </ContentsWrapper>
    </>
  );
};

export default MainPage;
