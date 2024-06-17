import React, { useState } from 'react'
import styled from 'styled-components'

const UserInfoForm = ({
  coffeeBean, setCoffeeBean,
  coffeeOrigin, setCoffeeOrigin,
  roastLevel, setRoastLevel,
  process, setProcess,
  cupNotes, setCupNotes,
  setIsCoffeeInfo
}) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsCoffeeInfo(true)
  }

  return (
    <>
      <Container>
        <Title>커피 정보 입력</Title>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="coffeeBean">Coffee Bean</Label>
          <Input
            id="coffeeBean"
            type="text"
            placeholder="원두 이름을 입력하세요"
            onChange={(e) => setCoffeeBean(e.target.value)}
          />

          <Label htmlFor="coffeeOrigin">Coffee Origin</Label>
          <Input
            id="coffeeOrigin"
            type="text"
            placeholder="원산지를 입력하세요"
            onChange={(e) => setCoffeeOrigin(e.target.value)}
          />

          <Label>Roast Level</Label>
          <ButtonGroup>
            {['Light', 'Medium-light', 'Medium', 'Medium-dark', 'Dark'].map(roast => (
              <Button
                key={roast}
                active={roastLevel === roast}
                onClick={() => setRoastLevel(roast)}
                type="button"
              >
                {roast}
              </Button>
            ))}
          </ButtonGroup>

          <Label>Process</Label>
          <ButtonGroup>
            {['Washed', 'Natural', 'Honey'].map(item => (
              <Button
                key={item}
                active={process === item}
                onClick={() => setProcess(item)}
                type="button"
              >
                {item}
              </Button>
            ))}
          </ButtonGroup>

          <Label htmlFor="cupNotes">Coffee Notes</Label>
          <Input
            id="cupNotes"
            type="text"
            placeholder="예시) Strawberry, Chocolate / ','(쉼표) 필수"
            onChange={(e) => setCupNotes(e.target.value)}
          />

          <SubmitButton type="submit">커피 정보 입력 완료</SubmitButton>
        </Form>
      </Container>
    </>
  )
}

export default UserInfoForm

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f3f1e7; 
  @media (max-width: 768px) {
  margin-top: 330px;
}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
  @media (max-width: 768px) {
    width: 90%;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
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
  width: 100%;
  border: none;
  margin-top: 30px;

  &:hover {
    background-color: #bf8050; 
  }
`;