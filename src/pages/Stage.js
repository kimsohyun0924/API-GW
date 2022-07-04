import React, { useState, useEffect } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import Button from '../components/Button';
import ResourceCreate from './ResourceCreate';
import MethodCreate from './Method';
import Method from './MethodCreate';
import TreeNodeStage from './TreeNodeStage';
import axios from 'axios';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { useLocation } from "react-router";



const ResourceContainer = styled.div`
    
`;  

export default function Stage(props) {

  const serviceInfo = props.serviceInfo;
  const [AllResource, SetAllResource] = useState([]);
  const [error, setError] = useState(null);
  // const serviceInfo = props.serviceInfo;

  // const serviceId = serviceInfo.id;
  const allresource = {
    "type": "resource",
    "id":"kqxi35f4xb",
    "path":"/",
    "child_resource_doc_list":[
        {
            "type": "resource",
            "id":"t9bbeivrfi",
            "path":"/server",
            "child_resource_doc_list":[
                {
                    "type": "resource",
                    "id":"vavdn0zg5t",
                    "path":"/v2",
                    "child_resource_doc_list":[
                        {
                            "type": "resource",
                            "id":"c6qoi28e15",
                            "path":"/client",
                            "child_resource_doc_list":[
                                {
                                    "type": "resource",
                                    "id":"gw8e4b8pn7",
                                    "path":"/api",
                                    "child_resource_doc_list":[],
                                    "method_doc_list":[
                                        {
                                            "type": "method",
                                            "id":"0001",
                                            "method_type":"GET"
                                        }
                                    ]
                                }
                             ],
                            "method_doc_list":[]
                        }
                    ],
                    "method_doc_list":[]
                }
            ],
            "method_doc_list":[]
        }
    ],
    "method_doc_list":[]
}
    
  
  // const getAllResource = async () => {
  //   //get api request
  //   try {
  //     setError(null);

  //     const response = await axios.get(
  //       '/v1.0/g1/paas/Memsq07/apigw/resource/service/'+serviceId
  //     );
  //     SetAllResource(allresource); // 데이터는 response.data
  //     // console.log(AllResource);
  //   } catch (e) {
  //     setError(e);
  //   }
  // };


  // useEffect(() => {
  //   getAllResource();
  // }, []);


  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNodeStage serviceInfo={serviceInfo} data={allresource}/>
      </ResourceContainer>
    </React.Fragment>
  );
}
