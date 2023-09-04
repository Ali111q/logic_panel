import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import OneBranch from './OneBranch'


const Branches = () => {


    const [branchs,setBranchs] = useState([])
    const [currentCollegeImgUrl,setCurrentCollegeImgUrl] = useState('')
    
    const param = useParams()
    const colleageId = param.colleageId    
    const universityId = param.universityId
    // auth & fetch 
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    // USE EFFECT FOR BRING THE INFORMATION AND CHECK THE TOKEN 
    
    useEffect(() => {
      async function fetchData() {
        try {
          if (!token) {
            navigate('/login'); // Redirect to login route if token is not present
          } else {
            const response = await axios.get(`http://.0.11:5000/api/colleage/${colleageId}`, { headers })
            console.log(response)
            setBranchs(response.data.colleageBranches)
            setCurrentCollegeImgUrl(response.data.colleageImgUrl)
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
                    <h1 className="text-center my-3 text-primary text-uppercase">Branchs</h1>
                    <div>
                        <Link className="text-uppercase btn btn-primary" to={`/universities/${universityId}/${colleageId}/addnewbranch`}>add new Branch</Link>
                    </div>
                </div>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                     {branchs.map(branch=>{
                       return <OneBranch img={currentCollegeImgUrl}  oneBranchId={branch} currentCollegeId={colleageId} currentUniversityId={universityId}/>
                     })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Branches
