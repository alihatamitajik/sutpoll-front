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
import Load from '../Load/Load';
import Chart from 'react-apexcharts';
import { height } from '@mui/system';
import useAuth from '../../hooks/useAuth';


function ShowResultPie({slug}) {

    const [loading, setLoading] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);

    const options = {
        labels: labels,
        chart: {
          type: 'donut',
          fontFamily: 'Vazirmatn FD, sans-serif'
        },
        legend: {
            show: false
        }
    }

    useEffect(() => {
        const fetchPoll = async () => {
            setLoading(true);
            await axiosPrivate.get(urls.pollResults(slug))
            .then((response) => {
                console.log(response.data);
              setSeries(response.data.map(x => x.total_count))
              setLabels(response.data.map(x => x.text))
              return response;
            })
            .catch(handleErrAxios)

            setLoading(false);
          }
          
          fetchPoll();
    }, [slug])

    return (
        <>{
            loading
                ? <Load />
                : <Chart series={series} options={options} type="donut" />
        }</>
    )
}


function Result({show, slug, loading, can_view}) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div layout className="Result" onClick={() => setIsOpen(!isOpen)}>
        {loading
            ?<Skeleton variant='text' width={'60%'} sx={{fontSize: '3rem'}}/> 
            :<motion.h2 layout="position">??????????</motion.h2>}
        {isOpen && !loading &&  <>      
            {can_view? <ShowResultPie slug={slug} />
            :show === "after_finish"
                ? <><motion.img src={wait} alt="You should wait for it!" style={{
                maxHeight: '60%',
                maxWidth: '60%',
                height: 'auto',
                width: 'auto'
                }}/> 
                <motion.h3>???????? ???????? ?????????? ???? ?????????? ????????????????? ???????? ?????? ????????.</motion.h3>
                </>
            :<><motion.img src={lock} alt="You Can't!" style={{
                    maxHeight: '60%',
                    maxWidth: '60%',
                    height: 'auto',
                    width: 'auto'
                    }}/> 
                    <motion.h3>????????????????????????? ???????? ???? ???????? ?????????? ????????????.</motion.h3>
                    </>
            }</>}
    </motion.div>
  )
}

export default Result