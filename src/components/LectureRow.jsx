import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
const LectureRow = ({ videoId }) => {

    // STATES 
    const [courseTeahcer, setCourseTeahcer] = useState('')
    const [courseStage, setCourseStage] = useState('')
    const [courseBranchName, setCourseBranchName] = useState('')
    const [courseUniversityName, setCourseUniversityName] = useState('')
    const [courseTitle, setCourseTitle] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoDate, setVideoDate] = useState('')
    const [videoImgUrl, setVideoImgUrl] = useState('')

    const [isDeleteClicked,setIsDeleteClicked] = useState(false)
    const [videoDeletedId,setVideoDeletedId] = useState(null)

    
    const params = useParams()
    const universityId = params.universityId
    const collegeId = params.collegeId
    const branchId = params.branchId
    const courseId = params.courseId
    // auth & fetch 
    const navigate = useNavigate();
    //setup date type 
    const date = new Date(videoDate);


    const formattedDate = date.toLocaleDateString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
    });
    

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
                    const courseInformation = await axios.get(`http://172.20.10.11:5000/api/course/${courseId}`, { headers })
                    const response = await axios.get(`http://172.20.10.11:5000/api/video/${videoId}`, { headers })
                    console.log(response)
                    setCourseTitle(courseInformation.data.courseTitle)
                    setCourseStage(courseInformation.data.courseStage)
                    setCourseTeahcer(courseInformation.data.courseTeacher)
                    setCourseBranchName(courseInformation.data.courseBranchName)
                    setCourseUniversityName(courseInformation.data.courseUniversityName)
                    setVideoDate(response.data.data.createdAt)
                    setVideoTitle(response.data.data.videoTitle)
                    setVideoImgUrl(response.data.data.videoImgUrl)
                    setVideoDeletedId(response.data.data._id)
                    
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
    }, [token, navigate])

       //delete handler
       const handleDelete = async () => {
           try {
               await axios.delete(`http://172.20.10.11:5000/api/video/${videoDeletedId}`, { headers });
               setIsDeleteClicked(true); // Update the state to indicate deletion
        } catch (err) {
            console.log(err);
        }
    }

    if(isDeleteClicked){
        return null
    }






    return (
        <tr className=''>
            <th scope="row" className='d-flex gap-2 align-items-center'>
                <div style={{ maxHeight: '75px', maxWidth: '75px', overflow: 'hidden', borderRadius: '2rem' }}>
                    <img src={videoImgUrl} style={{ height: '100%', width: '100%' }} alt="" />
                </div>
                <div className='d-flex flex-column'>
                    <b>{`${courseTitle} - ${videoTitle}`}</b>
                    <span>{courseTeahcer}</span>
                </div>
            </th>
            <td><strong>{courseStage}</strong></td>
            <td className='fw-bold'>{courseBranchName}</td>
            <td className=' '>
                <span className='fw-bold'>{formattedDate}</span>
            </td>
            <td><strong>{courseUniversityName}</strong></td>
            <td>
                <Link to={`/editvideo/${universityId}/${collegeId}/${branchId}/${courseId}/${videoId}`} type="button" class="btn btn-primary me-2">تعديل</Link>
                <button type="button" class="btn btn-danger" onClick={handleDelete}>حذف</button>
            </td>
        </tr>
    )
}

export default LectureRow
