import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

import { ReactComponent as LNB_DBaaS } from '../image/LNB_DBaaS.svg';
import { ReactComponent as Icon_Manual } from '../image/Table_Manual.svg';
import { ReactComponent as Icon_Techcenter } from '../image/Table_Techcenter.svg';
import { ReactComponent as Icon_Satisfaction } from '../image/Satisfaction.svg';

const HeaderDiv = styled.div`
  height: 30px;
  width: 100%;
  z-index: 20;
  /* padding: 0.5rem 1rem 2rem 1rem; */
  padding: 10px 0px 0px 0px;
  display: flex;
  /* margin: 10px 10px 10px 10px; */
`;

const HeaderLeft = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: 50px;
`;

const UL = styled.ul`
  font-size: 1rem;
  margin-left: 1rem;
  padding-top: 0.5rem;
`;

const LI = styled.li`
  display: inline;
  padding: 0.3rem;

  &:hover {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Text = styled.span`
  font-size: 13px;
  color: #333336;
  padding-left: 5px;
  padding-right: 10px;
`

const TextLocation = styled.span`
  font-size: 13px;
  color: #333336;
  padding-left: 3px;
  font-weight: 500;
`

export default function MainHeader({location}) {

  const [url, setUrl] = useState("/myapis");

  useEffect(() => {


    if(location === 'APIs') {
      setUrl('/apigw-listmyapis');
    }
    else if(location === 'API 생성') {
      setUrl('/api/create');
    }
    else if(location === 'Usage Plans') {
      setUrl('/apigw-usageplans');
    } else if((location === 'API Keys')) {
      setUrl('/apigw-apikeys');
    }

  }, [location]);

  return (

    <React.Fragment>

      <HeaderDiv>
        <HeaderLeft>
          <LNB_DBaaS /> 
          <Text> API Gateway </Text>
          <Text> {` > `} </Text>
          <Link to={url}><TextLocation> {location} </TextLocation></Link>
        </HeaderLeft>

        <HeaderRight>
 
            <LI><Icon_Manual /> <Text>매뉴얼</Text> </LI>
            <LI><Icon_Techcenter /> <Text>온라인문의</Text> </LI>
            <LI><Icon_Satisfaction /> <Text>만족도평가</Text> </LI>
     
        </HeaderRight>
      </HeaderDiv>

    </React.Fragment>   
  )
}

