import React from 'react'
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch()

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true});
      dispatch(removeRequest(_id));
    }
    catch(err) {
      console.log(err)
    }
  }
 
  const fetchRequests =  async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data));
    }
    catch(err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    fetchRequests();
  }, []);

  if (!requests) return;
    
  if(requests.length === 0 )
    return (
      <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">No Requests Found!!</h2>
        </div>
      </div>
    </div>
  )
  

  return (
      <div className="text-center my-10">
          <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

          { requests.map((request) => {
              const { _id, firstName, lastName, age, gender, photoUrl } = request.fromUserId;

              return(
                  <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                      <div>
                          <img
                              alt="photo"
                              className="w-20 h-20 rounded-full object-cover"
                              src={photoUrl}
                          />
                      </div>
                      <div className="text-left mx-4 ">
                          <h2 className="font-bold text-xl">
                              {firstName + " " + lastName}
                          </h2>
                          {age && gender && <p>{age + ", " + gender}</p>}
                      </div>
                      <div>
                        <button className='btn btn-primary mx-2' onClick={() => reviewRequest("rejected", request._id)}>
                          Reject
                        </button>
                        <button className='btn btn-primary mx-2' onClick={() => reviewRequest("accepted", request._id)}>
                          Accept
                        </button>
                      </div>
                  </div>
              );
          })}
      </div>
  );
}

export default Requests