import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import smoothscroll from 'smoothscroll-polyfill';

const Header = () => {

    const section1Ref = useRef(null)
    const section2Ref = useRef(null)
    const section3Ref = useRef(null)
    const section4Ref = useRef(null)

    smoothscroll.polyfill();
    const scrollToSection = (ref) => {

        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }


    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);


    return (
        <div>
            <Menu>
                <MenuItem onClick={() => scrollToSection(section1Ref)}>
                    <Link href="#bloom" className='menu-item'>
                        뜸 들이기
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => scrollToSection(section2Ref)}>
                    <Link href="#first-step" className='menu-item'>
                        1차 추출
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => scrollToSection(section3Ref)}>
                    <Link href="#second-step" className='menu-item'>
                        2차 추출
                    </Link>
                </MenuItem>
                <MenuItem onClick={() => scrollToSection(section4Ref)}>
                    <Link href="#third-step" className='menu-item'>
                        3차 추출
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default Header

const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    width: 60%;
    height: 54px;
    padding: 0px;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    right: 50%;
    transform: translateX(50%);
    @media (max-width: 768px) {
        width: auto;
        position: fixed;
        top: 30%;
        right: 30px;
        flex-direction: column;
        height: auto;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 10px;
    }
`;

const MenuItem = styled.li`
    margin: 0 32px;
    list-style: none;
    @media (max-width: 768px) {
        margin: 0 32px 0 0;
    }
`

const Link = styled.a`
    font-size: 16px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 12px;
    border-radius: 20px;

    &:hover{
        background-color: #438ecc;
        color:#fff;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        padding: 0 4px;
}
`;