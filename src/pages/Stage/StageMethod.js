import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StageMethod_2 from "./StageMethod_2";

export default function StageMethod(props) {

  const [DataTemp, setDataTemp] = useState(null);
  const [error, setError] = useState(null);

  const GetMethodInfo = async () => {
    //get Method info
    try {
      setError(null);

      const response = await axios.get(
        '/v1.0/g1/paas/Memsq07/apigw/method/'+props.resourceId
      );
      setDataTemp(response.data); // 데이터는 response.data)
      // console.log(response.data);
    } catch (e) {
      setError(e);
    }
  };

  useEffect(() => {
    GetMethodInfo();
  }, []);


  console.log(DataTemp);
  
  return (
    <React.Fragment>
      <StageMethod_2 stageId={props.stageId} resourceId={props.resourceId} backend_url={props.backend_url} DataTemp={DataTemp}/>
    </React.Fragment>
  );
}
