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
    "resourceId":"kqxi35f4xb",
    "resourcePath":"/",
    "resourceList":[
        {
            "resourceId":"t9bbeivrfi",
            "resourcePath":"/server",
            "resourceList":[
                {
                    "resourceId":"vavdn0zg5t",
                    "resourcePath":"/v2",
                    "resourceList":[
                        {
                            "resourceId":"c6qoi28e15",
                            "resourcePath":"/client",
                            "resourceList":[
                                {
                                    "resourceId":"gw8e4b8pn7",
                                    "resourcePath":"/api",
                                    "resourceList":[],
                                    "methodList":[
                                        {
                                            "methodCode":"0001",
                                            "methodName":"GET"
                                        }
                                    ]
                                }
                             ],
                            "methodList":[]
                        }
                    ],
                    "methodList":[]
                }
            ],
            "methodList":[]
        }
    ],
    "methodList":[]
}
    
  
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
