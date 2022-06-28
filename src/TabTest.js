import { style } from '@mui/system';
import React from 'react';
import styled, { css } from 'styled-components';

const TestDiv = styled.div`
  background:pink;
  width: 500px;
  height: 500px;
`;


export default function App() {
  return (
    <React.Fragment>
        <TestDiv style={{background:'pink'}}>
            안녕
        </TestDiv>      
    </React.Fragment> 
  );
}