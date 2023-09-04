import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
const CourseCard = ({ couresId,branchId,colleageId,universityId }) => {


    //states
    const [course, setCourse] = useState({})
    const [isDeleteClicked,setIsDeleteClicked] = useState(false)
    const [courseDeletedId,setCourseDeletedId] = useState(null)
    
    // auth & fetch 
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };


    useEffect(() => {
        async function fetchData() {
            try {
                if (!token) {
                    navigate('/login'); // Redirect to login route if token is not present
                } else {
                    const response = await axios.get(`https://slogic.dorto-dev.com/api/course/${couresId}`, { headers });
                    setCourse(response.data)
                    setCourseDeletedId(response.data._id)
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login'); // Redirect to login route if token is invalid or expired
                } else {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [token, navigate]);


    //delete handler
    const handleDelete = async () => {
        try {
            await axios.delete(`https://slogic.dorto-dev.com/api/course/${courseDeletedId}`, { headers });
            setIsDeleteClicked(true); // Update the state to indicate deletion
        } catch (err) {
            console.log(err);
        }
    }

    if(isDeleteClicked){
        return null
    }

    return (
        <div className="col" >
            <div className="card shadow-sm">
                <title>Placeholder</title>
                <img src={course.courseImg} alt="main img" width="100%" style={{objectFit:'contain'}} height="250" />
                <div className="card-body">
                    <h2>{course.courseTitle}</h2>
                    <h6>{course.coursePrice>0?`${course.coursePrice} IQD`:'FREE'} </h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={`/universities/${universityId}/${colleageId}/${branchId}/${couresId}`} className="btn btn-sm btn-outline-primary">View</Link>
                            <Link to={`/editcourse/${universityId}/${colleageId}/${branchId}/${couresId}`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <button className="btn btn-sm btn-outline-danger"  onClick={handleDelete}>Delete</button>
                            <Link className='btn btn-sm btn-outline-primary' to={`/active/${couresId}`} >Active</Link>
                        </div>
                        <small className="text-muted">{course.courseTeacher}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard
