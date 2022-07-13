import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import ToggleSwitch from '../components/ToggleSwitch';
import Button from '../components/Button';
import axios from 'axios';

const AllDiv = styled.div`
    /* min-height: 100%;
    width: 990px; */
    width:100%;
    height: 100%;
    /* padding: 10px 0px 0px 0px; */
`;

const ItemDiv = styled.div`
    display: block;
    color: #555555;
    padding: 20px 0px 0px 0px;
`;

const Item = styled.div`
    display: flex;
`;

const ItemName = styled.div`
    width: 17%;
    height: 30px;
    line-height: 15px;
    font-size: 14px;
    margin-right: 50px;
    padding: 6px 12px 6px 0px;
    /* min-width: 18px; */
    /* margin-right: 50px; */
`;

const ItemInput = styled.div`
    display: flex;
    width: 78%;
    height: 30px;
    /* min-width: 220px; */
    /* align-items: center; */
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    border: solid 1px #b6b6c3;
    background: #ffffff;
    box-sizing: border-box;
    font-size: 15px;
    color: #333333;
`;

const DropdownContainer = styled.div`
    width: 78%;
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
    width: 51.5%;
    z-index: 10;
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
    margin: 20px 60px 0px 60px;
  /* align-items: center; */
`;

export default function MethodUpdate(props) {


  console.log(props);

  const { resourceId, methodCommandValue, isOpen, setIsOpen}= props;
  const [selectedItem, setSelectedItem] = useState();
  const [selectedItem2, setSelectedItem2] = useState(methodCommandValue);
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const [dataTemp, setDataTemp] = useState(null);
  const [inputs, setInputs] = useState({
    url_path: ''
  });
  const wrapperRef = useRef(null);
  const wrapperRef2 = useRef(null);

  const methodoptionsCommand = [
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

  const endpointoptionsCommand = [
    {
      "name": "HTTP",
      "value": "HTTP"
    },
    {
      "name": "MOCK",
      "value": "MOCK"
    },
    {
      "name": "kt cloud",
      "value": "kt cloud"
    },
  ];

  const { url_path } = inputs;


  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // console.log(inputs);
  // console.log(selectedItem);
  // console.log(selectedItem2);
  // console.log(resourceId);


  const getMethod = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/method/'+resourceId
      );
      setDataTemp(response.data); // 데이터는 response.data)
      setSelectedItem(response.data.integration_type);
      setInputs({
        url_path : '   '+response.data.url_path });
    } catch (e) {
      setError(e);
    }
  };
  
  useEffect(() => {
    getMethod();
  }, []);

  const onCreate = () => {
    const Api = {
      selectedItem,
      selectedItem2,
      url_path
    };
  
    const createMethod = async () => {
      try {
        
        setError(null);
       
        await axios.post(
          '/v1.0/g1/paas/Memsq07/apigw/method',
          {
            resource_id: resourceId,
            integration_type: selectedItem,
            type: selectedItem2
          }
        );
      } catch (e) {
        setError(e);
      }
    
    };
    createMethod();
    window.location.reload(true);

    //   setTimeout(()=>{
    //   navigate('/dashboard');     
    // }, 1000);
  };

  const onCancel = () => {
    console.log("취소");
    // setIsOpen(false);
    // setMethodCommandValue("");
  };

  const onActiveToggle = useCallback(() => {
    // console.log(isActive)
    setIsActive((prev) => !prev);
  }, []);

  const onActiveToggle2 = useCallback(() => {
    // console.log(isActive2)
    setIsActive2((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e, itemName) => {

    // console.log(props);
    setSelectedItem(itemName);
    // props.setItem(itemName);
    // props.setMethodCommandValue(itemName);
    setIsActive((prev) => !prev);

  }, []);

  const onSelectItem2 = useCallback((e, itemName) => {

    // console.log(props);
    setSelectedItem2(itemName);
    // props.setItem(itemName);
    // props.setMethodCommandValue(itemName);
    setIsActive2((prev) => !prev);

  }, []);


  const clickedToggle = () => {
    setToggle((prev) => !prev);
    console.log(toggle);
  };


  return (
    <React.Fragment>
      <AllDiv>
        {/* <ItemDiv>
          <Item>
            <ItemName>설명</ItemName>
            <ItemInput>
              <InputForm name="explain" onChange={onChange} value={explain}/>
            </ItemInput>
          </Item>
        </ItemDiv> */}
        <ItemDiv>
          <Item>
            <ItemName>엔드포인트 유형</ItemName>

            <DropdownContainer>
              <DropdownBody onClick={onActiveToggle}>

                { selectedItem ? 
                  <ItemName>{selectedItem}</ItemName>     
                  : <DropdownSelect>엔드포인트 유형</DropdownSelect> }
              
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
                {endpointoptionsCommand.map((item, index) => (
                  <DropdownItemContainer id="item" key={index} onClick={(e) => { onSelectItem(e, item.name); }}>
                    <DropdownItemName id="item_name" itemName={item.name} selectedItem={selectedItem}>{item.name}</DropdownItemName>
                  </DropdownItemContainer>
                ))}
              </DropdownMenu>
            </DropdownContainer>

            {/* <ItemInput>
              <InputForm name="endpoint" onChange={onChange} value={endpoint}/>
            </ItemInput> */}
          </Item>
        </ItemDiv>
        <ItemDiv> 
          <Item>
            <ItemName>Method 종류</ItemName>
            <DropdownContainer>
              <DropdownBody onClick={onActiveToggle2}>
          
                <ItemName>{selectedItem2}</ItemName>     
              
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
              <DropdownMenu isActive={isActive2} ref={wrapperRef2}>
                {methodoptionsCommand.map((item, index) => (
                  <DropdownItemContainer id="item" key={index} onClick={(e) => { onSelectItem2(e, item.name); }}>
                    <DropdownItemName id="item_name" itemName={item.name} selectedItem={selectedItem2}>{item.name}</DropdownItemName>
                  </DropdownItemContainer>
                ))}
              </DropdownMenu>
            </DropdownContainer>
            </Item>
          </ItemDiv>
          <ItemDiv> 
            <Item>
              <ItemName>URL 경로</ItemName>
              <ItemInput>
                <InputForm name="url_path" onChange={onChange} value={url_path}/>
              </ItemInput>
          </Item>
        </ItemDiv> 
        <ItemDiv>
          <Item>
              <ItemName>API Key 유형</ItemName>
              <ToggleSwitch clickedToggle={clickedToggle} toggle={toggle}/>
          </Item>
        </ItemDiv>
        <ButtonDiv>
          <ThemeProvider theme={{ palette: { blue: '#141e49', gray: '#495057', pink: '#f06595' }}}>
            <Button size="small" onClick={onCancel} noline>취소</Button>
            <Button size="medium" onClick={onCreate} >저장</Button>
          </ThemeProvider>
        </ButtonDiv>
      </AllDiv>
    </React.Fragment>
  );
}
