import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  background: #ffffff;
  border-radius: 4px;
  
  display: flex;
  justify-content: center;  
  align-items: center;
`;

const rotation = keyframes`
  from{
      transform: rotate(0deg);
  }
  to{
      transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div`
	height: 30px;
	width: 30px;
	border: 2px solid royalblue;
	border-radius: 50%;
	border-top: none;
	border-right: none;
	margin: 16px auto;
	animation: ${rotation} 1s linear infinite;
 
`;



export default function Spinner() {

  return (
    <Wrapper>
      <SpinnerDiv />
    </Wrapper>
  )
}
