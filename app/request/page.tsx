"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Request: React.FC = () => {

  const [data, setData] = useState<any | null>(null); // 가져온 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩중인상태, 기본값: true
  const [error, setError] = useState<string | null>(null); // 에러를 저장

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('https://rakaso598.github.io/items/items.json');
        setData(response.data);
        setLoading(false);
        
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // err를 Error 타입으로 체크한 후 message 사용
        } else {
          setError('An unknown error occurred'); // 알 수 없는 에러 처리
        }
      }
    };

    fetchData();
  }, []);

  // 조건부 렌더링
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러
  if(error) {
    return <div>Error: {error}</div>;
  }

  // 데이터 표시
  return (
    <div>
      <h1>Request</h1>
      <p>This is the request page of the application.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Request;
