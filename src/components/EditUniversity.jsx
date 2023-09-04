import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const EdtiUniversity = () => {
  const param = useParams()
  const universityId = param.id

  //states
  const [universityName, setUniversityName] = useState('')
  const [universityImgUrl, setUniversityImgUrl] = useState('')



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
          const response = await axios.get(`https://slogic.dorto-dev.com/api/university/${universityId}`, { headers });
          setUniversityName(response.data.universityName)
          setUniversityImgUrl(response.data.universityImgUrl)
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



  const universityUpdateHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login'); // Redirect to login route if token is not present
      } else {
        const response = await axios.patch(`https://slogic.dorto-dev.com/api/university/${universityId}`, {
          universityName,
          universityImgUrl
        }, { headers });

      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login route if token is invalid or expired
      } else {
        console.log(error);
      }
    }
    navigate(`/universities`)
  }





  return (
    <>
      <SideBar />
      <form className='w-50 me-auto my-5' onSubmit={universityUpdateHandler}>
        <div className="mb-3">
          <label htmlFor="universityName" className="form-label">New University Name</label>
          <input type="text" className="form-control" value={universityName} onChange={(e)=>setUniversityName(e.target.value)} id="universityName" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="universityImg" className="form-label">New University Image URL</label>
          <input type="text" className="form-control" value={universityImgUrl} onChange={(e)=>setUniversityImgUrl(e.target.value)} id="universityImg" />
          <img src={universityImgUrl} className='my-4 rounded' style={{maxHeight:'200px',maxWidth:"200px"}} alt="img" />
        </div>
        <button type="submit"  className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default EdtiUniversity;
