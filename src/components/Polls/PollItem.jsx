// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Chip, Skeleton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { urls } from '../../api/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { handleErrAxios } from '../../utils/err.util';
import { UilCheckCircle, UilCircle } from '@iconscout/react-unicons'
import { useLocation, useNavigate } from 'react-router-dom';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';

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
          console.log(response.data);
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
          ?<Skeleton variant='text' width={'60%'} sx={{fontSize: '3rem'}}/>
          :<h2>{data.title}</h2>}
        </span>
        <div className='chipContainer'>
        {loading
          ?<Skeleton variant='text' width={'100%'} sx={{fontSize: '1.5rem'}}/>
          :Date.now() < Date.parse(data.access_time)
              ? <Chip variant='outlined' label="آغاز نشده" icon={<ScheduleIcon />}/>
              : Date.now() > Date.parse(data.end_time)
                ? <Chip variant='outlined' label="منقضی شده" icon={<EventBusyIcon />}/>
                : <Chip variant='outlined' label="در حال برگزاری" icon={<EventAvailableIcon />}/>
        }
        {
          loading?<></>
          :data.show_mode === "show"
            ? <Chip variant='outlined' label="نتیجه پس از رای" icon={<VisibilityIcon />}/>
            :data.show_mode === "after_finish"
              ? <Chip variant='outlined' label="نتیجه پس از  پایان" icon={<VisibilityOffIcon />}/>
              : <Chip variant='outlined' label="نتیجه نامشخص" icon={<LockIcon />}/>
        }
        </div>
    </div>
  )
}

export default PollItem