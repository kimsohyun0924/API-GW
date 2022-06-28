import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';


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
    font-size: 14px;
    color: #333333;
`;

const onChange = e => {

};

export default function Cros() {
    return (
        <React.Fragment>
            <AllDiv>
                <ItemDiv>
                    <Item>
                        <ItemName>Access-Control-Allow-Method</ItemName>
                            <ItemInput>
                                <InputForm name="resource" onChange={onChange} />
                            </ItemInput>
                    </Item>
                </ItemDiv>
                <ItemDiv>
                    <Item>
                        <ItemName>Access-Control-Allow-Headers</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                    </Item>
                </ItemDiv>
                <ItemDiv>   
                    <Item>
                        <ItemName>Access-Control-Allow-Origin</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                    </Item>
                </ItemDiv>
                <ItemDiv> 
                    <Item>
                        <ItemName>Access-Control-Expose-Headers</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                    </Item>
                </ItemDiv>
                <ItemDiv>  
                    <Item>
                        <ItemName>Access-Control-Max-Age</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                    </Item>
                </ItemDiv> 
                <ItemDiv> 
                    <Item>
                        <ItemName>Access-Control-Allow-Credentials</ItemName>
                        <ItemInput>
                            <InputForm name="resource" onChange={onChange} />
                        </ItemInput>
                    </Item>
                </ItemDiv>
            </AllDiv>
        </React.Fragment>
    );
}