import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import styled, { css } from 'styled-components';

const ToggleBtn = styled.button`
  width: 24px;
  height: 2px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "#b6b6c3" : "#03428e")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;

`;

const Circle = styled.div`
  background-color: white;
  width: 16px;
  height: 16px;
  border-radius: 50px;
  position: absolute;
  left: 0%;
  transition: all 0.5s ease-in-out;
  border: 2px solid ${(props) => (!props.toggle ? "#b6b6c3" : "#03428e")};
  ${(props) =>
    props.toggle &&
    css`
    /* 스위치가 움직이는 거리 */
      transform: translate(9px, 0);
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