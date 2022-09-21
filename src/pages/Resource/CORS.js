import React from 'react';
import styled from 'styled-components';


const AllDiv = styled.div`
    display: block;
    width:100%;
    height: 100%;
`;

const ItemDiv = styled.div`
    display: block;
`;

const Item = styled.div`
    display: flex;
    padding: 10px 0px 10px 0px;  
    /* align-items: center;  */
`;

const ItemName = styled.div`
    min-width: 230px;
    height: 30px;
    color: #333336;
    font-size: 12px;
    font-family: Lato Regular;
    padding: 8px 0px 0px 0px;
`;

const ItemInput = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    font-size: 14px;
`;

const InputForm = styled.input`
    width: 100%;
    height: 30px;
    color: #333333;
    font-size: 14px;
    font-family: Lato Regular;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    padding: 3px 5px 3px 5px;
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
            </AllDiv>
        </React.Fragment>
    );
}