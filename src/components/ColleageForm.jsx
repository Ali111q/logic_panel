import React, { useState } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import { redirect, useNavigate, useParams } from 'react-router-dom';

const ColleageForm = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const param = useParams()
  const universityId = param.universityId

  const [colleageName, setColleageName] = useState('')
  const [colleageImgUrl, setColleageImgUrl] = useState('')
  const collegeSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login'); // Redirect to login route if token is not present
      } else {
        const response = await axios.post(`http://172.20.10.11:5000/api/colleage/addnewcolleage`, {
          colleageName,
          colleageImgUrl,
          universityId
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
      <form className='w-50 me-auto my-5' onSubmit={collegeSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="colleageName" className="form-label">Colleage Name</label>
          <input type="text" className="form-control" id="colleageName" aria-describedby="emailHelp" onChange={(e) => setColleageName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="colleageImg" className="form-label" >Colleage Image URL</label>
          <input type="text" className="form-control" id="colleageImg" onChange={(e) => setColleageImgUrl(e.target.value)} />
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

export default ColleageForm;
