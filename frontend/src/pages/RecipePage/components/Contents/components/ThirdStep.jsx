import React from 'react'
import styled from 'styled-components'
import RecipeImg from '../../../../../assets/images/recipes/photo6.png'

const ThirdStep = ({
    water_quantity,
    extraction_time,
    pouring_time
}) => {
    return (
        <Container>
            <StepTitle>Step 7</StepTitle>
            <Section>
                <ItemImg src={RecipeImg} alt='준비물' />
            </Section>
            <MainTitle>3차 추출</MainTitle>
            <Description>
                {pouring_time}초 동안 {water_quantity}g의 물을 부으세요.
                중앙에서 시작하여 바깥쪽으로 나선형으로 부어주세요. <br /> {extraction_time}초 동안 기다립니다.
            </Description>
        </Container>
    );
}

export default ThirdStep

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
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
    padding: 0 50px;
`;
