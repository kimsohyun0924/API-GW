import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import ToggleSwitch from 'components/ToggleSwitch';
import Button from 'components/Button';
import axios from 'axios';
import { useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import img1 from "image/Advanced_pre.svg";
import img2 from "image/Advanced.svg";

const BodyDiv = styled.div`
  display: block;
  /* margin: 0px 0px 0px 0px; */
`;

const ItemDiv = styled.div`
  display: block;
  /* color: #555555; */
  /* padding: 10px 0px 10px 0px; */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  width: 917px;
  height: 45px;
`;

const ItemName = styled.div`
  width: 143px;
  height: 45px;
  font-size: 16px;
  padding: 10px 0px 5px 10px;
`;

const ItemInput = styled.div`
  display: flex;
  width: 784px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 0px;
`;

const InputForm = styled.input`
  width: 200px;
  height: 30px;
  font-size: 14px;
  border: solid 1px #b6b6c3;
  box-sizing: border-box;
  color: #333336;
  padding: 6px 10px 4px 9px;
`;

const ItemNote = styled.div`
  font-size: 16px;
  color: black;
  padding: 0 10px;
  height: 32px;
  text-align: left;
  display : flex;
  justify-content : center;
  align-items : center;

  ${props => props.state &&
    css`
      color: red;
    `
  }
`;

const RequestDiv = styled.div`
  display: flex;
  padding: 0px 0px 0px 0px;
  background: pink;
`;

const RequestName = styled.div`
  width: 143px;
  height: 45px;
  font-size: 14px;
  padding: 10px 0px 5px 10px;
`;

const RequestForm = styled.input`
  width: 150px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 12px;
  color: #333333;
`;

const InvokeurlDiv = styled.div`
  background: #eff4fb;
  /* #d9edf7 #d7e3f5 */
  font-size : 16px;
  font-weight: bold;
  padding: 15px 20px 15px 20px;
`;

const CopyButtonDiv = styled.button`
  margin: 0px 0px 0px 10px;
  cursor: pointer;
`;

const VisiablDiv = styled.div`
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 5px 0px;
  border-bottom: 0.5px solid black;
  /* #e2e2e2 */
  /* background: pink; */
`;

const VisiablText = styled.span`
  display: flex;
  font-size: 18px;
  cursor: pointer;
  /* display: inline-block */
`;

const UsagePlanDiv = styled.div`
  padding: 10px 0px 10px 0px;
`;

export default function StageMethod(props) {

  const [stageConnect, setStageConnect] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [inputs, setInputs] = useState({
    replenish_rate: '',
  });
  const { replenish_rate} = inputs;

  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
    console.log(toggle);
  };


  return (
    <React.Fragment>
      <BodyDiv>
        <ItemDiv>
          <Item>
            <ItemName>Throttling</ItemName>
            <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
          </Item>
        </ItemDiv>
        { toggle === true ? 
          <React.Fragment>
            <div style={{margin: "0px 20px 0px 20px", padding: "5px 0px 5px 0px", border: "1px solid #b6b6c3"}}>
              <Item>
                <RequestName>요율</RequestName>
                <ItemInput>
                  <InputForm name="" value="요율값 입력"/>
                </ItemInput>
              </Item>
              <Item>
                <RequestName>버스트</RequestName>
                <ItemInput>
                  <InputForm value="버스트값 입력"/>
                </ItemInput>
              </Item>
            </div>
          </React.Fragment>
          : null
        }
      </BodyDiv>
    </React.Fragment>
  );
}
