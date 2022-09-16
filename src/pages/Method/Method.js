import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import styled from 'styled-components';

import MethodCreate from './MethodCreate';
import MethodUpdate from './MethodUpdate';

import DropdownMethod from 'components/DropdownMethod';
import ResourceMethodComp from 'components/ResourceMethodComp';
import { ConnectingAirportsOutlined } from '@mui/icons-material';


const MethodDiv = styled.div`
  display: inline-block;
  padding: 15px 15px 0px 0px;
`;

export default function Method(props) {

  // console.log(props);
  const optionsinitial = [
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

    const serviceId = props.serviceId;
    const resourceId = props.resourceId;
    const [methods, setMethods] = useState([]); // 각 resource에 대한 method list 저장 
    const [optionsCommand, setOptionsCommand] = useState(optionsinitial);
    const [methodCommand, setMethodCommand] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [error, setError] = useState(null);
 
    const navigate = useNavigate();
    const [update, setUpdate] = useState(null);
    const [methodId, setMethodId] = useState(null);
    const [methodCommandValue, setMethodCommandValue] = useState(null);
    const testData = [
            {
              "created_at": "2022-07-09T23:53:31.316",
              "updated_at": "2022-07-09T23:53:31.389",
              "id": "62c9966bd7176c1f4f28f47f",
              "url_path": "/test1",
              "method_type": "GET",
              "doc_type": "METHOD",
              "integration_type": "HTTP",
              "route_definition": {
                  "created_at": "2022-07-09T23:53:31.316",
                  "updated_at": "2022-07-09T23:53:31.389",
                  "id": "62c9966bd7176c1f4f28f47e",
                  "predicates": [
                      {
                          "created_at": "2022-07-09T23:53:31.375",
                          "updated_at": "2022-07-09T23:53:31.375",
                          "id": "62c9966bd7176c1f4f28f480",
                          "name": "Path",
                          "args": {
                              "_genkey_0": "/test1"
                          }
                      },
                      {
                          "created_at": "2022-07-09T23:53:31.382",
                          "updated_at": "2022-07-09T23:53:31.382",
                          "id": "62c9966bd7176c1f4f28f481",
                          "name": "Method",
                          "args": {
                              "_genkey_0": "GET"
                          }
                      }
                  ],
                  "filters": [],
                  "uri": null,
                  "metadata": {},
                  "order": 0
              }
          },
          {
            "created_at": "2022-07-09T23:53:21.368",
            "updated_at": "2022-07-09T23:53:21.422",
            "id": "62c99661d7176c1f4f28f47b",
            "url_path": "/test1",
            "method_type": "POST",
            "doc_type": "METHOD",
            "integration_type": "HTTP",
            "route_definition": {
                "created_at": "2022-07-09T23:53:21.368",
                "updated_at": "2022-07-09T23:53:21.422",
                "id": "62c99661d7176c1f4f28f47a",
                "predicates": [
                    {
                        "created_at": "2022-07-09T23:53:21.409",
                        "updated_at": "2022-07-09T23:53:21.409",
                        "id": "62c99661d7176c1f4f28f47c",
                        "name": "Path",
                        "args": {
                            "_genkey_0": "/test1"
                        }
                    },
                    {
                        "created_at": "2022-07-09T23:53:21.415",
                        "updated_at": "2022-07-09T23:53:21.415",
                        "id": "62c99661d7176c1f4f28f47d",
                        "name": "Method",
                        "args": {
                            "_genkey_0": "POST"
                        }
                    }
                ],
                "filters": [],
                "uri": null,
                "metadata": {},
                "order": 0
            }
        }
      ];

    const fetchMethods = async () => {
      
      //get methods request
      try {
        setError(null);
  
        const response = await axios.get(
          '/v1.0/g1/paas/apigw/resource/'+resourceId,
          {
            headers: { 'user-id' : 'ksh@gmail.com' }
          }
        );
        setMethods(response.data.method_list); // 데이터는 response.data)
        // console.log(response.data);
        setOptionsCommand(optionsCommand.filter((item) => !(response.data.method_list.some((i) => i.method_type === item.name))));
      } catch (e) {
        setError(e);
      }
      // window.location.reload(true);
    };

    const onClick = (e) => {
      console.log("보기");
      // console.log(e.target);
      // console.log(e.target.getAttribute('value'));
      // props.setResourceId(e.target.methodInfo.method_id);
      // props.setLabel(e.target.methodInfo.method_type);
      // props.setContent('third');
      setUpdate(true);
    }

    useEffect(() => {
      setIsOpen(true);
      // setMethodCommand("");
    }, [methodCommand]);

    useEffect(() => {
      fetchMethods();
      setIsOpen(false);
      setMethodCommand("");
      setOptionsCommand(optionsinitial);
    }, [props.resourceId]);

    return (
        <React.Fragment>
          <DropdownMethod dropdownItems={optionsCommand} default="메서드 생성" size="small" setCommand={setMethodCommand}/>    
          { isOpen === true && methodCommand ?
              <MethodCreate serviceId={serviceId} resourceId={resourceId} setIsOpen={setIsOpen} dropdownItems={optionsCommand} methodCommand={methodCommand} setMethodCommand={setMethodCommand}/> 
              :   <React.Fragment>
                  {/* { update === false ?  */}
                    <React.Fragment>
                      { methods && methods.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <MethodDiv>
                                <ResourceMethodComp methodInfo={item} onClick={onClick}/>
                                  {/* <Routes>
                                    <Route path="/method" element={<MethodUpdate resourceId={resourceId} methodCommandValue={props.label}/>}></Route>
                                    </Routes> */}
                              </MethodDiv>
                            </React.Fragment>
                          );
                      })}
                    </React.Fragment> 
                    {/* : <MethodUpdate methodId={methodId} methodCommandValue={methodCommandValue} />
                  } */}
                </React.Fragment>
            }
        </React.Fragment>
    );
}