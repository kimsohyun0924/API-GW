import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import Button from '../components/Button';
import ResourceCreate from './ResourceCreate';



const ResourceContainer = styled.div`
  min-height: 680px;
`;

const ButtonDiv = styled.div`
  display : flex;
  padding: 10px 0px 20px 0px;
`;

const InfoDiv = styled.div`
  display: flex;
`;

const MenuDiv = styled.div`
  position: fixed;
  width: 260px;
  height: 610px;
  padding: 15px 15px 0px 15px;
  border: 1px solid #e2e2e2;
`;

const TreeNode = styled.div`
  position: relative;
  /* background: pink; */
  width: 100%;
  height: 33px;
  font-size: 20px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;

  &:hover {
    cursor: pointer;
    }
`;

const ResourceInfo = styled.div`
  margin-left: 260px;
  height: 610px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
  border-top-color: #e2e2e2;
  border-top-width: 1px;
  border-right-color: #e2e2e2;
  border-right-width: 1px;
  padding : 15px 15px 15px 15px;
`;

const Content = styled.div`
 
  width: 100%;
  height: 100%;
`;

export default function Resource() {

  const [content, setContent] = useState();
  


  const onClick = e => {
    setContent('first');
  };

  const selectComponent = {
    first: <ResourceCreate />
  };

  return (
    <React.Fragment>
      <ResourceContainer>
          <ButtonDiv>
            <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
              <Button size="medium" onClick={onClick}>stage 생성</Button>
            </ThemeProvider>
          </ButtonDiv>
          <MenuDiv>
          </MenuDiv>
          <ResourceInfo>
            {content && <Content>{selectComponent[content]}</Content>}
          </ResourceInfo> 
      </ResourceContainer>
    </React.Fragment>
  );
}
