import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes, Link } from 'react-router-dom';
import Mainpage from './pages/mainpage.js'
import FundingPage from './pages/fundingpage.js'
import LoginPage from './pages/loginpage.js'
import Detail from './pages/detail';
import CheckoutPage from './pages/pay';
import { SuccessPage } from './pages/success';
import { FailPage } from './pages/fail';
import React, { useEffect, useState } from 'react';
import UserPage from './pages/user.js'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FundingSort from './pages/fundingsort.js'

function App() {
  const [loginState, setLoginState] = useState('Login'); 
  const [logurlState, setLogurlState]= useState('/login');
  const [search, setSearch] = useState('');
  const [fd, setfd] = useState('')

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmitChange = (e) => {
    e.preventDefault();

  }


  useEffect(()=> {
    const storedLoginState = localStorage.getItem('cookie');
    const storedUrlState = localStorage.getItem('url');
    if (storedLoginState && storedUrlState) {
      setLoginState(storedLoginState);
      setLogurlState(storedUrlState);
    }
  }, []);

  return (
    <div className="App">
  
      {/*<Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/home">SAMSAMOO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/funding">Funding</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href={logurlState}>{loginState}</Nav.Link>
          </Nav>
        </Container>
  </Navbar>*/}


      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="/home">SAMSAMOO</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/funding">Funding</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href={logurlState}>{loginState}</Nav.Link>

            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange}
              />
              <Link to = '/funding/sort'>
                <Button variant="outline-success">Search</Button>
              </Link>

            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/home' element={<Mainpage/>} />
        <Route path='/funding' element={<FundingPage/>} />
        <Route path='/about' element={<div>우리 사이트에 관하여...</div>} />
        <Route path='/login' element={<LoginPage setLoginState={setLoginState} setLogurlState={setLogurlState}/>} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path= '/pay' element= {<CheckoutPage />} />
        <Route path= '/pay/success' element= {<SuccessPage />} />
        <Route path= '/pay/fail' element= {<FailPage />} />
        <Route path='/funding/sort' element={<FundingSort/>} />
        <Route path='/user' element= {<UserPage setLoginState={setLoginState} setLogurlState={setLogurlState}/>} />
      </Routes>
    </div>
  );
}

export default App;