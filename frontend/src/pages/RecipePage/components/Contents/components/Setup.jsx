import React from 'react'
import styled from 'styled-components'
import setupItemImg from '../../../../../assets/images/setup-item.jpg'

const Setup = ({
    dose,
    water_temperature,
    total_water_quantity
}) => {
    return (
        <Container>
            <Section>
                <ItemImg src={setupItemImg} alt='준비물' />
            </Section>
            <GuideWrapper>
                <Section>
                    <Title>준비물</Title>
                    <ItemList>
                        <Item>콘 드리퍼</Item>
                        <Item>필터</Item>
                        <Item>커피 서버</Item>
                        <Item>아두이노 저울</Item>
                        <Item>주전자</Item>
                        <Item>얼음</Item>
                    </ItemList>
                </Section>
                <Section>
                    <Title>물과 커피의 비율</Title>
                    <ItemList>
                        <Item>{dose}g 커피 원두</Item>
                        <Item>{total_water_quantity}ml 물</Item>
                        <Item>{water_temperature}'C 적정 물 온도</Item>
                    </ItemList>
                </Section>
            </GuideWrapper>
        </Container>
    );
}

export default Setup

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;
    padding-top: 10px;
`;

const GuideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media (max-width: 768px) {
        width: 90%;
        display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    }
`

const Section = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #374231;
    margin-bottom: 20px;
`;

const ItemList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const Item = styled.li`
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    &::before {
        content: '●';
        color: #4caf50;
        display: inline-block;
        width: 1em;
        margin-left: -1em;
        margin-right: 0.5em;
    }
`;

const ItemImg = styled.img`
    width: 50%;
    max-width: 600px;
    height: auto;
    border-radius: 10px;
    margin: 10px 0;
`