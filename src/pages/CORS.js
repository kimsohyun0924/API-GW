import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

const ItemDiv = styled.div`
  display: block;
  color: #555555;
  padding: 10px 10px 10px 10px;
`;

const Item = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`;

const ItemName = styled.div`
  width: 200px;
  /* min-width: 18px; */
  margin-right: 50px;
  height: 32px;
  line-height: 32px;
  font-size: 13px;
`;

const ItemInput = styled.div`
    width: 600px;
    min-width: 220px;
    height: 32px;
    display: flex;
    align-items: center;    
`;

const InputForm = styled.input`
  width: 590px;
  height: 30px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;

const onChange = e => {

};

export default function Cros() {
    return (
        <React.Fragment>
            <ItemDiv>
                <Item>
                    <ItemName>Access-Control-Allow-Method</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                </Item>
                <Item>
                    <ItemName>Access-Control-Allow-Headers</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                </Item>
                <Item>
                    <ItemName>Access-Control-Allow-Origin</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                </Item>
                <Item>
                    <ItemName>Access-Control-Expose-Headers</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                </Item>
                <Item>
                    <ItemName>Access-Control-Max-Age</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                </Item>
                <Item>
                    <ItemName>Access-Control-Allow-Credentials</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                </Item>
            </ItemDiv>
        </React.Fragment>
    );
}