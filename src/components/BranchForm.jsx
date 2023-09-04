import React, { useState } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import { redirect, useNavigate, useParams } from 'react-router-dom';

const BranchForm = () => {
    //bring the college id and find the college from its id 
    //add the branch to the college 
    // navigate state
    const navigate = useNavigate();
    //form states 
    const [branchName, setBranchName] = useState('')
    const [branchImgUrl, setBranchImgUrl] = useState('')
    const [branchStageNumbers,setBranchStage] = useState(0)

    //url state and the ids of the url 
    const param = useParams()
    const colleageId = param.colleageId
    const universityId = param.universityId

    //token requirements 
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };


    const branchSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            if (!token) {
                navigate('/login'); // Redirect to login route if token is not present
            } else {
                const response = await axios.post(`http://172.20.10.11:5000/api/branch/addnewbranch`, {
                    branchName,
                    branchStageNumbers,
                    colleageId
                }, { headers });
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login'); // Redirect to login route if token is invalid or expired
            } else {
                console.log(error);
            }
        }
        navigate(`/universities/${universityId}/${colleageId}`)
    }






    return (
        <>
            <SideBar />
            <form className='w-50 me-auto my-5' onSubmit={branchSubmitHandler}>
                <div className="mb-3">
                    <label htmlFor="colleageName" className="form-label">Branch Name</label>
                    <input type="text" className="form-control" id="colleageName" aria-describedby="emailHelp" onChange={(e) => setBranchName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="colleageImg" className="form-label" >Stage Numbers</label>
                    <input type="number" step={1} className="form-control" id="colleageImg" onChange={(e) => setBranchStage(e.target.value)} />
                </div>
                <div className="mb-3">
                    <div className='d-flex'>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default BranchForm