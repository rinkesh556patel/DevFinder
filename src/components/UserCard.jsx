import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, photoUrl, age, gender } = user;

    const handleSendRequest = async (status, _id) => {
        try {
            await axios.post( BASE_URL + '/request/send/' + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeFromFeed(_id));
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                src={photoUrl}
                alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleSendRequest('ignored', _id)}>Ignore</button>
                    <button className="btn btn-primary" onClick={() => handleSendRequest('interested', _id)}>Interested</button>
                </div>
            </div>
        </div>
    );
}

export default UserCard;