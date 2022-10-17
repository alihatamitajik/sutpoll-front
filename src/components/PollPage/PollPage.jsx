// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { urls } from '../../api/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { handleErrAxios } from '../../utils/err.util';


function PollPage() {
  const axiosPrivate = useAxiosPrivate();
  const {slug} = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      await axiosPrivate.get(urls.getDetails(slug))
        .then((response) => {
          setData(response.data)
          return response;
        })
        .catch(handleErrAxios)
        .finally(() => {setLoading(false)})
    }
    
    fetchPoll();
  }, [slug])

  return (
    <div>{loading?"Loading...":JSON.stringify(data)}</div>
  )
}

export default PollPage