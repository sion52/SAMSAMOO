import './user.css'
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';

function User({setLoginState, setLogurlState}){

    const handleSubmitChange = (e) => {
        localStorage.setItem('cookie', 'Login');
        localStorage.setItem('url', '/login');
        setLoginState('Login')
        setLogurlState('/login')
        alert('로그아웃 완료')
      };


    return(
        <>
            <p className="구매내역">&#x1F4B8;구매 내역 &gt;</p>
            <div className='userbox'>
                <p>시노팩스 -- 당첨</p>
            </div>
        
            


            <Button variant="outline-danger" className='button' onClick={handleSubmitChange}>Log Out</Button>

        </>
    );   
}

export default User