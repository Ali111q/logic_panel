import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import University from './University';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Universities = () => {
  const [universities, setUniversities] = useState([]);


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
          const response = await axios.get(`http://172.20.10.11:5000/api/university`, { headers });
          setUniversities(response.data);
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

  return (
    <>
      {token ? (
        <>
          <SideBar />
          <div className="album py-5 bg-light min-vh-100">
            <div className='d-flex align-items-center gap-5 justify-content-between'>
              <h1 className="text-center my-3 text-primary text-uppercase">Universities</h1>
              <div>
                <Link className="text-uppercase btn btn-primary" to={`/addnewuniversity`}>add new university</Link>
              </div>
            </div>
            <div className="container">
              {universities.length === 0 && <h1>There isn't any universities. Please add one.</h1>}
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {universities.map((university) => {
                  return <University id={university._id} title={university.universityName} img={university.universityImgUrl} />;
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Universities;
