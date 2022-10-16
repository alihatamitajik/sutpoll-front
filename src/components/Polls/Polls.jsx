// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect, useState } from 'react'
import { urls } from '../../api/urls';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Load from '../Load/Load';

import './Polls.css'
import PollsList from './PollsList';

function Polls({redirectTo}) {

  const axiosPrivate = useAxiosPrivate();

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);


  useEffect(()=> {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axiosPrivate.get(urls.allPolls(currPage, postPerPage));
      console.log(response?.data);
      setLoading(false);
    }

    fetchPosts();
  }, [currPage])


  return (
    <div className="Polls">
        <h1>رای‌گیری‌ها</h1>
        <div className="listContainer">
          {loading
            ? <Load />
            :<PollsList />}
        </div>
    </div>
  )
}

export default Polls