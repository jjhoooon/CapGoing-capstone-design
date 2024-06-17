import styled, { keyframes } from 'styled-components'
import BackgroundImg from '../../assets/images/backgroundImg.jpg'
import { useNavigate } from 'react-router-dom'
import Banner from './components/Banner/Banner'
import TestDB from './components/TestDB/TestDB'

const MainPage = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/user-coffee-info')
    }

    return (
        <Container>
            <BannerContainer>
                <Banner />
            </BannerContainer>
        </Container>
    )
}

export default MainPage

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

const BannerContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

