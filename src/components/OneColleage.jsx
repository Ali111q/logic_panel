import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const OneColleage = ({ collegeId,currentUniversityId }) => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };
    
    //states
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const [oneCollege, setOneCollege] = useState({})
    const [collegeDeletedId,setCollegeDeletedId] = useState(null)

    
    
    useEffect(() => {
        async function fetchData() {
            try {
                if (!token) {
                    navigate('/login')
                } else {
                    const response = await axios.get(`https://slogic.dorto-dev.com/api/colleage/${collegeId}`, { headers });
                    console.log(response)
                    setOneCollege(response.data);
                    setCollegeDeletedId(response.data._id)
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login')
                } else {
                    console.log(error)
                }
            }
        }
        fetchData();
    }, [token, navigate]);
    
    const handleDelete = async () => {
        try {
            await axios.delete(`https://slogic.dorto-dev.com/api/colleage/${collegeDeletedId}`, { headers });
            setIsDeleteClicked(true); // Update the state to indicate deletion
        } catch (err) {
            console.log(err);
        }
    }
    
    if(isDeleteClicked){
        return null
    }
    
    return (
        <div className="col flex-grow-1 ">
            <div className="card shadow-sm">
                <img src={oneCollege.colleageImgUrl} alt="main img" width="100%" height="250" />
                <div className="card-body">
                    <h2>{oneCollege.colleageName}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={`/universities/${currentUniversityId}/${collegeId}`} className="btn btn-sm btn-outline-primary">View</Link>
                            <Link to={`/edit/${currentUniversityId}/${collegeId}`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <button type='button' className="btn btn-sm btn-outline-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneColleage
