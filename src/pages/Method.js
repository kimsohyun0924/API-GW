import React, { useState, useRef, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import DropdownMethod from '../components/DropdownMethod';
import MethodCreate from './MethodCreate';
import MethodComp from '../components/MethodComp';
import axios from 'axios';
import { ImportExport } from '@material-ui/icons';

const MethodDiv = styled.div`
  display: inline-block;
  padding: 20px 20px 0px 0px;
`;

export default function Method(props) {

    const resourceId = props.resourceId;
    const [methodCommand, setMethodCommand] = useState(null);
    const [methodCommandValue, setMethodCommandValue] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [methods, setMethods] = useState([]);
    const [error, setError] = useState(null);

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

    const methodList = [
      
          {
              "methodDescription":"keypair_list",
              "resourceId":"9cgz0mfmvx",
              "methodName":"GET",
              "apiId":"drc3eot3lf",
              "endpointCode":"0006",
              "httpEndPoint":
              {
                  "stream":false,
                  "method":"GET",
                  "url":"/d1/server/os-keypairs"
              },
              "useBodyWhenFormData":false,
              "tenantId":"5a0da4775c734f48908c5194d5920418",
              "modifier":"f96161a0-3cd9-11ea-801a-246e963c7ebc",
              "validation":
              {
                  "type":"NONE"
              },
              "authentication":
              {
                  "platform":"NONE"
              },
              "requiredApiKey":
              {
                  "required":true
              }
          },
          {
              "methodDescription":"keypairCreate",
              "resourceId":"9cgz0mfmvx",
              "methodName":"POST",
              "apiId":"drc3eot3lf",
              "endpointCode":"0006",
              "httpEndPoint":
              {
                  "stream":false,
                  "method":"POST",
                  "url":"/d1/server/os-keypairs"
              },
              "consumers":"application/json",
              "produces":"application/json",
              "useBodyWhenFormData":false,
              "tenantId":"5a0da4775c734f48908c5194d5920418",
              "modifier":"f96161a0-3cd9-11ea-801a-246e963c7ebc",
              "validation":
              {
                  "type":"NONE"
              },
              "authentication":
              {
                  "platform":"NONE"
              },
              "requiredApiKey":
              {
                  "required":false
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
    }, []);

    console.log(methods.method_doc_list);

    return (
        <React.Fragment>
          <DropdownMethod dropdownItems={optionsCommand} setItem={setMethodCommand} methodCommand={methodCommand} setMethodCommandValue={setMethodCommandValue} />    
          { isOpen === true && methodCommandValue ?
              <MethodCreate resourceId={resourceId} isOpen={isOpen} setIsOpen={setIsOpen} methodCommandValue={methodCommandValue} setMethodCommandValue={setMethodCommandValue} /> 
              : <div>
                { methods.method_doc_list && methods.method_doc_list.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <MethodDiv>
                        {/* <MethodComp/> */}
                        <MethodComp methodInfo={item}/>
                      </MethodDiv>
                    </React.Fragment>
                  );
                })}
                </div>     
          }
        </React.Fragment>
    );
}