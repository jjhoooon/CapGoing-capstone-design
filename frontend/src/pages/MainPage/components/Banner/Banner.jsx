import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Banner = () => {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth.authenticate)

    const handleNavigate = () => {
        if (!auth) {
            navigate('/login')
        } else {
            navigate('/user-coffee-info')
        }
    }

    return (
        <Container>
            <SubTitle>
                나만을 위한 커피 찾기
            </SubTitle>
            <Title>
                집에서 즐기는 커피
            </Title>
            <Guide>
                당신이 즐겨 마시는 홈 커피, 당신에게 어울리는 레시피를 만들어보세요.
            </Guide>
            <StartButton onClick={handleNavigate}>
                레시피 생성
            </StartButton>
        </Container>
    )
}

export default Banner

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    background-color: aliceblue;
    padding: 20px;
    text-align: center;

    @media (max-width: 768px) {
        padding: 0;
    }
`

const SubTitle = styled.div`
    font-size: 20px;
    color: #2b6d08; 
    font-weight: 900;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`

const Guide = styled.div`
    font-size: 20px;
    color: #2b6d08; 
    font-weight: 900;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        
    }
`

const Title = styled.div`
    width: 600px;
    font-size: 60px;
    color: #374231; 
    margin: 10px 0;
    @media (max-width: 768px) {
        width: 100%;
        font-size: 40px;
        font-weight: 700;
    }
`;

const StartButton = styled.button`
    padding: 10px 20px;
    font-size: 2rem;
    color: white;
    background-color: black;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #333;
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 1.2rem;
    }
`;
