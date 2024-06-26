import React from 'react'
import styled from 'styled-components'
import Main from './components/Main'

const RecipePage = () => {
    return (
        <Container>
            <Main />
        </Container>
    )
}

export default RecipePage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: -3;
`