import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import styled, { css } from 'styled-components';

const ToggleBtn = styled.button`
  width: 34px;
  height: 18px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "gray" : "rgb(51,30,190)")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;

`;

const Circle = styled.div`
  background-color: white;
  width: 13px;
  height: 13px;
  border-radius: 50px;
  position: absolute;
  left: 7%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
    /* 스위치가 움직이는 거리 */
      transform: translate(16px, 0);
      transition: all 0.5s ease-in-out;
    `}

`;

export default function ToggleSwitch({ clickedToggle, toggle }) {

    return (
     <div>
        <ToggleBtn onClick={clickedToggle} toggle={toggle}>
        <Circle toggle={toggle}/>
        </ToggleBtn>
     </div>
    );
  }