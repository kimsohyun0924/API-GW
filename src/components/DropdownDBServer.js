import React, { useEffect, useRef } from 'react';
import { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

const DropdownContainer = styled.div`
  width: 120px;
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
  height: 36px;
`;

const DropdownSelect = styled.p`

`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 120px;
  background-color: white;
  position: absolute;
  border: 1px solid #d2d2d2;
  margin-top: 0.2rem;
  overflow-y: auto;
  padding: 0 0;
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
  font-size: 15px;
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
  /* useState 같은 경우 상태가 변할 때마다 컴포넌트가 리렌더링됨.*/
  /* select-box의 클릭 상태를 관리함 */
  const [isActive, setIsActive] = useState(false);
  /* select-box가 펼쳐지고 선택되는 아이템 상태를 관리함 */
  const [selectedItem, setSelectedItem] = useState(null);

  /* useRef로 관리하는 변수는 값이 바뀌어도 페이지(컴포넌트)가 리렌더링이 되지 않음*/
  /* useRef를 사용하면 페이지가 리렌더링되어도 변수 값이 기억됨(초기화 되지 않음)
  그냥 let으로 변수를 선언할 경우 페이지가 리렌더링될 때마다 변수가 초기화 됨*/
  /* click(클릭이 끝나는 순간 이벤트가 동작, 클릭을 떼면 이벤트 동작하지 않음)과 다르게 element가 클릭되는 순간 이벤트 동작(클릭을 떼는 경우에도 유지)*/
  const wrapperRef = useRef(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e, itemName) => {

    console.log(props);

   

    setSelectedItem(itemName);
    props.setItem(itemName);
    props.setServerCommandValue(itemName);

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

  useEffect(() => {
    setSelectedItem("");
  }, [props.serverCommand]);

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
      
        { selectedItem ? 
          <ItemName>{selectedItem}</ItemName>     
          : <DropdownSelect>메서드 생성</DropdownSelect>
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
      
      <DropdownMenu isActive={isActive} ref={wrapperRef}>
        {props.dropdownItems.map((item, index) => (
          <DropdownItemContainer id="item" key={index} onClick={(e) => { onSelectItem(e, item.name); }}>
            <DropdownItemName id="item_name" itemName={item.name} selectedItem={selectedItem}>{item.name}</DropdownItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default DropdownDBServer;