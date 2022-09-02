import React, { useEffect, useRef } from 'react';
import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

const DropdownContainer = styled.div`
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

  &:hover {
    cursor: pointer;
  }
`;

const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  border-radius: 2px;
  color: #495057;
  border: 1px solid #ced4da;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
  background-color: #ffffff;
  height: 33px;
  font-size: 14px;
`;

const DropdownSelect = styled.p`
  

`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  /* width: 105px; */
  background-color: white;
  position: absolute;
  border: 1px solid #d2d2d2;
  margin-top: 0.2rem;
  overflow-y: auto;
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
`;

const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  border-top: none;
  border-radius: 2px;

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: royalblue;
    background: #e6effc;
  }
`;

const ItemName = styled.span`
`;

const DropdownItemName = styled.span`
  font-size: 14px;
  ${props => props.itemName === props.selectedItem && 
    css`
      color: royalblue;
      &:before {
        content: "\u2713";
        padding-right: 0.3rem;
      }
    `
  }
`;

const IconSVG = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 16px;
  height: 16px;
`

const DropdownDBServer = (props) => {

  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const wrapperRef = useRef(null);


  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e, item) => {

    // console.log(props);
    setSelectedItem(item.name);
    props.setItem(item.name);
    props.setMethodCommandValue(item.name);
    if(item.usage_plan_id) {
      props.setSelectItem(item.usage_plan_id);
    }
    if(item.stage_id) {
      props.setSelectItem2(item.stage_id);
    }
    if(item.service_id) {
      props.setSelectItem(item.service_id);
    }

    setIsActive((prev) => !prev);
  }, []);


  // const handleClickOutside = (event) => {
  //   if (!wrapperRef.current.contains(event.target)) {
  //     setIsActive(false);
  //   }
  // }

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);

  //   return()=>{
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   }

  // }, []);

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
        <IconSVG
        /* 화살표 아이콘 삽입*/
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 14L16 6H4L10 14Z"
          fill="#888888"
        />
        </IconSVG>
      </DropdownBody>
      
      <DropdownMenu isActive={isActive} ref={wrapperRef} size={props.size}>
        {props.dropdownItems && props.dropdownItems.map((item, index) => (
          <DropdownItemContainer id="item" key={index} onClick={(e) => { onSelectItem(e, item); }}>
            <DropdownItemName id="item_name" itemName={item.name} selectedItem={selectedItem}>{item.name}</DropdownItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default DropdownDBServer;