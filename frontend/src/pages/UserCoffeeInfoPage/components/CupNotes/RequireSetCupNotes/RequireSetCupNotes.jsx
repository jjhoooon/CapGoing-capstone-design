import React from 'react'
import styled, { keyframes } from 'styled-components'
import { ReactComponent as YesCupNotes } from '../../../../../assets/images/yes-icon.svg'
import { ReactComponent as NoCupNotes } from '../../../../../assets/images/no-icon.svg'

const RequireSetCupNotes = ({ setIsCupNotes }) => {

    const handleCupNotes = (answer) => {
        setIsCupNotes(answer)
    }

    return (
        <Container>
            <Title>
                컵노트가 있습니까?
            </Title>
            <ButtonWrapper>
                <StyledYesCupNotes onClick={() => handleCupNotes("yes")} width={300} height={300} />
                <StyledNoCupNotes onClick={() => handleCupNotes("no")} width={300} height={300} />
            </ButtonWrapper>
        </Container>
    )
}

export default RequireSetCupNotes

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1; 
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 600px;
    background-color: aliceblue;
    text-align: center;
    animation: ${fadeIn} 0.5s ease-in;

    @media (max-width: 768px) {
        height: 400px;
    }
`;

const Title = styled.div`
    width: 600px;
    font-size: 40px;
    color: #374231; 
    margin-bottom: 20px;
    font-weight: 700;
    @media (max-width: 768px) {
        font-size: 36px;
        width: 100%;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    @media (max-width: 768px) {
       
    }
`

const StyledYesCupNotes = styled(YesCupNotes)`
    width: 300px;
    height: 300px;

    @media (max-width: 768px){
        width: 150px;
        height: 150px;
    }
`

const StyledNoCupNotes = styled(NoCupNotes)`
    width: 300px;
    height: 300px;

    @media (max-width: 768px){
        width: 150px;
        height: 150px;
    }
`