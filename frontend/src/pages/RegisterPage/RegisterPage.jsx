import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterPage = ({

}) => {

  const navigate = useNavigate()

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://brewbuzzrecipe.com/auth/register', {
        username: userName,
        password: password,
        displayName: displayName,
      });

      if (response.status === 200) {
        navigate('/')
        alert("회원가입 완료")
      }
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
    console.log("display", displayName)
  };

  return (
    <>
      <Container>
        <Title>회원가입</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="username">닉네임</Label>
          <Input
            id="username"
            type="text"
            placeholder="닉네임을 입력하세요"
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <Label htmlFor="username">아이디</Label>
          <Input
            id="username"
            type="text"
            placeholder="아이디를 입력하세요"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Label htmlFor="username">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
          />

          <SubmitButton type="submit">회원가입 하기</SubmitButton>
        </Form>
      </Container>
    </>
  )
}

export default RegisterPage

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 0.8;
    }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f3f1e7; 
  animation: ${fadeIn} 0.5s ease-in;
  @media (max-width: 768px) {
    width: 80%;
  margin-top: 100px;
}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
  @media (max-width: 768px) {
    max-width: 300px;
}
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #374231; 
  margin-bottom: 10px;
  @media (max-width: 768px) {
  margin-bottom: 30px;
}
`;


const Label = styled.label`
  font-size: 1em;
  color: #374231;
  margin-bottom: 7px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;


const Button = styled.button`
  background-color: ${props => (props.active ? '#c79a6b' : '#fff')};
  color: ${props => (props.active ? '#fff' : '#374231')};
  border: ${props => (props.active ? 'none' : '1px solid #ccc')}; 
  border-radius: 20px;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${props => (props.active ? '#b5885e' : '#e1e1e1')};
  }
`;

const SubmitButton = styled(Button)`
  background-color: #d8a070; 
  color: white;
  width: 100%;
  border: none;
  margin-top: 30px;

  &:hover {
    background-color: #bf8050; 
  }
`;