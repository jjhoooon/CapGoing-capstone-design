import React from 'react'
import styled from 'styled-components'
import { FaUser } from "react-icons/fa6";
import { useUserInfoQuery } from '../../../../hooks/useUserInfo';

const UserInfo = () => {
    const { data: userInfo, isLoading, isError, error } = useUserInfoQuery()
    console.log("ddd", userInfo)
    if (isLoading) {
        return <h1>마이페이지 조회중...</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }


    return (
        <Container>
            <UserIcon />
            <TextInfoWrapper>
                <InfoText>닉네임 : {userInfo.displayName}</InfoText>
                <InfoText>ID : {userInfo.authId}</InfoText>
            </TextInfoWrapper>
        </Container>
    )
}

export default UserInfo

const Container = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 16px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 768px) {
        width: 300px;
        height: 200px;
    }
`
const UserIcon = styled(FaUser)`
    width: 100px;
    height: 100px;
`

const TextInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: 768px) {
        max-width: 120px;
        
    }
`

const InfoText = styled.div`
    font-family: sans-serif;
    font-weight: 600;
`
