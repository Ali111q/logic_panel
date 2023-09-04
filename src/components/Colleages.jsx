import React, { useState ,useEffect} from 'react'
import SideBar from './SideBar'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OneColleage from './OneColleage'

const Colleages = () => {

const [colleages,setColleages] = useState([])
    const param = useParams()
    const colleageId = param.universityId    
    // auth & fetch 
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
  // todo make here filter depand of the universityColleage inside the data of data array and return only the colleages of this university 
    useEffect(() => {
      async function fetchData() {
        try {
          if (!token) {
            navigate('/login'); // Redirect to login route if token is not present
          } else {
            const response = await axios.get(`http://172.20.10.11:5000/api/university/${colleageId}`, { headers });
            setColleages(response.data.universityColleages);
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
            <SideBar />
            <div class="album py-5 bg-light min-vh-100">
                <div className='d-flex align-items-center justify-content-between'>
                    <h1 className="text-center my-3 text-primary text-uppercase">Colleages</h1>
                    <div>
                        <Link className="text-uppercase btn btn-primary" to={`/universities/${colleageId}/addnewcolleage`}>add new colleage</Link>
                    </div>
                </div>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {colleages.map((colleage, i) => {
                            return <OneColleage collegeId={colleage} currentUniversityId={colleageId} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Colleages
