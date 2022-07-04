import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from "styled-components";
import ModalApiDelete from './ModalApiDelete';

const MethodDiv = styled.div`
    width: 320px;
    height: 180px;
    border: 1px solid  #e2e2e2;
    border-radius: 2px;
    /* margin: 20px 0px 0px 20px; */
`;

const methodcolor = {
    GET: {
        backgroundColor: 'royalblue'
    },
    POST: {
        backgroundColor: 'green'
    },
    PUT: {
        backgroundColor: 'brown'
    },
    DELETE: {
        backgroundColor: 'red'
      }
  };

  const methodStyles = css`
  ${({ methodtype }) => css`
    background-color: ${methodcolor[methodtype].backgroundColor};
  `}
`;

const MethodValueDiv = styled.div`
    display: flex;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid  #e2e2e2;
    align-items: center;
    /* background-color: #6482B9; */
    ${methodStyles}
`;

const MethodValue = styled.div`
    padding-left: 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

const ButtonDiv = styled.div`
    display: flex;
    height: 100%;
    margin-left: 130px;
    align-items: center;
`;

const Button = styled.button`
    width: 49px;
    height: 25px;
    border: 1px solid #e2e2e2;
    margin-left: 13px;
    font-size: 14px;
    border-radius: 2px;
    background: white;
    cursor: pointer;
    &:hover {
            background: #f4f4f4;
          }
`;

const MethodInfoDiv = styled.div`
    display: inline-block;
    width: 320px;
    height: 100%;
    padding: 15px 10px 10px 15px;
`;

const MethodInfoType = styled.div`
    display: flex;
    padding: 0px 10px 15px 0px;
    font-size: 15px;
`;

const MethodInfoName = styled.div`
    padding: 0px 10px 15px 0px;
    width: 100px;
    font-size: 15px;
`;

const MethodInfoValue = styled.div`
    padding: 0px 0px 15px 0px;
    width: 180px;
    font-size: 14px;
`;


export default function MethodComp(props) {

    const methodInfo = props.methodInfo;
    // const methodId = methodInfo.methodId;
    const [apikey, setApikey] = useState(null);
    const [dialog, setDialog] = useState(false);
    const [error, setError] = useState(null);
    const [content, setContent] = useState(null);


    const Delete = () => {
        setDialog(true);
    };

    const onCancel = () => {;
        setDialog(false);
    };

    const onClick = () => {

    }

    const onDelete = () => {
        //delete method request
        
        const deleteMethod = async () => {
        try {
          setError(null);
          await axios.delete(
            '/v1.0/g1/paas/Memsq07/apigw/method/'
          );
        } catch (e) {
          setError(e);
          console.log(error);
        }
      };
      deleteMethod();
      window.location.reload(true);
      setDialog(false);
    }

    return (
        <React.Fragment>
            <MethodDiv>
                <MethodValueDiv methodtype={methodInfo.methodName}>
                    <MethodValue>{methodInfo.methodName}</MethodValue>
                    <ButtonDiv>
                        <Button onClick={onClick}>보기</Button>
                        <Button onClick={Delete}>삭제</Button>
                    </ButtonDiv>
                </MethodValueDiv>
                <MethodInfoDiv>
                    <MethodInfoType>
                        <MethodInfoName>엔드포인트</MethodInfoName>
                        <MethodInfoValue>{methodInfo.methodName} {methodInfo.httpEndPoint.url}</MethodInfoValue >
                    </MethodInfoType>
                    <MethodInfoType>
                        <MethodInfoName>API Key 필요</MethodInfoName>
                            {
                                methodInfo.requiredApiKey.required? <MethodInfoValue>예</MethodInfoValue> 
                                : <MethodInfoValue>아니요</MethodInfoValue>
                            }
                    </MethodInfoType>
                </MethodInfoDiv>
            </MethodDiv> 
            <ModalApiDelete
                // title="정말로 삭제하시겠습니까?"
                confirmText="삭제"
                cancelText="취소"
                onConfirm={onDelete}
                onCancel={onCancel}
                visible={dialog}
                >
                정말로 삭제하시겠습니까?
            </ModalApiDelete>     
        </React.Fragment> 
    );
}