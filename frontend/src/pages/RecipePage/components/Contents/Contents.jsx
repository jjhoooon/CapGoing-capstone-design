import React, { useEffect } from 'react'
import styled from 'styled-components'
import Bloom from './components/Bloom'
import FirstStep from './components/FirstStep'
import SecondStep from './components/SecondStep'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Setup from './components/Setup'
import DripperSetup from './components/DripperSetup'
import PreheatSetup from './components/PreheatSetup'
import GrindSetup from './components/GrindSetup'
import ThirdStep from './components/ThirdStep'
import LastStep from './components/LastStep'
import { useNavigate } from 'react-router-dom'

const Contents = () => {
    const navigate = useNavigate();
    const recipes = useSelector(state => state.recipes.recipes)
    const recipe = recipes[0]

    let dose = recipe.Dose;
    let water_temperature = recipe.Water_temperature;
    let pouring_time = recipe.Pouring_time
        .split(',').map(time => time.trim())
    let extraction_time = recipe.Extraction_time
        .split(',').map(time => time.trim())
    let water_quantity = recipe.Water_quantity
        .split(',').map(time => time.trim())

    let total_water_quantity = water_quantity
        .map(quantity => parseFloat(quantity))
        .reduce((acc, curr) => acc + curr, 0);

    const savingData = {
        dose: dose,
        water_temperature: water_temperature,
        bloom_pouring_time: "0",
        bloom_water_quantity: water_quantity[0],
        bloom_extraction_time: extraction_time[0],
        first_pouring_time: pouring_time[1],
        first_water_quantity: water_quantity[1],
        first_extraction_time: extraction_time[1],
        second_pouring_time: pouring_time[2],
        second_water_quantity: water_quantity[2],
        second_extraction_time: pouring_time[2],
    }




    useEffect(() => {
        if (!recipe || recipe.length === 0) {
            navigate('/notfound');
        }
    }, [recipe, navigate]);

    if (!recipe || recipe.length === 0) {
        return null;
    }


    console.log("ddd", recipe)

    const handleAWSIoT = async () => {
        try {
            const res = await axios.post('https://brewbuzzrecipe.com/publish', recipe,
                {
                    withCredentials: true
                }
            );
            console.log("rrr", recipe);
        } catch (error) {
            console.error('Error publishing to AWS IoT', error);
        }
    };

    const handleSaveData = async (event) => {

        try {
            const response = await axios.post('https://brewbuzzrecipe.com/recipe/save',
                savingData,
                {
                    withCredentials: true
                }
            );
            if (response.status === 200) {
                navigate('/')
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    const navigateHome = () => {
        navigate('/')
    }

    return (
        <Container>
            <AwsButton onClick={() => handleAWSIoT()}>저울 키트 연동</AwsButton>
            <ContentsWrapper bgColor="#e0d3be">
                <Setup
                    dose={dose}
                    water_temperature={water_temperature}
                    total_water_quantity={total_water_quantity}
                />
            </ContentsWrapper>
            <ContentsWrapper bgColor="#e0d3be">
                <DripperSetup />
            </ContentsWrapper>
            <ContentsWrapper bgColor="#e0d3be">
                <PreheatSetup />
            </ContentsWrapper>
            <ContentsWrapper bgColor="#e0d3be">
                <GrindSetup
                    dose={dose}
                />
            </ContentsWrapper>
            <ContentsWrapper id='bloom' bgColor="#eedcc0">
                <Bloom
                    water_quantity={water_quantity[0]}
                    extraction_time={extraction_time[0]}
                />
            </ContentsWrapper>
            <ContentsWrapper id='first-step' bgColor="#eedcc0">
                <FirstStep
                    water_quantity={water_quantity[1]}
                    extraction_time={extraction_time[1]}
                    pouring_time={pouring_time[1]}
                />
            </ContentsWrapper>
            <ContentsWrapper id='second-step' bgColor="#eedcc0">
                <SecondStep
                    water_quantity={water_quantity[2]}
                    extraction_time={extraction_time[2]}
                    pouring_time={pouring_time[2]}
                />
            </ContentsWrapper>
            {
                pouring_time[3]
                &&
                <ContentsWrapper id='third-step' bgColor="#eedcc0">
                    <ThirdStep
                        water_quantity={water_quantity[3]}
                        extraction_time={extraction_time[3]}
                        pouring_time={pouring_time[3]}
                    />
                </ContentsWrapper>
            }
            <ContentsWrapper bgColor="#f7e2c2">
                <LastStep />
            </ContentsWrapper>
            <ButtonWrapper bgColor="#f7e2c2">
                <Button onClick={() => handleSaveData()}>저장하기</Button>
                <Button onClick={() => navigateHome()}>메인 화면</Button>
            </ButtonWrapper>
        </Container>
    )
}

export default Contents

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 70vh;
    background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
`

const Button = styled.div`
        padding: 10px 20px;
    font-size: 2rem;
    color: white;
    background-color: black;
    border: none;
    border-radius: 0px 0px 20px 20px;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #333;
    }

    @media (max-width: 768px) {
        width: 150px;
        padding: 12px 16px;
        font-size: 1.2rem;
    }
`

const Container = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
`;

const ContentsWrapper = styled.div`
    width: 100%;
    height: 70vh;
    border-bottom: 4px solid #354132;
    background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
`
const AwsButton = styled.div`
    padding: 10px 20px;
    font-size: 2rem;
    color: white;
    background-color: black;
    border: none;
    border-radius: 20px 20px 0 0;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
        background-color: #333;
        transform: scaleX(1.1);
    }

    @media (max-width: 768px) {
        padding: 12px 16px;
        font-size: 1.2rem;
    }
`