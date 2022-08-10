import React from 'react';
import styled from "styled-components";
import Logo from 'image/kt_cloud_03.png';
import { useMenuState, useMenuDispatch } from 'hooks/MenuContext';
import theme from 'style/theme';
import * as FaIcons from 'react-icons/fa';
import { ReactComponent as GNB_Logo } from 'image/GNB_Logo.svg';

import { ReactComponent as GNB_Account } from 'image/GNB_account.svg';
import { ReactComponent as GNB_Price } from 'image/GNB_price.svg';
import { ReactComponent as GNB_Language } from 'image/GNB_language.svg';
import { ReactComponent as GNB_Noti } from 'image/GNB_Noti.svg';

const MainHeader = styled.div`
  position: fixed;
  top: 0;
  height: ${theme.topbarSize};
  width: 100%;
  z-index: 20;
  background: #141e49;
  // border-bottom: 0px solid #dee2e6;
  transition: all 0.3s ease;
  padding: 0 1rem 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: #efefef;
  padding-left: 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  color: #efefef;
  margin-right: 1rem;
`;

const ULIcon = styled.ul`
  font-size: 1rem;
  margin-left: 1rem;
  padding-top: 0.5rem;
`;

const LIIcon = styled.li`
  display: inline;
  padding: 0.3rem;

  &:hover {
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }
`;

export default function Header({setLogin}) {

  const menuState = useMenuState();
  const menuDispatch = useMenuDispatch();

  const MenuToggle = () => {
    //console.log("menu state log", menuState.menuOpen);

    menuDispatch({
      type:'UPDATE',
      data: {
        ...menuState, 
        menuOpen : !menuState.menuOpen,
      }
    });
  }

  const onClick = () => {

    if(window.confirm("정말 로그아웃 하시겠습니까?")) {
      setLogin(false);
    }

  }

  return (
    <React.Fragment>

      <MainHeader>
        <HeaderLeft>
          {/* <img src={Logo} width="100" alt="kt cloud logo" /> */}
          <GNB_Logo /> 
        </HeaderLeft>

        <HeaderRight>
          <ULIcon>
            <LIIcon><GNB_Noti /></LIIcon>
            <LIIcon><GNB_Price /></LIIcon>
            <LIIcon><GNB_Language /></LIIcon>
            <LIIcon><GNB_Account /></LIIcon>
          </ULIcon>
        </HeaderRight>
      </MainHeader>

    </React.Fragment>   
  )
}

