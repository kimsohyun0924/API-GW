import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styled, { css } from "styled-components";

import MethodUpdate from '../pages/Method/MethodUpdate';
import ModalAPIDelete from './ModalAPIDelete';


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
    },
    ANY: {
        backgroundColor: 'orange'
    },
    HEAD: {
        backgroundColor: 'gray'
    },
    OPTIONS: {
        backgroundColor: 'darkgray'
    },
    PATCH: {
        backgroundColor: 'gray'
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
    width: 70px;
    padding-left: 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
`;

const ButtonDiv = styled.div`
    display: flex;
    height: 100%;
    margin-left: 170px;
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


    // console.log(props.methodInfo);

    const methodInfo = props.methodInfo;
    const methodId = methodInfo.method_id;
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

    const onDelete = () => {
        //delete method request
        
        const deleteMethod = async () => {
        try {
          setError(null);
          await axios.delete(
            '/v1.0/g1/paas/apigw/method/'+methodId,
            {
                headers: { 'user-id' : 'ksh@gmail.com' }
            }
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
                <MethodValueDiv methodtype={methodInfo.method_type}>
                    <MethodValue>{methodInfo.method_type}</MethodValue>
                    <ButtonDiv>
                        { methodInfo.custom_backend_url_using === true ?
                            <Button value={methodInfo.method_id+'!'+methodInfo.method_type+'!'+methodInfo.custom_backend_url} onClick={props.onClick}>보기</Button>
                            : <Button value={methodInfo.method_id+'!'+methodInfo.method_type+'!'+methodInfo.backend_url} onClick={props.onClick}>보기</Button>
                        }
                    </ButtonDiv>
                </MethodValueDiv>
                <MethodInfoDiv>
                    <MethodInfoType>
                        <MethodInfoName>엔드포인트</MethodInfoName>
                        <MethodInfoValue>
                            { methodInfo.url_path.length < 20 ? 
                                methodInfo.method_type+'  '+methodInfo.url_path
                                : methodInfo.method_type+'  '+methodInfo.url_path.slice(0, 18) + '...'
                            }
                        </MethodInfoValue >
                    </MethodInfoType>
                    <MethodInfoType>
                        <MethodInfoName>API Key 필요</MethodInfoName>
                            {
                                methodInfo.api_key_using? <MethodInfoValue>예</MethodInfoValue> 
                                : <MethodInfoValue>아니요</MethodInfoValue>
                            }
                    </MethodInfoType>
                </MethodInfoDiv>
            </MethodDiv> 
            <ModalAPIDelete
                // title="메서드 삭제"
                confirmText="삭제"
                cancelText="취소"
                onConfirm={onDelete}
                onCancel={onCancel}
                visible={dialog}
                >
                {methodInfo.method_type} 메서드를 삭제하시겠습니까?
            </ModalAPIDelete>     
        </React.Fragment> 
    );
}