import React from "react";
import { Card } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_CARS } from "../../queries";
import { GET_PERSON } from "../../queries";
import { Link, useParams } from 'react-router-dom';
import Cars from "../lists/Cars";

const PersonDetail = () => {
  let { id } = useParams();
  
  const {loading, error, data } = useQuery(GET_CARS);
  const res = useQuery(GET_PERSON, { variables: { "personId": id }, });

  if(loading || res.loading) return 'Loading...'
  if(error) return `Error! ${error.message}`
  
  return (
    <Card title={res.data.person.firstName+" "+res.data.person.lastName+" owns the following cars"} headStyle={{fontSize: 24}} extra={<Link to="/">❮ Go Back</Link>}>
      <Cars data={data} res={res} />
    </Card>
  )
}

export default PersonDetail