// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Skeleton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { urls } from '../../api/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { handleErrAxios } from '../../utils/err.util';
import { UilCheckCircle, UilCircle } from '@iconscout/react-unicons'
import { useLocation, useNavigate } from 'react-router-dom';

import './Polls.css'

function PollItem({slug, redirectTo}) {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});


  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      await axiosPrivate.get(urls.getPoll(slug))
        .then((response) => {
          setData(response.data)
          return response;
        })
        .catch(handleErrAxios)
        .finally(() => {setLoading(false)})
    }
    
    fetchPoll();
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    navigate(redirectTo(slug), {replace: true, state: {from: location}})
  }


  return (
    <div className="PollItem" onClick={handleClick}>
        <span>
          {loading
          ?<Skeleton variant='circular' width={30} height={30}/> 
          : data.has_voted
            ? <Tooltip placement='top' title="رای داده‌اید"><div><UilCheckCircle /></div></Tooltip>
            : <Tooltip placement='top' title="رای شما ثبت نشده"><div><UilCircle /></div></Tooltip>}
          {loading
          ?<Skeleton variant='text' width={'100%'} sx={{fontSize: '3rem'}}/>
          :<h2>{data.title}</h2>}
        </span>
        {loading
          ?<Skeleton variant='text' sx={{fontSize: '1rem'}}/>
          :Date.now() < Date.parse(data.access_time)
              ? <span className='badge' style={{background: "gray"}}>آغاز نشده</span>
              : Date.now() > Date.parse(data.end_time)
                ? <span className='badge' style={{background: "lightcoral"}}>منقضی شده</span>
                : <span className='badge' style={{background: "lightgreen"}}>در حال برگزاری</span>
            }
    </div>
  )
}

export default PollItem