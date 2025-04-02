import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {addConnections} from '../utils/connectionsSlice';

const Connections = () => {
    const connections = useSelector(store => store.connections);

    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    
    if(connections.length === 0 ) 
        return (
            <div className='flex justify-center my-10'>
            <div className="card card-border bg-base-200 w-96">
              <div className="card-body">
                <h2 className="card-title justify-center">No Connections Found!!</h2>
              </div>
            </div>
          </div>
        )

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>

            { connections.map((connection) => {
                const { _id, firstName, lastName, age, gender, photoUrl } = connection;

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
                    </div>
                );
            })}
        </div>
    );
}

export default Connections