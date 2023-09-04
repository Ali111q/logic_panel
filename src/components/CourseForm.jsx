import React, { useEffect, useState } from 'react'
import styles from './lectureForm.module.css'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'




const CourseForm = () => {
  // states
  const [isCourseFree, setIsCourseFree] = useState(false)
  const [universityName, setUniversityName] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [branchName, setBranchName] = useState('')
  const [branchStageNumbers, setBranchStageNumbers] = useState(1)
  const [stageNames, setStageNames] = useState([''])
  const [currentStageClicked,setCurrentStageClicked] = useState('اختر المرحلة')
  const [CurrentSelectedChapter,setCurrentSelectedChapter] = useState('اختر الفصل')
  const [courseTitle,setCourseTitle] = useState('')
  const [courseImg,setCourseImg] = useState('')
  const [coursePrice,setCoursePrice] = useState('')
  const [courseDescription,setCourseDescription] = useState('')
  const [courseTeacher,setCourseTeacher] = useState('')


  const isCourseFreeHandler = (e) => {
    setIsCourseFree(!isCourseFree)
  }

  const param = useParams()
  const colleageId = param.colleageId
  const universityId = param.universityId
  const branchId = param.branchId
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
          const universityNameResponse = await axios.get(`https://slogic.dorto-dev.com/api/university/${universityId}`, { headers })
          const collegeNameResponse = await axios.get(`https://slogic.dorto-dev.com/api/colleage/${colleageId}`, { headers })
          const branchNameResponse = await axios.get(`https://slogic.dorto-dev.com/api/branch/${branchId}`, { headers })
          setBranchName(branchNameResponse.data.branchName)
          setBranchStageNumbers(branchNameResponse.data.branchStageNumbers)
          setUniversityName(universityNameResponse.data.universityName)
          setCollegeName(collegeNameResponse.data.colleageName)
        }
      } catch (error) {
        if (error.universityNameResponse && error.universityNameResponse.status === 401) {
          navigate('/login'); // Redirect to login route if token is invalid or expired
        } else {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [token, navigate]);

  console.log(branchName)
  // ! POST THE INFORMATION TO THE BACK END SERVER
  const courseSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login'); // Redirect to login route if token is not present
      } else {
        const response = await axios.post(`https://slogic.dorto-dev.com/api/course/addnewcourse`, {
          courseUniversityName: universityName,
          courseColleageName: collegeName,
          courseBranchName: branchName,
          courseChapter:CurrentSelectedChapter,
          courseTitle,
          courseImg,
          coursePrice,
          isCourseFree,
          courseDescription,
          courseTeacher,
          courseStage:currentStageClicked,
          branch:branchId
        }, { headers });
        console.log(response)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login route if token is invalid or expired
      } else {
        console.log(error);
      }
    }
    navigate(`/universities/${universityId}/${colleageId}/${branchId}`)
  }

  return (
    <form onSubmit={courseSubmitHandler}>
      <h1 className='text-center mt-3 text-primary'>Create Course</h1>
      <div className='d-flex  gap-5 w-100 flex-wrap justify-content-center'>
        {/* information inputs */}
        <div className='mt-5 d-flex gap-3  flex-column w-50 '>
          <input type="text" placeholder='اسم الكورس' className={styles['address-class'] + 'text-right rounded border border-dark'} onChange={(e)=>setCourseTitle(e.target.value)} />
          <textarea name="" id="" cols="30" rows="5" className='px-2 pt-2 text-right rounded border border-dark ' placeholder="وصف الكورس" style={{ textAlign: 'right ' }} onChange={(e)=>setCourseDescription(e.target.value)}></textarea>
          <input type="text" placeholder='رابط صورة الكورس' className='p-2 text-right rounded border border-dark ' onChange={(e)=>setCourseImg(e.target.value)} />
          <input type="text" placeholder='اسم الاستاذ' className='p-2 text-right rounded border border-dark ' onChange={(e)=>setCourseTeacher(e.target.value)} />
        </div>

      </div>
      <div className="form-check form-switch my-4 " style={{ margin: '0 13rem' }}>
        <input className="form-check-input px-4 mx-2" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={isCourseFreeHandler} />
        {!isCourseFree && <div>
          <input type='number' className='mx-3 text-right rounded border border-dark' onChange={(e)=>setCoursePrice(e.target.value)} />
          <label htmlFor="">سعر الكورس بالدينار</label>
        </div>}
        {isCourseFree && <label className="form-check-label" for="flexSwitchCheckDefault">مجاني </label>}

      </div>
      <div className='d-flex justify-content-center gap-5'>
        <DropdownButton id="dropdown-basic-button" title={`${currentStageClicked}`}  onClick={() => {
          setStageNames(() => {
            const branchsNames = []
            for (let i = 0; i < branchStageNumbers; i++) {
              branchsNames.push(`مرحلة ${i + 1}`)
            }
            return branchsNames
          })
        }}>
          {stageNames.map(stage =>
            <Dropdown.Item onClick={()=>{setCurrentStageClicked(stage)}}>{stage}</Dropdown.Item>
          )}
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title={`${CurrentSelectedChapter}`} >
          <Dropdown.Item onClick={()=>{setCurrentSelectedChapter('الفصل الاول')}}>الفصل الاول</Dropdown.Item>
          <Dropdown.Item onClick={()=>{setCurrentSelectedChapter('الفصل الثاني')}}>الفصل الثاني</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className='d-flex flex-column my-5 gap-3'>
        <Link className='btn btn-light w-75 mx-auto' to={`/universities/${universityId}/${colleageId}/${branchId}`}>الغاء</Link>
        <button type='submit' className='btn btn-primary w-75 mx-auto'>حفظ</button>
      </div>
    </form>
  )
}

export default CourseForm
