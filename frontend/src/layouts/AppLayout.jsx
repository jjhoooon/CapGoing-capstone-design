import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import Footer from './component/Footer/Footer';
import Header from "./component/Header/Header";
import styled from "styled-components";
import BackgroundImg from '../assets/images/backgroundImg.jpg'
import Navbar from "./component/Header/components/Navbar/Navbar";

const AppLayout = () => {
    const [isOpen, setIsOpen] = useState(false);


    return (
        <Layout>
            <Header />
            <Outlet />
        </Layout>
    );
};

export default AppLayout;

const Layout = styled.div`
        display: flex;
    width: 100%;
    min-height: 80vh;
    flex-direction: column;
    align-items: center;
    position: relative;
    height: 100vh;
    background: 
        linear-gradient(rgba(124, 124, 115, 0.8), rgba(124, 149, 128, 0.8)),
        url(${BackgroundImg}) no-repeat center;
    background-size: cover;
    opacity: 0.8;


    @media (max-width: 768px) {
        display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    position: relative;
    background: 
        linear-gradient(rgba(124, 124, 115, 0.8), rgba(124, 149, 128, 0.8)),
        url(${BackgroundImg}) no-repeat center;
    background-size: cover;
    opacity: 0.8;
    min-height: 140vh;
    }
`;
