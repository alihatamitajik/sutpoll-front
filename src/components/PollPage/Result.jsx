// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect } from 'react'
import './Result.css'
import { useState } from 'react';
import { motion  } from 'framer-motion';
import {  Skeleton } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import wait from '../../imgs/wait.svg'
import lock from '../../imgs/locked.svg'
import { urls } from '../../api/urls';
import { handleErrAxios } from '../../utils/err.util';


function ShowResultPie({slug}) {

    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchPoll = async () => {
            setLoading(true);
            await axiosPrivate.get(urls.pollResults(slug))
            .then((response) => {
                console.log(response.data);
              setData(response.data);
              return response;
            })
            .catch(handleErrAxios)
          }
          
          fetchPoll();
    }, [slug])

    return (
        <div>Result Pie</div>
    )
}


function Result({show, slug, loading}) {
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="Result" onClick={() => setIsOpen(!isOpen)}>
        {loading
            ?<Skeleton variant='text' width={'60%'} sx={{fontSize: '3rem'}}/> 
            :<motion.h2 layout="position">نتایج</motion.h2>}
        {isOpen && !loading &&  <>{show === "after_finish"
            ? <><motion.img src={wait} alt="You should wait for it!" style={{
                maxHeight: '60%',
                maxWidth: '60%',
                height: 'auto',
                width: 'auto'
                }}/> 
                <motion.h3>برای دیدن نتایج تا پایان رای‌گیری باید صبر کنید.</motion.h3>
                </>
            :show === "hidden"
                ? <><motion.img src={lock} alt="You Can't!" style={{
                    maxHeight: '60%',
                    maxWidth: '60%',
                    height: 'auto',
                    width: 'auto'
                    }}/> 
                    <motion.h3>شرکت‌کنندگان قادر به دیدن نتایج نیستند.</motion.h3>
                    </>
                : <ShowResultPie slug={slug} />
            }</>}
    </motion.div>
  )
}

export default Result