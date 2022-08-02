import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import Button from '../components/Button';
import axios from 'axios';
import { useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import img1 from "../image/Advanced_pre.svg";
import img2 from "../image/Advanced.svg";

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
  margin: 0px 20px 0px 20px;
  padding: 5px 0px 5px 0px;
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
  padding: 10px 20px 10px 20px;

`;

export default function StageInfo(props) {

  const [stageConnect, setStageConnect] = useState(false);
  
  const onClick = () => {
    // console.log(isActive2)
    setStageConnect((prev) => !prev);
  }

  return (
    <React.Fragment>
      <InvokeurlDiv>{props.resourceId}.ktcloud.io
        <CopyToClipboard text={props.resourceId+".ktcloud.io"} onCopy={()=>alert("주소가 복사되었습니다")}>
          <CopyButtonDiv>주소 복사</CopyButtonDiv>
        </CopyToClipboard>
      </InvokeurlDiv>
      <VisiablDiv>
        <VisiablText onClick={onClick}>Usage Plans
          { stageConnect === true ?
            <img style={{padding:"0px 0px 0px 10px"}} src={img2}/>
            : <img style={{padding:"0px 0px 0px 10px"}} src={img1}/>
          }
        </VisiablText>
       
      </VisiablDiv>
      { stageConnect === true ?
            <UsagePlanDiv>
              <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
                <Button size="large">Usage Plan 연결 </Button>
                <Button size="medium">연결 해제 </Button>
              </ThemeProvider>
            </UsagePlanDiv>
            : null}
    </React.Fragment>
  );
}
