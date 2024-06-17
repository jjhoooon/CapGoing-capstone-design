import React from 'react'
import styled from 'styled-components'
import RecipeImg from '../../../../../assets/images/recipes/photo4.png'

const GrindSetup = ({
    dose
}) => {
    return (
        <Container>
            <StepTitle>Step 3</StepTitle>
            <Section>
                <ItemImg src={RecipeImg} alt='준비물' />
            </Section>
            <MainTitle>분쇄 원두</MainTitle>
            <Description>
                적절한 입자 {dose}g의 분쇄 원두를 넣어주세요.
                <br />
                원두를 평평하게 하고 저울을 0으로 맞추세요.
                <br />
            </Description>
        </Container>
    );
}

export default GrindSetup

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
    padding: 0px 10px;
`;
