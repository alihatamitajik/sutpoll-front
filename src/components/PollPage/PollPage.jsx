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
import ShareIcon from '@mui/icons-material/Share';

import './PollPage.css'
import { IconButton, Skeleton } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import Locked from './Locked';
import Vote from './Vote';
import Result from './Result';
import { toast } from 'react-toastify';



function canSeeDetails(pollData, auth) {
  if (auth?.role.includes("admin")) {
    return true;
  } else {
    if (Date.parse(pollData?.access_time) > new Date()) {
      return false;
    }
  }
  return true;
} 


function PollPage() {
  const axiosPrivate = useAxiosPrivate();
  const {slug} = useParams();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [details, setDetails] = useState({});
  const [locked, setLocked] = useState(false);


  useEffect(() => {
    const fetchPoll = async () => {
      setLoading(true);
      setLocked(false);
      await axiosPrivate.get(urls.getPoll(slug))
      .then((response) => {
        setData(response.data);
        let canSee = canSeeDetails(response.data, auth);
        setLocked(!canSee);
        if (canSee) {
          axiosPrivate.get(urls.getDetails(slug))
            .then((response) => {
              setLoading(false);
              console.log(response.data);
              setDetails(response.data)
              return response;
            })
            .catch(handleErrAxios)
        }
        return response;
      })
      .catch(handleErrAxios)
    }
    
    fetchPoll();
  }, [slug])

  return (
    <div className={locked?"PollPage LockedPage":"PollPage"}>
      {locked?<Locked />:<>
      <div className='details'>
        {loading
          ?<Skeleton variant='text' sx={{fontSize: '4.5rem', width:'58%'}} />
          :
            <h1>موضوع: {details.title}</h1>
        }
        {loading
          ?<Skeleton variant='text' sx={{fontSize: '2.5rem', width:'45%'}} />
          :<div className="persian">
          <span style={{margin: "0 0 0 15px"}}><UilCalendarAlt /></span>
        از <span className='badge dateTime'>{stringifyJalali(details.access_time)}</span> تا <span className='badge dateTime'>{stringifyJalali(details.end_time)}</span>
        {Date.now() < Date.parse(data.access_time)
          ? "(آغاز نشده)"
              : Date.now() > Date.parse(data.end_time)
                ? "(منقضی شده)"
                : ""}
            <IconButton onClick={() => {
              navigator.clipboard.writeText(window.location.origin + `/polls/${slug}`);
              toast.info("در کلیپ‌بورد ذخیره شد.")
            }}>
              <ShareIcon />
            </IconButton>
          </div>
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
      <div className="Actions">
        <Vote details={details} setDetails={setDetails} loading={loading}/>
        <Result loading={loading} slug={slug} show={data.show_mode} can_view={data.can_view}/>
      </div>
      </>}
    </div>
  )
}


export default PollPage