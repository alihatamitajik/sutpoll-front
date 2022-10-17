// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { urls } from '../../api/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { stringifyJalali } from '../../utils/date.util';
import { handleErrAxios } from '../../utils/err.util';
import {UilCalendarAlt} from '@iconscout/react-unicons'
import ReactMarkdown from 'react-markdown';
import Load from '../Load/Load';

import './PollPage.css'
import { Skeleton } from '@mui/material';


function PollPage() {
  const axiosPrivate = useAxiosPrivate();
  const {slug} = useParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      await axiosPrivate.get(urls.getDetails(slug))
        .then((response) => {
          setDetails(response.data)
          return response;
        })
        .catch(handleErrAxios)
      
      await axiosPrivate.get(urls.getPoll(slug))
        .then((response) => {
          setData(response.data)
          return response;
        })
        .catch(handleErrAxios)
      
      setLoading(false);
    }
    
    fetchPoll();
  }, [slug])

  return (
    <div className="PollPage">
      <div className='details'>
        {loading
          ?<Skeleton variant='text' sx={{fontSize: '4.5rem', width:'58%'}} />
          :<h1>موضوع: {details.title}</h1>
        }
        {loading
          ?<Skeleton variant='text' sx={{fontSize: '2.5rem', width:'45%'}} />
          :<span className="persian">
          <span style={{margin: "0 0 0 15px"}}><UilCalendarAlt /></span>
        از <span className='badge dateTime'>{stringifyJalali(details.access_time)}</span> تا <span className='badge dateTime'>{stringifyJalali(details.end_time)}</span> 
        {Date.now() < Date.parse(data.access_time)
          ? "(آغاز نشده)"
              : Date.now() > Date.parse(data.end_time)
                ? "(منقضی شده)"
                : ""}</span>
        }
        {loading?<Skeleton variant='text' sx={{fontSize: '2.5rem', width:'63%'}} />:<h2>توضیحات</h2>}
        {loading? 
            <>
            <Skeleton variant='text' sx={{fontSize: '1.5rem'}} />
            <Skeleton variant='text' sx={{fontSize: '1.5rem'}} />
            <Skeleton variant='text' sx={{fontSize: '1.5rem'}} />
            <Skeleton variant='text' sx={{fontSize: '1.5rem'}} />
            <Skeleton variant='text' sx={{fontSize: '1.5rem'}} />
            <Skeleton variant='text' sx={{fontSize: '1.5rem', width:'50%'}} />
            </>
            :<ReactMarkdown className="description">
            {details.description}
          </ReactMarkdown>
        }
        
      </div>
      <div>
        
      </div>
    </div>
  )
}


export default PollPage