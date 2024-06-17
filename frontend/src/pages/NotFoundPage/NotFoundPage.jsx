// NotFoundPage.js
import React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => {
    return (
        <Container>
            <Title>404</Title>
            <Description>Page Not Found</Description>
            <HomeLink href="/">Go to Home</HomeLink>
        </Container>
    );
}

export default NotFoundPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 6rem;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1.5rem;
    margin-bottom: 40px;
`;

const HomeLink = styled.a`
    font-size: 1rem;
    color: #4caf50;
    text-decoration: none;
    border: 1px solid #4caf50;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #4caf50;
        color: white;
    }
`;
