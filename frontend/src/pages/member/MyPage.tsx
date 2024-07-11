import { tokenStore } from '@/store';
import useAxios from '@/util/http-commons';
import { useEffect } from 'react';

const MyPage = () => {
  const { checkToken } = tokenStore();
  useEffect(() => {
    const getMyPageInfo = async () => {
      console.log('getMyPageInfo');
      try {
        const response = await useAxios.get('/mypage');
        console.log('mypage:', response?.data);
      } catch (err) {
        console.log('mypage getMyPageInfo errer:', err);
      }
    };

    // 토큰 확인이 완료되면 마이페이지 정보 가져오기
    if (checkToken) {
      getMyPageInfo();
    }
  }, [checkToken]);

  return (
    <>
      <div>마이페이지</div>
    </>
  );
};

export default MyPage;