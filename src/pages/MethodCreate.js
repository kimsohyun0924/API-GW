import React from 'react';
import styled from 'styled-components';

const TreeNode = styled.div`
  position: relative;
  /* background: pink; */
  width: 100%;
  height: 33px;
  font-size: 20px;
  border-bottom-color: #e2e2e2;
  border-bottom-width: 1px;
`;

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
  width: 100px;
  /* min-width: 18px; */
  margin-right: 100px;
  height: 32px;
  line-height: 32px;
`;

const ItemInput = styled.div`
    width: 850px;
    min-width: 220px;
    height: 32px;
    display: flex;
    align-items: center;
    
`;

const InputForm = styled.input`
  width: 850px;
  height: 32px;
  border: solid 1px #b6b6c3;
  background: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  color: #333333;
`;

const onChange = e => {

};

export default function MethodCreate() {

    return (
        <React.Fragment>
            <ItemDiv>
            <Item>
              <ItemName>설명</ItemName>
              <ItemInput>
                <InputForm name="explain" onChange={onChange} />
              </ItemInput>
            </Item>
            <Item>
              <ItemName>엔드포인트</ItemName>
              <ItemInput>
                <InputForm name="endpoint" onChange={onChange} />
              </ItemInput>
            </Item>
            <Item>
              <ItemName>메서드</ItemName>
              <ItemInput>
                <InputForm name="method" onChange={onChange} />
              </ItemInput>
            </Item>
            <Item>
              <ItemName>URL 경로</ItemName>
              <ItemInput>
                <InputForm name="URL" onChange={onChange} />
              </ItemInput>
            </Item>
          </ItemDiv>
        </React.Fragment>

    );
}