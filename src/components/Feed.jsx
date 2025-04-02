import React, { useEffect } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useSelector } from 'react-redux';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchFeed = async () => {
    
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(res.data.data));
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFeed();
  }, []);

  if(!feed) return;

  if(feed.length === 0) {
    return (
      <div className='flex justify-center my-10'>
        <div className="card card-border bg-base-200 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">No Users Found</h2>
          </div>
        </div>
      </div>
    )
  }

  return feed && (
    <div className='flex justify-center my-10'>
        <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed