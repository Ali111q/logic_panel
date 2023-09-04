import React, { useEffect, useState } from 'react'
import styles from './lectureForm.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import SideBar from './SideBar'
const EditVideo = () => {
  const param = useParams()
  const colleageId = param.colleageId
  const universityId = param.universityId
  const branchId = param.branchId
  const courseId = param.courseId
  const videoId = param.videoId

  // auth & fetch 
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const [videoTitle, setVideoTitle] = useState('')
  const [viedoDescription, setViedoDescription] = useState('')
  const [videoImgUrl, setVideoImgUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoSequence, setVideoSequence] = useState(0)
  const [videoChapter, setVideoChapter] = useState('')
  const [videoDuration, setVideoDuration] = useState(0)
  const [isVideoFree, setIsVideoFree] = useState(false)



  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate('/login'); // Redirect to login route if token is not present
        }
        else {
          const response = await axios.get(`http://172.20.10.11:5000/api/video/${videoId}`, { headers });
          setVideoTitle(response.data.data.videoTitle)
          setViedoDescription(response.data.data.viedoDescription)
          setVideoImgUrl(response.data.data.videoImgUrl)
          setVideoUrl(response.data.data.videoUrl)
          setVideoSequence(response.data.data.videoSequence)
          setVideoChapter(response.data.data.videoChapter)
          setVideoDuration(response.data.data.videoDuration)
          setIsVideoFree(response.data.data.isVideoFree)
        }
      } catch (error) {
        console.log(error)
        navigate('/login') // Redirect to login route if token is not present
      }
    }
    fetchData()
  }, [token, navigate])


  const videoSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!token) {
        navigate('/login') // Redirect to login route if token is not present
      } else {
        const response = await axios.patch(`http://172.20.10.11:5000/api/video/${videoId}`, {
          videoTitle,
          viedoDescription,
          videoImgUrl,
          videoUrl,
          videoSequence,
          videoChapter,
          videoDuration,
          isVideoFree,
          courseId
        }, { headers });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login'); // Redirect to login route if token is invalid or expired
      } else {
        console.log(error)
      }
    }
    navigate(`/universities/${universityId}/${colleageId}/${branchId}/${courseId}`)
  }






  return (
    <>
      <SideBar />
      <form onSubmit={videoSubmitHandler}>
        <h1 className='text-center mt-3 text-primary'>Edit Video</h1>
        <div className='d-flex  gap-5 w-100 flex-wrap justify-content-center'>

          {/* information inputs */}
          <div className='mt-5 d-flex gap-3  flex-column w-50 '>
            <input type="text" value={videoTitle} placeholder='العنوان' className={styles['address-class'] + 'text-right rounded border border-dark'} onChange={e => setVideoTitle(e.target.value)} />

            <textarea name="" value={viedoDescription} id="" cols="30" rows="5" className='px-2 pt-2 text-right rounded border border-dark ' placeholder="الوصف" style={{ textAlign: 'right ' }} onChange={e => setViedoDescription(e.target.value)}></textarea>
            <input type="text" value={videoImgUrl} placeholder='رابط صورة الفيديو' className='p-2 text-right rounded border border-dark ' onChange={e => setVideoImgUrl(e.target.value)} />
            <input type="text" value={videoUrl} placeholder='رابط مقطع الفيديو' className='p-2 text-right rounded border border-dark ' onChange={e => setVideoUrl(e.target.value)} />
          </div>

        </div>
        <div className='d-flex  gap-5 w-100 flex-wrap justify-content-center my-5 me-5 '>
          <div>
            <input type="number" value={videoDuration} id='videoDuration' className='mx-3 rounded border border-dark' onChange={e => setVideoDuration(e.target.value)} />
            <label htmlFor="videoDuration" >مدة الفيديو</label>
          </div>
          <div>
            <input type="number" value={videoChapter} id='videoChapter' className='mx-3 rounded border border-dark' onChange={e => setVideoChapter(e.target.value)} />
            <label htmlFor="videoChapter" >الفصل</label>
          </div>
          <div>
            <input type="number" value={videoSequence} id='videoSequence' className='mx-3 rounded border border-dark' onChange={e => setVideoSequence(e.target.value)} />
            <label htmlFor="videoSequence" > تسلسل الفيديو</label>
          </div>
        </div>
        <div className="form-check form-switch " style={{ margin: '0 13rem' }}>
          <input value={isVideoFree} className="form-check-input px-4 mx-2" type="checkbox" checked={isVideoFree} role="switch" id="flexSwitchCheckDefault" onClick={e => setIsVideoFree(!isVideoFree)} />
          <label className="form-check-label" for="flexSwitchCheckDefault">مجاني ؟</label>
        </div>
        <div className='d-flex flex-column my-5 gap-3'>
          <Link className='btn btn-light w-75 mx-auto' to={`/universities/${universityId}/${colleageId}/${branchId}/${courseId}`}>الغاء</Link>
          <button className='btn btn-primary w-75 mx-auto'>حفظ</button>
        </div>
      </form></>
  )
}

export default EditVideo
