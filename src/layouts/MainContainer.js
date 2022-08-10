import React from 'react';
import { useMenuState } from '../hooks/MenuContext';
import styled, { css } from 'styled-components';
import theme from '../style/theme';

const MainWrapper = styled.div`
  margin-top: ${theme.topbarSize};
  margin-left: ${theme.sidebarSize};
  min-height: calc(100vh - ${theme.topbarSize});
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: var(--main-bs-white);
  padding: 0px 60px 0px 60px;
  transition: all 0.3s ease;

  ${props => !props.menuOpen && 
    css`
      margin-left: ${theme.sidebarSmallSize};
      margin-left: 0px;
    `
  }
`;

export default function MainContainer({children}) {

  const menuState = useMenuState();

  return (
    <React.Fragment>
      <MainWrapper menuOpen={menuState.menuOpen}>
      {children}  
      </MainWrapper>
    </React.Fragment>
  )
}
