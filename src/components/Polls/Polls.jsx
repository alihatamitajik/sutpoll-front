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
          setPageCount(response.data.meta.last_page);
          return response;
        })
        .catch(handleErrAxios)
        .finally(() => {setLoading(false);})
    }

    fetchPosts();
  }, [currPage])


  const handlePageClick = (e) => {
    setCurrPage(e.selected + 1);
  }


  return (
    <div className="Polls">
        <h1>رای‌گیری‌ها</h1>
        <PollsList slugs={polls} redirectTo={redirectTo} loading={loading}/>
        <ReactPaginate
            breakLabel="..."
            nextLabel={<UilArrowCircleRight />}
            onPageChange={handlePageClick}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<UilArrowCircleLeft  />}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="pageNum"
            previousLinkClassName="pageNum"
            nextLinkClassName="pageNum"
            activeLinkClassName="active"
          />
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