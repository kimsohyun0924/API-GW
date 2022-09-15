import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TreeNodeStage from './TreeNodeStage';
import axios from 'axios';
import { useLocation } from "react-router";



const ResourceContainer = styled.div`
    
`;  

export default function Stage(props) {

  const serviceInfo = props.serviceInfo;
  const serviceId = serviceInfo.service_id;
  const [stageList, setStageList] = useState([]);
  const [error, setError] = useState(null);
  // const serviceInfo = props.serviceInfo;

  // const serviceId = serviceInfo.id;
  const testData = [
    {
      "stage_id": "62c3ce9920ce5d03740bc954",
        "name": "develop",
        "invoke_url": "62c3ce9920ce5d03740bc954.apigw-test.211-252-81-86.nip.io",
        "status": "STAGE_DEPLOYING",
        "root_resource": {
            "resource_id": "62c3c00620ce5d03740bc930",
            "doc_type": "RESOURCE",
            "path": "/",
            "method_list": null,
            "child_resource_list": [
                {
                    "resource_id": "62c3c00620ce5d03740bc935",
                    "doc_type": "RESOURCE",
                    "path": "/test",
                    "method_list": [
                        {
                            "method_id": "62c3c00620ce5d03740bc934",
                            "doc_type": "METHOD",
                            "method_type": "GET",
                            "integration_type": "HTTP",
                            "created_at": "2022-07-05T13:37:26.466",
                            "updated_at": "2022-07-05T13:37:26.466"
                        }
                    ],
                    "child_resource_list": null,
                    "created_at": "2022-07-05T13:37:26.472",
                    "updated_at": "2022-07-05T13:37:26.472"
                }
            ],
            "created_at": "2022-07-05T13:37:26.445",
            "updated_at": "2022-07-05T13:37:26.497"
     },
        "created_at": "2022-07-05T14:39:37.594",
        "updated_at": "2022-07-05T14:39:37.659"
    }
]

    
  
  const getStageList = async () => {
    //get Stage List
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/apigw/stage/service/'+serviceId,
        {
          headers: { 'user-id' : 'ksh@gmail.com' }
        }
      );
      setStageList(response.data); // 데이터는 response.data
      // console.log(AllResource);
    } catch (e) {
      setError(e);
    }
  };


  useEffect(() => {
    getStageList();
  }, []);


  // console.log(AllResource);
  // console.log(testData);

  return (
    <React.Fragment>
      <ResourceContainer>        
        <TreeNodeStage serviceInfo={serviceInfo} stageList={stageList}/>
      </ResourceContainer>
    </React.Fragment>
  );
}
