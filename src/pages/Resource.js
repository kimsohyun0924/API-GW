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
  position:relative;
  width: 100%;
  height: 100%;
`;

const ButtonDiv = styled.div`
  display : flex;
  padding: 10px 0px 20px 0px;
`;

const ExampleDiv = styled.div`
  display: flex;  
  /* background: orange;  */
`;

const MenuDiv = styled.div`
  min-width: 200px;
  min-height: 610px;
  /* background:pink; */
  /* width: 200px;
  height: 610px; */
  padding: 15px 15px 0px 15px;
  border: 1px solid #e2e2e2;
`;

// const TreeNodeDiv = styled.div`
//   width: 100%;
//   height: 33px;
//   margin-bottom:10px;
//   font-size: 20px;
//   border-bottom-color: #e2e2e2;
//   border-bottom-width: 1px;
// `;

const ResourceInfo = styled.div`
  height: 610px;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  
  padding : 15px 15px 15px 15px;
`;

const Content = styled.div`
 
  width: 100%;
  height: 100%;
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
