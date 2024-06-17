import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import AppLayout from "./layouts/AppLayout";
import RecipePage from "./pages/RecipePage/RecipePage";
import UserCoffeeInfoPage from "./pages/UserCoffeeInfoPage/UserCoffeeInfoPage";
import styled from "styled-components";
import createGlobalStyle from "styled-components";
import './App.css'
import { useEffect } from "react";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MyPage from "./pages/MyPage/MyPage";
import ScrollToTop from "./utils/ScrollToTop";

function App() {

    function setScreenSize() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    useEffect(() => {
        setScreenSize();
    });

    return (
        <Container>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={<AppLayout />}
                >
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/user-coffee-info" element={<UserCoffeeInfoPage />} />
                    <Route path="/recipe" element={<RecipePage />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Container>
    );
}

export default App;

const Container = styled.div`
    @media (max-width: 768px) {
}
`