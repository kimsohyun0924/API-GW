import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import Button from '../components/Button';
import ResourceCreate from './ResourceCreate';
import MethodCreate from './Method';
import Method from './MethodCreate';
import TreeNode from './TreeNode';
import axios from 'axios';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useLocation } from "react-router";



const ResourceContainer = styled.div`
    
`;  

export default function Resource(props) {

  const { state } = useLocation();
  const [AllResource, SetAllResource] = useState([]);
  const [RootId, SetRootId] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.id;
  const allresource = {
    'resourceId': 'root',
    'path': '/',
    'resourceList': [
      {
        'resourceId': '1',
        'path': '/test1',
        'resourceList' : [
          {
            'resourceId': '2',
            'path': '/test2'
          }
        ]
      }
    ],
    "methodList": [
      {
        "methodId": "string",
        "resourceId": "string",
        "type": "GET",
        "routeDefinitionList": [
          {
            "routeId": "string",
            "uri": "string",
            "methodId": "string",
            "predicateDefinitionList": [
              {
                "createdAt": "2022-06-23T08:28:38.288Z",
                "updatedAt": "2022-06-23T08:28:38.288Z",
                "id": "string",
                "name": "string",
                "args": {
                  "additionalProp1": "string",
                  "additionalProp2": "string",
                  "additionalProp3": "string"
                }
              }
            ],
            "filterDefinitionList": [
              {
                "id": "string",
                "name": "string",
                "args": {
                  "additionalProp1": "string",
                  "additionalProp2": "string",
                  "additionalProp3": "string"
                }
              }
            ]
          }
        ]
      }
    ]
  };
  
  
  const getAllResource = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/resource/service/'+serviceId
      );
      SetAllResource(allresource); // 데이터는 response.data
      // console.log(AllResource);
    } catch (e) {
      setError(e);
    }
  };


  useEffect(() => {
    getAllResource();
  }, []);


  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNode serviceInfo={serviceInfo} data={allresource}/>
      </ResourceContainer>
    </React.Fragment>
  );
}
