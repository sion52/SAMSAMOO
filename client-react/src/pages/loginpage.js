import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './loginpage.css';


function LoginPage({ setLoginState, setLogurlState }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmitChange = (e) => {
        e.preventDefault();

        let data = {
            email: id,
            password: password
        }

        fetch('http://127.0.0.1:5000/login/', {
            method: 'POST', // POST 요청 설정
            headers: {
                'Content-Type': 'application/json' // JSON 형식으로 데이터 전송
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.result === 'success') {
                    alert("로그인 성공");
                    localStorage.setItem('cookie', id);
                    localStorage.setItem('url', '/user');
                    setLoginState(id); // 로그인 상태 변경
                    setLogurlState('/user');
                } else {
                    alert('로그인 실패')
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('로그인 실패: 서버에 연결할 수 없음');
            });
    };


    return (
        <div className='loginbox'>
            <Form className='login' onSubmit={handleSubmitChange}> {/* onSubmit 이벤트 핸들러를 추가 */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleIdChange} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <p>Entered email: {id}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                    <p>Entered password: {password}</p>
                </Form.Group>

                <Button variant="primary" type="submit"> {/* 버튼 클릭 대신 폼 제출 이벤트를 처리하도록 수정 */}
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default LoginPage;