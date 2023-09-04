import React, { useState } from 'react';
import SideBar from './SideBar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UniversitiesForm = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const param = useParams()
  const universityId = param.universityId

  const [universityName, setUniversityName] = useState('')
  const [universityImgUrl, setUniversityImgUrl] = useState('')
  const universitySubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login'); // Redirect to login route if token is not present
      } else {
        const response = await axios.post(`https://slogic.dorto-dev.com/api/university/addnewuniversity`, {
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
      <form className='w-50 me-auto my-5' onSubmit={universitySubmitHandler}>
        <div className="mb-3">
          <label htmlFor="universityName" className="form-label">University Name</label>
          <input type="text" className="form-control" id="universityName" aria-describedby="emailHelp" onChange={(e) => setUniversityName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="universityImg" className="form-label">University Image URL</label>
          <input type="text" className="form-control" id="universityImg" onChange={(e) => setUniversityImgUrl(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default UniversitiesForm;
