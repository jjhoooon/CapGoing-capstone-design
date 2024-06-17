import React, { useEffect, useState } from 'react'
import RequireSetCupNotes from './components/CupNotes/RequireSetCupNotes/RequireSetCupNotes'
import UserInfoForm from './components/CupNotes/UserInfoForm/UserInfoForm'
import UserInfoFormWithoutCupNotes from './components/CupNotes/UserInfoFormWithoutCupNotes/UserInfoFormWithoutCupNotes'
import PreferencesForm from './components/Preferences/PreferencesForm/PreferencesForm'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToRecipes } from '../../store/recipesSlice'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Spinner from '../../../src/assets/images/loading-spinner3.gif'
const UserCoffeeInfoPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isCupNotes, setIsCupNotes] = useState("")
    const [isCoffeeInfo, setIsCoffeeInfo] = useState(false)
    const [IsPreferencesInfo, setIsPreferencesInfo] = useState(false)

    const [coffeeBean, setCoffeeBean] = useState("")
    const [coffeeOrigin, setCoffeeOrigin] = useState("")
    const [roastLevel, setRoastLevel] = useState("")
    const [process, setProcess] = useState("")
    const [cupNotes, setCupNotes] = useState("")

    const [coffeeType, setCoffeeType] = useState("")
    const [coffeeFlavor, setCoffeeFlavor] = useState("")
    const [flavorIntensity, setFlavorIntensity] = useState("")
    const [userPreferences, setUserPreferences] = useState("")

    const [recipe, setRecipe] = useState({})

    const formData = {
        title: coffeeBean,
        origin: coffeeOrigin,
        roasting: roastLevel,
        process: process,
        cupNote: cupNotes,
        coffeeType: coffeeType,
        coffeeFlavor: coffeeFlavor,
        flavorIntensity: flavorIntensity,
        userPreferences: userPreferences,
    }

    const cupNotesForm = {
        title: coffeeBean,
        origin: coffeeOrigin,
        roasting: roastLevel,
        process: process,
    }

    const handleCreateCupNotes = () => {
        setIsCoffeeInfo(true)
        handleCupNotes()
    }

    const saveApi = async () => {
        console.log("fff", formData)
        try {
            const response = await axios.post('https://brewbuzzrecipe.com/coffeeinfo/save',
                formData,
                {
                    withCredentials: true
                }
            );
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    }

    const handleCreateSubmit = () => {
        setIsPreferencesInfo(true)
        saveApi()
        handleChatGPT()
    }

    const handleChatGPT = async () => {
        try {
            const res = await axios.post('https://brewbuzzrecipe.com/chatgpt', formData,
                {
                    withCredentials: true
                }
            );
            console.log("res.data", res.data, res);
            let data;
            if (typeof res.data === 'string') {
                try {
                    data = JSON.parse(res.data);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    return;
                }
            } else {
                console.log("ttt", typeof res.data)
                data = res.data;
            }

            setRecipe(data);
            dispatch(addToRecipes(data))
            navigate('/recipe')
        } catch (error) {
            console.error('Error getting response from OpenAI', error);
        }
    };

    useEffect(() => {
        console.log("recipe", recipe)
    }, [recipe])

    const handleCupNotes = async () => {
        try {
            const res = await axios.post('https://brewbuzzrecipe.com/cup-note', cupNotesForm,
                {
                    withCredentials: true
                }
            );
            console.log("res", res)
            setCupNotes(res.data);

        } catch (error) {
            console.error('Error getting response from OpenAI', error);
        }
    }

    return (
        <Container>
            {!isCupNotes && <RequireSetCupNotes setIsCupNotes={setIsCupNotes} />}
            {isCupNotes == "yes"
                &&
                !isCoffeeInfo
                &&
                <UserInfoForm
                    coffeeBean={coffeeBean}
                    coffeeOrigin={coffeeOrigin}
                    roastLevel={roastLevel}
                    process={process}
                    cupNotes={cupNotes}
                    setCoffeeBean={setCoffeeBean}
                    setCoffeeOrigin={setCoffeeOrigin}
                    setRoastLevel={setRoastLevel}
                    setProcess={setProcess}
                    setCupNotes={setCupNotes}
                    setIsCoffeeInfo={setIsCoffeeInfo}
                />
            }
            {isCupNotes == "no"
                &&
                !isCoffeeInfo
                &&
                <UserInfoFormWithoutCupNotes
                    coffeeBean={coffeeBean}
                    coffeeOrigin={coffeeOrigin}
                    roastLevel={roastLevel}
                    process={process}
                    cupNotes={cupNotes}
                    setCoffeeBean={setCoffeeBean}
                    setCoffeeOrigin={setCoffeeOrigin}
                    setRoastLevel={setRoastLevel}
                    setProcess={setProcess}
                    setCupNotes={setCupNotes}
                    setIsCoffeeInfo={setIsCoffeeInfo}
                    onFormSubmit={handleCreateCupNotes}
                />
            }
            {
                isCoffeeInfo
                &&
                !IsPreferencesInfo
                &&
                <PreferencesForm
                    coffeeType={coffeeType}
                    setCoffeeType={setCoffeeType}
                    coffeeFlavor={coffeeFlavor}
                    setCoffeeFlavor={setCoffeeFlavor}
                    flavorIntensity={flavorIntensity}
                    setFlavorIntensity={setFlavorIntensity}
                    setUserPreferences={setUserPreferences}
                    setIsPreferencesInfo={setIsPreferencesInfo}
                    onFormSubmit={handleCreateSubmit}
                    cupNotes={cupNotes}
                />
            }
            {
                IsPreferencesInfo
                &&
                <div>
                    <LoadingTitle>레시피 생성 중</LoadingTitle>
                    <img src={Spinner} alt='로딩' width={300} />
                </div>
            }
        </Container>
    )
}

export default UserCoffeeInfoPage

const Container = styled.div`
    display: flex;
    width: 100vw;
    min-height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 80vh;
    background-size: cover;
    opacity: 0.8;
    z-index: -3;
`;

const LoadingTitle = styled.div`
    width: 100%;
    text-align: center;
    color: #28382f;
    font-size: 40px;
    font-weight: 700;
`