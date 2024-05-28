import useAxios from '@/util/http-commons';
import { httpStatusCode } from '@/util/http-status';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const navigator = useNavigate();

  const [data, setData] = useState({
    gender: '남성',
    age: 0,
    height: 0.0,
    nowWeight: 0.0,
    targetWeight: 0.0,
    activeLevel: '거의없음',
    targetCalories: 0.0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const signup = async () => {
    try {
      const response = await useAxios.post('/auth/signup', data);
      if (response.status === httpStatusCode.OK) {
        navigator('/main');
      }
    } catch (error) {
      console.log('회원가입 에러: ', error);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <div>
        <span>성별</span>
        <select
          name="gender"
          id="gender"
          value={data.gender}
          onChange={handleChange}
        >
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
      </div>
      <div>
        <span>나이</span>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <span>키</span>
        <input
          type="number"
          step={0.1}
          name="height"
          value={data.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <span>현재 체중</span>
        <input
          type="number"
          step={0.1}
          name="nowWeight"
          value={data.nowWeight}
          onChange={handleChange}
        />
      </div>
      <div>
        <span>목표 체중</span>
        <input
          type="number"
          step={0.1}
          name="targetWeight"
          value={data.targetWeight}
          onChange={handleChange}
        />
      </div>
      <div>
        <span>평소 활동량</span>
        <select
          name="activeLevel"
          id="activeLevel"
          value={data.activeLevel}
          onChange={handleChange}
        >
          <option value="거의없음">거의 없음</option>
          <option value="적음">적음</option>
          <option value="보통">보통</option>
          <option value="많음">많음</option>
        </select>
      </div>
      <div>
        <span>목표칼로리</span>
        <input
          type="number"
          step={0.1}
          name="targetCalories"
          value={data.targetCalories}
          onChange={handleChange}
        />
      </div>
      <button onClick={signup}>저장</button>
    </>
  );
};

export default SignUpPage;
