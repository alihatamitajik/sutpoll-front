// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect, useState } from 'react'
import { urls } from '../../api/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { handleErrAxios } from '../../utils/err.util';
import Load from '../Load/Load';
import './Polls.css'
import PollItem from './PollItem';
import ReactPaginate from 'react-paginate';
import { UilArrowCircleLeft,UilArrowCircleRight } from '@iconscout/react-unicons'
import { Pagination } from '@mui/material';

function Polls({redirectTo}) {

  const axiosPrivate = useAxiosPrivate();

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const [pageCount, setPageCount] = useState(1);


  useEffect(()=> {
    const fetchPosts = async () => {
      setLoading(true);
      await axiosPrivate.get(urls.allPolls(currPage, postPerPage))
        .then((response) => {
          setPolls(response.data.data);
          console.log(response.data);
          setPageCount(response.data.meta.last_page);
          return response;
        })
        .catch(handleErrAxios)
      setLoading(false);
    }

    fetchPosts();
  }, [currPage])

  const handleChange = (event, page) => {
    setCurrPage(page);
  }


  return (
    <div className="Polls">
        <h1>رای‌گیری‌ها</h1>
        <PollsList slugs={polls} redirectTo={redirectTo} loading={loading}/>
        <div dir='rtl'><Pagination count={pageCount} page={currPage} onChange={handleChange} /></div>
    </div>
  )
}

function PollsList({slugs, redirectTo, loading}) {
  return (
      <div className="PollsList">
        {
          loading
            ?<Load />
            :slugs.map((slug, index) => (
              <PollItem key={index} slug={slug} redirectTo={redirectTo}/>
            ))
        }
    </div>
  )
}

export default Polls