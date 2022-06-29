import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";

const MethodDiv = styled.div`
    width: 350px;
    height: 180px;
    border: 1px solid  #e2e2e2;
    border-radius: 2px;
`;

const MethodValueDiv = styled.div`
    display: flex;
    width: 350px;
    height: 50px;
    border-bottom: 1px solid  #e2e2e2;
    align-items: center;
`;

const MethodValue = styled.div`
    padding-left: 10px;
`;

const MethodInfoDiv = styled.div`
    display: inline-block;
    width: 350px;
    height: 100%;
    padding: 10px 10px 10px 10px;
`;

const ButtonDiv = styled.div`
    display: flex;
    height: 100%;
    margin-left: 170px;
    align-items: center;
`;

const Button = styled.button`
    width: 49px;
    height: 25px;
    border: 1px solid #e2e2e2;
    margin-left: 13px;
    font-size: 15px;
`;

const MethodInfo = styled.div`
    padding: 0px 10px 10px 0px;
`;

export default function MethodComp() {
  return (
    <React.Fragment>
        <MethodDiv>
            <MethodValueDiv>
                <MethodValue>GET</MethodValue>
                <ButtonDiv>
                    <Button>보기</Button>
                    <Button>삭제</Button>
                </ButtonDiv>
            </MethodValueDiv>
            <MethodInfoDiv>
                <MethodInfo>엔드포인트</MethodInfo>
                <MethodInfo>api key 필요</MethodInfo>
            </MethodInfoDiv>
        </MethodDiv>      
    </React.Fragment> 
  );
}