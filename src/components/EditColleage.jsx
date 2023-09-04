import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditColleage = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const param = useParams()
  const universityId = param.universityId
  const collegeId = param.currentCollegeId

  const [colleageName, setCollegeName] = useState('')
  const [colleageImgUrl, setCollegeImgUrl] = useState('')



  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate('/login'); // Redirect to login route if token is not present
        } else {
          const response = await axios.get(`http://172.20.10.11:5000/api/colleage/${collegeId}`, { headers });
          console.log(response)
          setCollegeName(response.data.data.colleageName)
          setCollegeImgUrl(response.data.data.colleageImgUrl)
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





  const collegeUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login'); // Redirect to login route if token is not present
      } else {
        const response = await axios.patch(`http://172.20.10.11:5000/api/colleage/${collegeId}`, {
          colleageName,
          colleageImgUrl,
        }, { headers });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login route if token is invalid or expired
      } else {
        console.log(error);
      }
    }
    navigate(`/universities/${universityId}`)
  }



  return (
    <>
      <SideBar />
      <form className='w-50 me-auto my-5' onSubmit={collegeUpdateHandler}>
        <div className="mb-3">
          <label htmlFor="colleageName" className="form-label">New Colleage Name</label>
          <input type="text" className="form-control" id="colleageName" value={colleageName} aria-describedby="emailHelp" onChange={(e) => setCollegeName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="colleageImg" className="form-label" >New Colleage Image URL</label>
          <input type="text" className="form-control" id="colleageImg" value={colleageImgUrl} onChange={(e) => setCollegeImgUrl(e.target.value)} />
          <img src={colleageImgUrl} className='my-4 rounded' style={{maxHeight:'200px',maxWidth:"200px"}} alt="img" />
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

export default EditColleage;
