import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotation = keyframes`
  from{
      transform: rotate(0deg);
  }
  to{
      transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div`
	height: 16px;
	width: 16px;
	border: 2px solid royalblue;
	border-radius: 50%;
	border-top: none;
	border-right: none;
	margin: 0px auto;

	animation: ${rotation} 1s linear infinite;

  ${props => props.type === 'changing' &&
    css`
      border-color: orange;
    `
  }

  ${props => props.color &&
    css`
      border-color: ${props.color};
    `
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SpinnerSmall({type, color}) {

  return (
    <Wrapper>
      {/* <div>{ text && <Text>{text}</Text> }</div> */}
      <SpinnerDiv type={type} color={color}/>

    </Wrapper>
  )
}
