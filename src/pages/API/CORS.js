import React from 'react';
import styled from 'styled-components';


const AllDiv = styled.div`
    display: block;
    width:100%;
    height: 100%;
`;

const ItemDiv = styled.div`
    display: block;
    color: #555555;
`;

const Item = styled.div`
    display: flex;
`;

const ItemName = styled.div`
    min-width: 250px;
    height: 45px;
    font-size: 12px;
    line-height: 15px;
    padding: 5px 0px 5px 0px;
`;

const ItemInput = styled.div`
    display: flex;
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 10px 0px 5px 0px;
`;

const InputForm = styled.input`
     width: 100%;
    height: 30px;
    font-size: 14px;
    border: solid 1px #b6b6c3;
    box-sizing: border-box;
    color: #333336;
    padding: 6px 10px 4px 9px;
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