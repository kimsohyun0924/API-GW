import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from "styled-components";
import Button from 'components/Button';
import axios from 'axios';
import { useLocation } from "react-router";
import { CopyToClipboard } from "react-copy-to-clipboard";
import StageMethodComp from 'components/StageMethodComp';
import { stepButtonClasses } from '@mui/material';

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

const MethodDiv = styled.div`
  display: inline-block;
  padding: 10px 10px 0px 10px;
`;

export default function StageInfo(props) {

  // console.log(props);

  const [stageConnect, setStageConnect] = useState(false);
  const resourceId = props.resourceId;
  const [methods, setMethods] = useState([]);
  const [error, setError] = useState(null);
  
  const onClick = (e) => {
    console.log("보기");
    const str = e.target.getAttribute('value').split("!");

    console.log(e.target.getAttribute('value'));
    props.setResourceId(str[0]);
    props.setLabel(str[1]);
    props.setBackend_url(str[2]);
    props.setContent('fourth');
  }

  const fetchMethods = async () => {
    //get methods request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/apigw/resource/'+resourceId,
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      setMethods(response.data); // 데이터는 response.data)
      // console.log(response.data);
    } catch (e) {
      setError(e);
    }
    // window.location.reload(true);
  };

  useEffect(() => {
    fetchMethods();
  }, [resourceId]);

  return (
    <React.Fragment>
      {/* <InvokeurlDiv>{resourceId}.ktcloud.io
        <CopyToClipboard text={resourceId+".ktcloud.io"} onCopy={()=>alert("주소가 복사되었습니다")}>
          <CopyButtonDiv>주소 복사</CopyButtonDiv>
        </CopyToClipboard>
      </InvokeurlDiv> */}
      <React.Fragment>
        { methods.method_list && methods.method_list.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <MethodDiv>
                <StageMethodComp methodInfo={item} onClick={onClick}/>                 
              </MethodDiv>
            </React.Fragment>
          );
        })}
      </React.Fragment> 
    </React.Fragment>
  );
}
