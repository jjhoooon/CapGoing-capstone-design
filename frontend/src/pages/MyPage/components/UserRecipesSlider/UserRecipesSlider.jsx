import React, { useState } from 'react'
import { useUserRecipesQuery } from '../../../../hooks/useUserRecipes'
import 'react-multi-carousel/lib/styles.css';
import { responsive } from '../../../../constants/responsive';
import Carousel from 'react-multi-carousel';
import RecipeCard from '../../../../common/RecipeCard/RecipeCard';
import styled from 'styled-components';

const UserRecipesSlider = () => {

    const { data: recipes, isLoading, isError, error } = useUserRecipesQuery()
    console.log("ddd", recipes)
    if (isLoading) {
        return <h1>마이페이지 조회중...</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <Container>
            <StyledCarousel
                // infinite={true}
                centerMode={true}
                itemClass="movie-slider p-1"
                containerClass="carousel-container"
                responsive={responsive}
            >
                {recipes?.map((recipe) =>
                    <RecipeCard
                        key={recipe.recipe_id}
                        recipe={recipe}
                    />
                )}
            </StyledCarousel>
        </Container>
    )
}

export default UserRecipesSlider

const Container = styled.div`
    width: 100%;
`

const StyledCarousel = styled(Carousel)`
    .carousel-container {
        overflow: hidden;
        height: 440px;
    }
`;
