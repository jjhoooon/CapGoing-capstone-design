import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const images = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVABmHjrOzJzlO9juDlA0cHHuZbdjg3QmG46AL9mmsW1NVFtV9v2NNHN1_AGnhQk9j0oA&usqp=CAU",
    "https://img.freepik.com/free-photo/fresh-coffee-steams-wooden-table-close-up-generative-ai_188544-8923.jpg"
];

const getRandomImage = () => {
    return images[Math.floor(Math.random() * images.length)];
}


const RecipeCard = ({ recipe }) => {
    const navigate = useNavigate()
    const handleDeleteRecipe = async () => {
        try {
            const response = await axios.delete(`https://brewbuzzrecipe.com/recipe/${recipe?.id}`, {
                withCredentials: true
            });
            if (response.status === 200) {
                alert("삭제 완료")
                navigate('/')
            }
        } catch (error) {
            console.error('There was an error removing the recipe', error);
        }
    }

    return (
        <Card>
            <Image src={getRandomImage()} alt="Recipe Image" />
            <Title>{recipe?.title}</Title>
            <Description>{recipe?.cupNote}</Description>
            <ButtonWrapper>
                <Button>보기</Button>
                <Button onClick={() => handleDeleteRecipe()}>삭제</Button>
            </ButtonWrapper>
        </Card>
    );
}

export default RecipeCard;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: center;
`

// RecipeCard 스타일 정의
const Card = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    margin: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Image = styled.img`
    width: 100%;
    border-radius: 8px 8px 0 0;
    @media (max-width: 768px) {
        width: 100%;
        height: 90px;
}
`;

const Title = styled.h2`
    font-size: 1.5em;
    margin: 16px 0;
`;

const Description = styled.p`
    font-size: 1em;
    font-weight: 700;
    color: #555;
`;

const Button = styled.button`
    padding:5px 15px;
    margin-top: 16px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    font-size: 0%.5;

    &:hover {
        background-color: #45a049;
    }
`;


