import React from 'react'
import styled from 'styled-components'
import Header from './Header/Header'
import Contents from './Contents/Contents'

const Main = () => {
    return (
        <Container>
            <Header />
            <Contents />
        </Container>
    )
}

export default Main

const Container = styled.div`
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
    position: relative;
`