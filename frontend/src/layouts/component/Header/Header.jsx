// Header.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../../../src/assets/images/nav-logo.svg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth.authenticate)
    const [isOpen, setIsOpen] = useState(false);


    const handleNavigate = () => {
        navigate('/')
    }

    const handleLogout = async () => {
        try {
            const response = await axios.get('https://brewbuzzrecipe.com/auth/logout', { withCredentials: true });

            if (response.status === 200) {
                navigate('/');
                console.log("로그아웃 완료");
            }
        } catch (error) {
            console.error('There was an error logging out!', error);
        }
    };

    return (
        <HeaderContainer>
            <StyledLogo onClick={() => handleNavigate()} width={200} height={100} />
            <NavbarContainer>
                <Navbar
                    auth={auth}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            </NavbarContainer>
        </HeaderContainer>
    );
}

export default Header;

const HeaderContainer = styled.header`
      width: 100%;
      margin: 0 auto;
      padding: 10px 0px;
      height: 100px;
      background-color: #A1DCB9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
    }
    `;

const StyledLogo = styled(Logo)`
        position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 100px;
    cursor: pointer;

    @media (max-width: 768px) {
        width: 150px;
        height: 70px;
    }
`;

const NavbarContainer = styled.div`
    margin-left: auto;
    margin-right: 20px;
    display: flex;
    align-items: center;
`;