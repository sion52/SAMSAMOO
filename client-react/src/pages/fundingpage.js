import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './fundingpage.css';
import {Route, Routes, Link} from 'react-router-dom';

function FundingPage() {
  // 상태를 사용하여 데이터를 관리
  const [fundingData, setFundingData] = useState([]);
  useEffect(() => {
    // data.js에서 데이터 가져와서 상태 업데이트
    fetch('http://127.0.0.1:5000/funding')
      .then(res => res.json()) // .json() 메서드 호출
      .then(data => {
        setFundingData(data); // 첫 번째 then 메서드에서 처리
      });
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  return (
    <>
      <div className='Posts'>
        <p>&#x1F4CC;모든 펀딩 &gt;</p>
      </div>
      <div className='Fundingbox'>
        {fundingData.map((post, index) => <FundingPosts post={post} index={index} />)}
      </div>
    </>
  );
}

function FundingPosts({ post, index }) {
  return (
    <Card style={{ width: '18rem' }} id='Fundingcard'>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{post.name}</Card.Title>
        <Card.Text>
          {post.data}
        </Card.Text>
        <Link to={`/detail/${post.name}`}>
          <Button variant="primary">자세히 보기</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default FundingPage;
