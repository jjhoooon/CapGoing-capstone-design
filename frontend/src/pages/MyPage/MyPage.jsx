import styled, { keyframes } from 'styled-components'
import UserRecipesSlider from "./components/UserRecipesSlider/UserRecipesSlider"
import UserInfo from './components/UserInfo/UserInfo'


const MyPage = () => {
    return (
        <Container>
            <SectionTitle>사용자 정보</SectionTitle>
            <UserInfo />
            <SectionTitle>나만의 레시피</SectionTitle>
            <UserRecipesSlider />
        </Container>
    )
}

export default MyPage

const SectionTitle = styled.div`
    font-family: sans-serif;
    font-size: 36px;
    font-weight: 900;
    margin-top: 20px;
`

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
    width: 100vw;
    min-height: 80vh;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 80vh;
    opacity: 0.8;
    z-index: -3;
    animation: ${fadeIn} 0.5s ease-in;
`;