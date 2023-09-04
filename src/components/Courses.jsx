import React ,{useState,useEffect}from 'react'
import CourseCard from './CourseCard'
import SideBar from './SideBar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const Courses = () => {
    const params = useParams()
    const { universityId, colleageId, branchId } = params


    const [courses,setCourses] = useState([])    
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
            const response = await axios.get(`https://slogic.dorto-dev.com/api/branch/${branchId}`, { headers })
            console.log(response)
            setCourses(response.data.courses)
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
            <div class="album py-5 bg-light min-vh-100">
                <div className='d-flex align-items-center gap-5 justify-content-between'>
                    <h1 className="text-center my-3 text-primary text-uppercase">Courses</h1>
                    <div>
                        <Link className="text-uppercase btn btn-primary" to={`/universities/${universityId}/${colleageId}/${branchId}/addnewcourse`}>add new course</Link>
                    </div>
                </div>
                <div class="container" style={{width:'70vw'}}>
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {courses.map(course => {
                          return  <CourseCard universityId={universityId} colleageId={colleageId} branchId={branchId} couresId={course} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Courses
