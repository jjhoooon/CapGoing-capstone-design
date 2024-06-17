import React, { useState } from 'react'
import styled from 'styled-components'

const PreferencesForm = ({
    coffeeType, setCoffeeType,
    coffeeFlavor, setCoffeeFlavor,
    flavorIntensity, setFlavorIntensity,
    setUserPreferences,
    setIsPreferencesInfo,
    onFormSubmit,
    cupNotes
}) => {

    const cupNotesArray = cupNotes.split(', ');



    return (
        <Container>
            <Title>당신의 선호도</Title>
            <Form onSubmit={onFormSubmit}>
                <Label>Coffee Type</Label>
                <ButtonGroup>
                    {['ICE', 'HOT'].map(item => (
                        <Button
                            key={item}
                            active={coffeeType === item}
                            onClick={() => setCoffeeType(item)}
                            type='button'
                        >
                            {item}
                        </Button>
                    ))}

                </ButtonGroup>
                <Label>Flavor</Label>
                <ButtonGroup>
                    {cupNotesArray.length === 0 ?
                        (
                            <div>
                                <h1>컵노트 생성중</h1>
                            </div>
                        )
                        : (
                            cupNotesArray.map(item => (
                                <Button
                                    key={item}
                                    active={coffeeFlavor === item}
                                    onClick={() => setCoffeeFlavor(item)}
                                    type='button'
                                >
                                    {item}
                                </Button>
                            ))
                        )
                    }
                </ButtonGroup>
                <Label>Intensity</Label>
                <ButtonGroup>
                    {
                        ['Rich', 'Weak'].map(item => (
                            <Button
                                key={item}
                                active={flavorIntensity === item}
                                onClick={() => setFlavorIntensity(item)}
                                type='button'
                            >
                                {item}
                            </Button>
                        ))
                    }
                </ButtonGroup>
                <Label>Preferences</Label>
                <Input
                    id="preferences"
                    type="text"
                    placeholder='선호 내용을 입력하세요'
                    onChange={(e) => setUserPreferences(e.target.value)}
                />
                <SubmitButton type="submit">레시피 생성하기</SubmitButton>
            </Form>
        </Container>
    )
}

export default PreferencesForm

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 40px;
  background-color: #f3f1e7; 
  @media (max-width: 768px) {
  margin-top: 100px;
  width: 100%;
}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #374231;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 1em;
  color: #374231;
  margin-bottom: 5px;
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
  color: white;
  width: 100%;
  border: none;
  margin-top: 30px;

  &:hover {
    background-color: #bf8050; 
  }
`;