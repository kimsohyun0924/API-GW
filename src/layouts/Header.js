import React from 'react';
import styled from "styled-components";
import Logo from '../image/kt_cloud_03.png';
import { useMenuState, useMenuDispatch } from '../hooks/MenuContext';
import theme from '../style/theme';
import * as FaIcons from 'react-icons/fa';

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


  return (
    <React.Fragment>
      <MainHeader>
        <HeaderLeft>
          <img src={Logo} width="100" alt="kt cloud logo" />
        </HeaderLeft>
      </MainHeader>

    </React.Fragment>   
  )
}

