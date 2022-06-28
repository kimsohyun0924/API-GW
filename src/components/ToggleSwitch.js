import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import styled, { css } from 'styled-components';
import CORS from '../pages/CORS';

const ToggleBtn = styled.button`
  width: 36px;
  height: 20px;
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
  width: 15px;
  height: 15px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  ${(props) =>
    props.toggle &&
    css`
    /* 스위치가 움직이는 거리 */
      transform: translate(17px, 0);
      transition: all 0.5s ease-in-out;
    `}
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

export default function ToggleSwitch({ clickedToggle, toggle}) {
  
    // const [toggle, setToggle] = useState(false);
    // const [content, setContent] = useState(true);

    // const clickedToggle = () => {
    //   setToggle((prev) => !prev);
    //   console.log(toggle);
    //   if(toggle == true) {
    //     setContent("true");
    //   }
    //   else {
    //     setContent("false");
    //   }
    //   console.log(content);
    // };

    // const selectComponent = {
    //   false : <CORS/>
    // };


    return (
     <div>
        <ToggleBtn onClick={clickedToggle} toggle={toggle} >
          <Circle toggle={toggle} />
        </ToggleBtn>
        {/* {content && <Content>{selectComponent[content]}</Content>} */}
     </div>
    );
  }