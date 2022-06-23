import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

/* 메뉴바에 나타날 리스트에 대한 관리 */

const SidebarLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0 1rem 0 1rem;
  margin: 0;
  text-decoration: none;
  border-radius: 4px;
  height: 36px;
  margin-bottom: 0.1rem;
  color: #333336;
  font-size: 14px;

  &:hover {
    background: var(--sidebar-focus-bgcolor);
    cursor: pointer;
  }

  ${props => props.firstmenu === props.focus && !props.subnav &&
    css`
      background: var(--sidebar-focus-bgcolor);
    `}
`;

const SidebarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0 1rem 0 1rem;
  margin: 0;
  text-decoration: none;
  border-radius: 4px;
  height: 36px;
  margin-bottom: 0.1rem;
  color: #333336;
  font-size: 14px;

  &:hover {
    background: var(--sidebar-focus-bgcolor);
    cursor: pointer;
  }

  ${props => props.firstmenu === props.focus && !props.subnav &&
    css`
      background: var(--sidebar-focus-bgcolor);
    `}
`;


const FirstMenuDiv = styled.div`  
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

const FirstMenu = styled.div`
  padding-left: 0.5rem;
`;

const SidebarLabel = styled.span`  
  margin-left: 0.5rem; 
`;

const UL = styled.ul`
  transition: 0.2s;
  height: 0px;
  
  ${props => props.isopen === 1 && props.subnavlength && 
    css`
      transition: 0s;
      height: ${props.subnavlength.length * 36}px;
    `
  }

`;

const LI = styled.li`
  transition: all 0s;
  display: none;

  ${props => props.isopen &&
    css`
      display: block;
      color: var(--sidebar-focus-color);
    `}
`;

const SidebarSubLabel = styled.span`
  margin-left: 1.7rem;
`;

const DropdownLink = styled(Link)`
  list-style: none;
  padding: 0 1rem 0 1rem;
  margin: 0;
  text-decoration: none;
  border-radius: 4px;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
  height: 36px;
  color: #333336;
  font-size: 14px;

  &:hover {
    background: var(--sidebar-focus-bgcolor);
    cursor: pointer;
  }

  ${props => props.secondmenu === props.secondfocus[1] && props.firstmenu === props.secondfocus[0] && 
    css`
      background: var(--sidebar-focus-bgcolor);
      color: var(--sidebar-focus-color);
    `}   
 
`;

const IconSub = styled.div`
`;

export default function SideMenu({menuData, menuOpen}) {

  const arr = Array.from({length: menuData.length}, () => 0);
  const [menuShow, setMenuShow] = useState(arr);

  const [firstFocus, setFirstFocus] = useState(100);
  const [secondFocus, setSecondFocus] = useState([100, 100]);

  const showFirst = (subNav, firstMenuNumber) => {

    let newarr = arr;
    setFirstFocus(firstMenuNumber); 

    if(subNav) {
      if(menuShow[firstMenuNumber] === 1) newarr[firstMenuNumber] = 0;
      else newarr[firstMenuNumber] = 1;
    } else {
      newarr[firstMenuNumber] = 0;
      setSecondFocus([100,100]);         
    }

    setMenuShow(newarr);    
  }

  const showSecond = (secondNav, firstMenuNumber, secondMenuNumber) => {
    setFirstFocus(firstMenuNumber);
    setSecondFocus([firstMenuNumber, secondMenuNumber]);
  }

  return (
    <React.Fragment>

        {menuData.map((item, index) => {
          
          return (
            <React.Fragment key={index}>

              { !item.path && 
              <SidebarDiv key={index} subnav={item.subNav} firstmenu={index} focus={firstFocus} onClick={() => { showFirst(item.subNav, index); } }>
                <FirstMenuDiv>
                  {item.icon}
                  <FirstMenu>
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </FirstMenu>
                </FirstMenuDiv> 
                <IconSub>
                  { item.subNav && menuShow[index] === 1 
                    ? item.iconOpened
                    : item.subNav ? item.iconClosed : null }
                </IconSub>  
              </SidebarDiv> 
              }

             { item.path && 
              <SidebarLink key={index} subnav={item.subNav} firstmenu={index} focus={firstFocus} to={item.path} onClick={() => { showFirst(item.subNav, index); } }>
                <FirstMenuDiv>
                  {item.icon}
                  <FirstMenu>
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </FirstMenu>
                </FirstMenuDiv>         
              </SidebarLink> 
              }

              <UL isopen={menuShow[index]} subnavlength={item.subNav} >
              { item.subNav && 
                item.subNav.map((subItem, sindex) => {
                  return (
                    <React.Fragment key={sindex}>
                      <LI isopen={menuShow[index]} secondmenu={sindex} focus={firstFocus} key={sindex} >
                        { ! JSON.stringify(subItem.path).includes('http') &&
                          <DropdownLink to={subItem.path} key={sindex} subnav={menuShow} firstmenu={index} secondmenu={sindex} focus={firstFocus} secondfocus={secondFocus} onClick={() => { showSecond(subItem, index, sindex); }} >
                            {subItem.icon}
                            <SidebarSubLabel>{subItem.title}</SidebarSubLabel>
                          </DropdownLink> 
                        }
                        { JSON.stringify(subItem.path).includes('http') &&
                          <DropdownLink to={subItem.path} key={sindex} subnav={menuShow} firstmenu={index} secondmenu={sindex} focus={firstFocus} secondfocus={secondFocus} >
                            {subItem.icon}
                            <SidebarSubLabel>* {subItem.title}</SidebarSubLabel>
                          </DropdownLink> 
                        }

                      </LI>                      
                    </React.Fragment>
                  );                 
                })
              }

              </UL>

            </React.Fragment>    
          );
        })}

    </React.Fragment>
  )
}
