import React, { useEffect, useRef } from 'react';
import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  /* width: 105px; */
  
  ${props =>
    props.size === "small" &&
      css`
      width: 105px;
  `}
  ${props =>
    props.size === "medium" &&
      css`
      width: 380px;
  `}
  ${props =>
    props.size === "large" &&
      css`
      width: 78%;
  `}

  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  /* border-radius: 2px; */
  color: #495057;
  border: 1px solid #b6b6c3;
  /* box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%); */
  background-color: #ffffff;
  height: 33px;
  font-size: 14px;
`;

const DropdownSelect = styled.p`
  

`;

const DropdownMenu = styled.ul`
  position: relative;
  display: ${(props) => (props.isActive ? `block` : `none`)};
  background-color: white;
  position: absolute;
  border-bottom: 1px solid #b6b6c3;
  border-left: 1px solid #b6b6c3;
  border-right: 1px solid #b6b6c3;
  /* border: 1px solid #d2d2d2; */
  /* margin-top: 0.2rem; */
  overflow-y: auto;
  z-index: 100;
  padding: 0 0;  

  ${props =>
    props.size === "small" &&
      css`
      width: 105px;
  `}
  ${props =>
    props.size === "medium" &&
      css`
      width: 380px;
  `}
  ${props =>
    props.size === "large" &&
      css`
      width: 100%;
  `}
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-top: none;
  /* border-radius: 2px; */

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background : rgba(0, 0, 0, 0.1);
    color: royalblue;
    /* background: #e6effc; */
  }

  ${props => props.itemName === props.selectedItem && 
    css`
       background : rgba(0, 0, 0, 0.1);
    `
  }
`;

const ItemName = styled.span`
`;

const DropdownItemName = styled.span`
  font-size: 14px;
  /* ${props => props.itemName === props.selectedItem && 
    css`
      color: royalblue;
      &:before {
        content: "\u2713";
        padding-right: 0.3rem;
      }
    `
  } */
`;

const Icon = styled.span`
  font-size: 16px;
  color: #888888;
`; 

const DropdownStage = (props) => {

  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const wrapperRef = useRef(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e, item) => {

    // console.log(props);
    setSelectedItem(item.name);
    props.setCommand(item.name);
    // props.setMethodCommandValue(item.name);
    if(item.stage_id) {
      props.setCommand(item.stage_id);
    }

    setIsActive((prev) => !prev);
  }, []);


  const handleClickOutside = (event) => {
    if (!wrapperRef.current.contains(event.target)) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  // useEffect(() => {
  //   setSelectedItem("");
  // }, [props.methodCommand]);
  
  return (
    <DropdownContainer size={props.size}>
      <DropdownBody onClick={onActiveToggle}>
      
        { selectedItem ? 
          <ItemName>{selectedItem}</ItemName>     
          : <DropdownSelect>{props.default}</DropdownSelect>
        }
        <Icon>&#9662;</Icon>
      </DropdownBody>
      
      <DropdownMenu isActive={isActive} ref={wrapperRef} size={props.size}>
        {props.dropdownItems && props.dropdownItems.map((item, index) => (
          <DropdownItemContainer id="item" key={index} onClick={(e) => { onSelectItem(e, item); }} itemName={item.name} selectedItem={selectedItem}>
            <DropdownItemName id="item_name" itemName={item.name} selectedItem={selectedItem}>{item.name}</DropdownItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default DropdownStage;