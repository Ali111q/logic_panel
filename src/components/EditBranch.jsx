import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBranch = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const param = useParams()
  const universityId = param.universityId
  const collegeId = param.collegeId
  const branchId = param.branchId

  const [branchName, setBranchName] = useState('')
  const [branchStageNumbers, setBranchStageNumbers] = useState(0)



  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate('/login'); // Redirect to login route if token is not present
        } else {
          const response = await axios.get(`http://172.20.10.11:5000/api/branch/${branchId}`, { headers });
          console.log(response)
          setBranchName(response.data.data.branchName)
          setBranchStageNumbers(response.data.data.branchStageNumbers)
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





  const branchUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login'); // Redirect to login route if token is not present
      } else {
        const response = await axios.patch(`http://172.20.10.11:5000/api/branch/${branchId}`, {
          branchName,
          branchStageNumbers,
        }, { headers });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login route if token is invalid or expired
      } else {
        console.log(error);
      }
    }
    navigate(`/universities/${universityId}/${collegeId}`)
  }



  return (
    <>
      <SideBar />
      <form className='w-50 me-auto my-5' onSubmit={branchUpdateHandler}>
        <div className="mb-3">
          <label htmlFor="branchName" className="form-label">New Branch Name</label>
          <input type="text" className="form-control" id="branchName" value={branchName} aria-describedby="emailHelp" onChange={(e) => setBranchName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="colleageImg" className="form-label" >New Branch Stgae Numbers</label>
          <input type="number"  className="form-control" id="colleageImg" value={branchStageNumbers} onChange={(e) => setBranchStageNumbers(e.target.value)} />
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

export default EditBranch;
