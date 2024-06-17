import React from 'react'
import styled from 'styled-components'
import { MdMenu } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authenticateActions } from '../../../../../store/authenticateReducer';
import BackgroundImg from '../../../../../assets/images/nav1.svg';

const Navbar = ({
	auth,
	isOpen,
	setIsOpen
}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const navigateHome = () => {
		setIsOpen(false)
		navigate('/')
	}

	const navigateLogin = () => {
		setIsOpen(false)
		navigate('/login')
	}

	const navigateMyPage = () => {
		setIsOpen(false)
		navigate('/mypage')
	}

	const handleLogout = async () => {
		try {
			const response = await axios.get('https://brewbuzzrecipe.com/auth/logout',
				{
					withCredentials: true
				}
			)
			if (response.status === 200) {
				// 로그인 후 사용자 정보 요청
				alert("로그아웃 성공")
				setIsOpen(false)
				dispatch(authenticateActions.logout())
				navigate('/')
			}
		} catch (error) {
			console.error('There was an error logging in!', error);
		}
	}

	return (
		<Container>
			<StyledMenuIcon onClick={toggleSidebar} />
			<Sidebar isOpen={isOpen}>
				<CloseButton onClick={toggleSidebar}>X</CloseButton>
				<NavItem onClick={navigateHome} active={location.pathname === '/'}>Home</NavItem>
				{!auth && <NavItem onClick={navigateLogin} active={location.pathname === '/login'}>Login</NavItem>}
				{auth && <NavItem onClick={navigateMyPage} active={location.pathname === '/mypage'}>MyPage</NavItem>}
				{auth && <NavItem onClick={handleLogout}>Logout</NavItem>}
			</Sidebar>
		</Container>
	)
}

export default Navbar

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: auto;
  background-color: transparent;
  opacity: 1;
  `;

const StyledMenuIcon = styled(MdMenu)`
      font-size: 32px;
      color: #336d31;
  `

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-300px')};
  width: 300px;
  height: 100%;
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-position: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: left 0.5s ease;
  z-index: 5; 
  @media (max-width: 768px) {
    width: 100%;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  `;

const NavItem = styled.div`
  margin: 20px 0;
  padding-bottom: 5px;
  font-size: 30px;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? '3px solid #fff' : 'none')};
  &:hover {
      color: #ddd;
      }
      `;