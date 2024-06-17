import React from 'react'
import styled from 'styled-components'
import RecipeImg from '../../../../../assets/images/recipes/photo8.png'

const LastStep = () => {
    return (
        <Container>
            <StepTitle>Last Step</StepTitle>
            <Section>
                <ItemImg src={RecipeImg} alt='준비물' />
            </Section>
            <MainTitle>드리퍼 제거</MainTitle>
            <Description>
                집에서 신선한 커피 한 잔을 즐길 시간입니다.
            </Description>
        </Container>
    );
}

export default LastStep

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 70vh;
    padding-top: 10px;
`;

const Section = styled.div`
    margin-bottom: 20px;
`;

const ItemImg = styled.img`
    width: 50%;
    max-width: 600px;
    height: auto;
    border-radius: 10px;
    margin: 10px 0;
`
const StepTitle = styled.h2`
    font-size: rem;
    color: #29752c;
    margin-bottom: 10px;
`;

const MainTitle = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: #374231;
    text-align: center;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1rem;
    color: #374231;
    text-align: center;
    margin-bottom: 30px;
    line-height: 1.5;
    padding: 0 10px;
`;
