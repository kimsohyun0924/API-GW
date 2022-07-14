import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import DropdownMethod from '../components/DropdownMethod';
import MethodCreate from './MethodCreate';
import MethodComp from '../components/MethodComp';
import MethodUpdate from './MethodUpdate';
import axios from 'axios';

const MethodDiv = styled.div`
  display: inline-block;
  padding: 20px 20px 0px 0px;
`;

export default function Method(props) {


  // console.log(props);

    const [update, setUpdate] = useState(false);
    const serviceId = props.serviceId;
    const resourceId = props.resourceId;
    const [methodId, setMethodId] = useState(null);
    const [methodCommand, setMethodCommand] = useState(null);
    const [methodCommandValue, setMethodCommandValue] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [methods, setMethods] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
  

    useEffect(() => {

      setIsOpen(true);
      setMethodCommand("");

    }, [methodCommand]);


    // console.log(methodCommandValue);


    const fetchMethods = async () => {
      //get methods request
      try {
        setError(null);
  
        const response = await axios.get(
          '/v1.0/g1/paas/Memsq07/apigw/resource/'+resourceId
        );
        setMethods(response.data); // 데이터는 response.data)
        // console.log(response.data);
      } catch (e) {
        setError(e);
      }
      // window.location.reload(true);
    };

    useEffect(() => {
      fetchMethods();
    }, [resourceId]);

    // console.log(methods.method_list);

    const onClick = () => {
      console.log("보기");
      setUpdate(true);
  }


    return (
        <React.Fragment>
          <DropdownMethod dropdownItems={optionsCommand} setItem={setMethodCommand} methodCommand={methodCommand} setMethodCommandValue={setMethodCommandValue} />    
          { isOpen === true && methodCommandValue ?
              <MethodCreate serviceId={serviceId} resourceId={resourceId} isOpen={isOpen} setIsOpen={setIsOpen} methodCommandValue={methodCommandValue} setMethodCommandValue={setMethodCommandValue} /> 
            
              :   <React.Fragment>
                  { update === false ? 
                    <React.Fragment>
                      { methods.method_list && methods.method_list.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <MethodDiv>
                                <MethodComp methodInfo={item} onClick={onClick}/>
                                  {/* <Routes>
                                    <Route path="/method" element={<MethodUpdate resourceId={resourceId} methodCommandValue={props.label}/>}></Route>
                                    </Routes> */}
                              </MethodDiv>
                            </React.Fragment>
                          );
                      })}
                    </React.Fragment> 
                    : <MethodUpdate methodId={methodId} methodCommandValue={methodCommandValue} />
                  }
                </React.Fragment>
            }
        </React.Fragment>
    );
}