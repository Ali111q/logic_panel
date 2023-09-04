import { useState } from 'react';
import axios from 'axios'

const UserCard = ({ id, currentCourseId,userInfo }) => {

    //getting the token 
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const [isCourseActive,setIsCourseActive] = useState(userInfo.userCourses.includes(currentCourseId))

    //active course function
    const activeClickHandler = (e) => {
        e.preventDefault()
        axios.patch(`https://slogic.dorto-dev.com/api/activeusercourse/${id}/${currentCourseId}`,{currentCourseId},{headers})
        setIsCourseActive(true)
    }

    //non active function 
    const nonActiveHandler = (e) =>{
        e.preventDefault()
        axios.patch(`https://slogic.dorto-dev.com/api/nonactiveusercourse/${id}/${currentCourseId}`,{currentCourseId},{headers})
        setIsCourseActive(false)
    }


    return (
        <div className="col flex-grow-1 ">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h6>Account Name : {userInfo.username}</h6>
                    <h6>User Id : {userInfo._id}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            {isCourseActive ? <button onClick={nonActiveHandler} className='btn btn-primary'>Activated</button>:<button className='btn btn-danger' onClick={activeClickHandler} >Not Activated</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard
