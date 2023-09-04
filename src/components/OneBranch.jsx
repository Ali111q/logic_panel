import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const OneBranch = ({ oneBranchId, img }) => {

    const param = useParams()
    const colleageId = param.colleageId
    const universityId = param.universityId

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };

    //states
    const [oneBranch, setOneBranch] = useState({})
    const [branchIdDeleted,setBranchIdDeleted] = useState(null)
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)




        useEffect(() => {
            async function fetchData() {
                try {
                    if (!token) {
                        navigate('/login')
                    } else {
                        const response = await axios.get(`http://172.20.10.11:5000/api/branch/${oneBranchId}`, { headers });
                        setOneBranch(response.data)
                        setBranchIdDeleted(response.data._id)
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
                await axios.delete(`http://172.20.10.11:5000/api/branch/${branchIdDeleted}`, { headers });
                setIsDeleteClicked(true); // Update the state to indicate deletion
            } catch (err) {
                console.log(err);
            }
        }

        if(isDeleteClicked){
            return null
        }
console.log(oneBranch)
    return (
        <div className="col flex-grow-1 ">
            <div className="card shadow-sm">
                <img src={img} alt="main img" width="100%" height="250" />
                <div className="card-body">
                    <h2>{oneBranch.branchName}</h2>
                    <h6>NO. Of Stages:{oneBranch.branchStageNumbers}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={`/universities/${universityId}/${colleageId}/${oneBranch._id}`} className="btn btn-sm btn-outline-primary">View</Link>
                            <Link to={`/editbranch/${universityId}/${colleageId}/${oneBranch._id}`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <button  type="button" onClick={handleDelete} className="btn btn-sm btn-outline-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OneBranch
