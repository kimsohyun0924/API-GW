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
  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.id;
  const resourceId = serviceInfo.root_resource_id;
  const [AllResource, SetAllResource] = useState({"id": "62becb8438c2e53962ab955c"});
  const [error, setError] = useState(null);

  // const [RootId, SetRootId] = useState(null);
  // const [data, setData] = useState(); 
  // const { state } = useLocation();
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
    
  

  //전체 리소스 조회
  const getAllResource = async () => {
    //get api request
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/resource/'+resourceId
      );
      SetAllResource(response.data); // 데이터는 response.data
    } catch (e) {
      setError(e);
    }
  };


  useEffect(() => {
    getAllResource();
  }, []);

  // console.log(AllResource);


  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNode serviceInfo={serviceInfo} data={AllResource}/>
      </ResourceContainer>
    </React.Fragment>
  );
}
