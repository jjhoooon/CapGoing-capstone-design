import React from 'react'
import styled from 'styled-components'
import RecipeImg from '../../../../../assets/images/recipes/photo5.png'

const Bloom = ({
    water_quantity,
    extraction_time
}) => {
    return (
        <Container>
            <StepTitle>Step 4</StepTitle>
            <Section>
                <ItemImg src={RecipeImg} alt='준비물' />
            </Section>
            <MainTitle>뜸 들이기</MainTitle>
            <Description>
                {water_quantity}g의 물을 원두에 부으세요.
                원두가 충분히 젖을 정도로 부어주세요. {extraction_time}초 동안 기다립니다.

            </Description>
        </Container>
    );
}

export default Bloom

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
    padding: 0 10px;
`;
