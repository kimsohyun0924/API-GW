import React, { useState, useRef, useCallback } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import ToggleSwitch from '../components/ToggleSwitch';
import Button from '../components/Button';

import axios from 'axios';



const ItemDiv = styled.div`
  display: block;
  color: #555555;
  padding: 10px 10px 10px 10px;
`;

const Item = styled.div`
  display: flex;
  padding: 0px 0px 15px 0px;
`;

const ItemName = styled.div`
  width: 100px;
  /* min-width: 18px; */
  margin-right: 100px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
`;

const ItemInput = styled.div`
  width: 750px;
  min-width: 220px;
  height: 30px;
  display: flex;
  align-items: center;
`;

const InputForm = styled.input`
  width: 750px;
  height: 30px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 14px;
  color: #333333;
`;

const DropdownContainer = styled.div`
  width: 750px;
  background: pink;
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
  border: 1px solid #b6b6c3;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
  background-color: #ffffff;
  height: 33px;
  font-size: 14px;
`;

const DropdownSelect = styled.p`

`;

const IconSVG = styled.svg`
  margin-left: -28px;
  align-self: center;
  width: 16px;
  height: 16px;
`;

const DropdownMenu = styled.ul`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 750px;
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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin: 5px 60px 5px 60px;
`;

export default function MethodComp(props) {

  const { isOpen, setIsOpen, methodCommandValue, setMethodCommandValue } = props;
  const [selectedItem, setSelectedItem] = useState(methodCommandValue);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);
  const [inputs, setInputs] = useState({
    endpoint: '',
    urlInfo:''
  });
  const wrapperRef = useRef(null);

  const optionsCommand = [
    {
      "name": "ANY",
      "value": "ANY"
    },
    {
      "name": "DELETE",
      "value": "DELETE"
    },
    {
      "name": "GET",
      "value": "GET"
    },
    {
      "name": "HEAD",
      "value": "HEAD"
    },
    {
      "name": "OPTIONS",
      "value": "OPTIONS"
    },
    {
      "name": "PATCH",
      "value": "PATCH"
    },
    {
      "name": "POST",
      "value": "POST"
    },
    {
      "name": "PUT",
      "value": "PUT"
    }
  ];

  const { endpoint, urlInfo } = inputs;


  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  console.log(inputs);


  const onCreate = () => {
    const Api = {
      endpoint,
      selectedItem,
      urlInfo
    };
  
    const createMethod = async () => {
      try {
        
        setError(null);
       
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/method',
          {
            resourceId: "string",
            integrationType: endpoint,
            type: selectedItem
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    createMethod();

    //   setTimeout(()=>{
    //   navigate('/dashboard');     
    // }, 1000);
  };

  const onCancel = () => {
    setIsOpen(false);
    setMethodCommandValue("");
  };

  const onActiveToggle = useCallback(() => {
    console.log(isActive)
    setIsActive((prev) => !prev);
  }, []);


  const onSelectItem = useCallback((e, itemName) => {

    // console.log(props);

    setSelectedItem(itemName);
    // props.setItem(itemName);
    // props.setMethodCommandValue(itemName);

    setIsActive((prev) => !prev);
  }, []);


  return (
    <React.Fragment>
      <ItemDiv>
        {/* <Item>
          <ItemName>설명</ItemName>
          <ItemInput>
            <InputForm name="explain" onChange={onChange} value={explain}/>
          </ItemInput>
        </Item> */}
        <Item>
          <ItemName>엔드포인트 유형</ItemName>
          <ItemInput>
            <InputForm name="endpoint" onChange={onChange} value={endpoint}/>
          </ItemInput>
        </Item>
        <Item>
          <ItemName>Method 종류</ItemName>
          <DropdownContainer>
            <DropdownBody onClick={onActiveToggle}>
        
              <ItemName>{selectedItem}</ItemName>     
            
              <IconSVG
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
              {optionsCommand.map((item, index) => (
                <DropdownItemContainer id="item" key={index} onClick={(e) => { onSelectItem(e, item.name); }}>
                  <DropdownItemName id="item_name" itemName={item.name} selectedItem={selectedItem}>{item.name}</DropdownItemName>
                </DropdownItemContainer>
              ))}
            </DropdownMenu>
          </DropdownContainer>
          </Item>
          <Item>
            <ItemName>URL 경로</ItemName>
            <ItemInput>
              <InputForm name="urlInfo" onChange={onChange} value={urlInfo}/>
            </ItemInput>
         </Item>
         <Item>
            <ItemName>API Key 유형</ItemName>
            <ToggleSwitch/>
         </Item>
      </ItemDiv>
      <ButtonDiv>
        <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
          <Button size="small" onClick={onCancel} noline>취소</Button>
          <Button size="medium" onClick={onCreate} >생성하기</Button>
        </ThemeProvider>
      </ButtonDiv>
    </React.Fragment>
  );
}
