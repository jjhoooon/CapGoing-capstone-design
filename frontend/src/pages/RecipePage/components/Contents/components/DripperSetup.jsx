import React from 'react'
import styled from 'styled-components'
import RecipeImg from '../../../../../assets/images/recipes/photo2.png'

const DripperSetup = () => {
    return (
        <Container>
            <StepTitle>Step 1</StepTitle>
            <Section>
                <ItemImg src={RecipeImg} alt='준비물' />
            </Section>
            <MainTitle>드리퍼</MainTitle>
            <Description>
                필터가 드리퍼에 적합한 모양과
                크기인지 확인하십시오.
                <br />
                드리퍼를 커피 잔 위에
                올려주세요.
            </Description>
        </Container>
    );
}

export default DripperSetup

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
