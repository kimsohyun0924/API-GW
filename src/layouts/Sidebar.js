import React  from 'react';
import styled, { css } from "styled-components";
import theme from 'style/theme';
import { SidebarData } from 'data/SidebarData';
import SideMenu from './SideMenu';
import { useMenuState } from 'hooks/MenuContext';

import { ReactComponent as LNBSetting } from 'image/LNB_Setting.svg';
import { ReactComponent as LNBAddService } from 'image/LNB_AddService.svg';

const SidebarWrap = styled.div`
  position: fixed;
  top: ${theme.topbarSize};
  left: 0;
  height: 100%;
  width: ${theme.sidebarSize};
  z-index: 10;
  justify-content: center;
  transition: all 0s ease;
  background: #f4f4f4;
  // border-right: 1px solid rgb(204, 204, 204);

  ${props => !props.menuOpen &&
    css`
      width: ${theme.sidebarSmallSize};
    `} 
`;

const SidebarContainer = styled.div`
  color: ${theme.primaryDark};
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ItemDiv = styled.div`
  height: 40px;
  color: #333336;
  font-size: 14px;

  &:hover {
    cursor: pointer;
  }
`;

const FirstMenuDiv = styled.div`  
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  margin-left: 1rem;
  line-height: 40px;
`;

const Line = styled.div`
  border-bottom: solid 1px #666666;
`

const SecondMenuDiv = styled.div`  
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  line-height: 40px;
`;

const FirstMenu = styled.div`
  padding-left: 0.5rem;
`;

const SidebarLabel = styled.span`  
  margin-left: 0.5rem; 
`;

const ZoneInfo = styled.div`
  color: #03428e;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  left: 100px;
`;

export default function Sidebar() {

  const menuState = useMenuState();

  return ( 
    <React.Fragment>

      <SidebarWrap menuOpen={menuState.menuOpen}>
        <SidebarContainer> 
          <ItemDiv>
            <FirstMenuDiv>
              <LNBSetting />
              <FirstMenu>
                <SidebarLabel>Platform</SidebarLabel>
              </FirstMenu>
              <ZoneInfo>@ {menuState.platformId.toUpperCase()}</ZoneInfo>
            </FirstMenuDiv> 
          </ItemDiv>
          <Line />
          <ItemDiv>
            <FirstMenuDiv>
              <LNBAddService />
              <FirstMenu>
                <SidebarLabel>All Services</SidebarLabel>
              </FirstMenu>
            </FirstMenuDiv> 
          </ItemDiv>
          <Line />
          {/* <ItemDiv>
            <FirstMenuDiv>
              <LNBDashboard />
              <FirstMenu>
                <SidebarLabel>Dashboard</SidebarLabel>
              </FirstMenu>
            </FirstMenuDiv> 
          </ItemDiv> */}
          <SideMenu menuData={SidebarData} menuOpen={menuState.menuOpen} />
        </SidebarContainer>
      </SidebarWrap>

    </React.Fragment>
  );
}
