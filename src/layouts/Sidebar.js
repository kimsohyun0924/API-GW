import React  from 'react';
import styled, { css } from "styled-components";
import theme from '../style/theme';
import { SidebarData } from '../data/SidebarData';
import SideMenu from './SideMenu';
import { useMenuState } from '../hooks/MenuContext';

import { ReactComponent as LNBSetting } from '../image/LNB_Setting.svg';
import { ReactComponent as LNBAddService } from '../image/LNB_AddService.svg';
import { ReactComponent as LNBDashboard } from '../image/LNB_Dashboard.svg';

/* 메뉴바에 대한 관리 */

const SidebarWrap = styled.div`
  position: fixed;
  top: ${theme.topbarSize};
  left: 0;
  height: 100%;
  width: ${theme.sidebarSize};
  /* 레이아웃의 우선순위 결정 */
  z-index: 10;
  justify-content: center;
  /* 메뉴바가 접히고 펼쳐지는 속도 */ 
  transition: all 0s ease;
  background: #f4f4f4;
  /* 오른쪽에만 테두리를 두름 */

  /* 사이드바가 닫혔을 때 아이콘이 보일 수 있도록 최소한의 사이즈로 사이드바가 보이게 함*/
  ${props => !props.menuOpen &&
    css`
      width: ${theme.sidebarSmallSize};
    `} 
`;

const SidebarContainer = styled.div`
  color: ${theme.primaryDark};
  /* 아이템들 줄바꿈 상태로 정렬 */
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
`;

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

export default function Sidebar() {

  const menuState = useMenuState();

  return ( 
    <React.Fragment>
      <SidebarWrap menuOpen={menuState.menuOpen}>
        <SidebarContainer> 
          <ItemDiv>
            <FirstMenuDiv>
              <LNBSetting fill="blue" />
              <FirstMenu>
                <SidebarLabel>Platform</SidebarLabel>
              </FirstMenu>
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
          <SideMenu menuData={SidebarData} menuOpen={menuState.menuOpen} />
        </SidebarContainer>
      </SidebarWrap>
    </React.Fragment>
  );
}
