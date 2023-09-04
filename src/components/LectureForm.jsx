import React, { useEffect, useState } from 'react';
import styles from './lectureForm.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const LectureForm = () => {
  const { colleageId, universityId, branchId, courseId } = useParams();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoImgUrl, setVideoImgUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSequence, setVideoSequence] = useState(0);
  const [videoChapter, setVideoChapter] = useState('');
  const [videoDuration, setVideoDuration] = useState(0);
  const [isVideoFree, setIsVideoFree] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          navigate('/login');
        }
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    };
    fetchData();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        navigate('/login');
      } else {
        const response = await axios.post(
          `http://172.20.10.11:5000/api/video/addnewvideo`,
          {
            videoTitle,
            videoDescription, // Fix the key name here
            videoImgUrl,
            videoUrl,
            videoSequence,
            videoChapter,
            videoDuration,
            isVideoFree,
            courseId,
          },
          { headers }
        );        
        console.log(response);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/login');
      } else {
        console.log(error);
      }
    }
    navigate(`/universities/${universityId}/${colleageId}/${branchId}/${courseId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-center mt-3 text-primary'>Upload Video</h1>
      <div className='d-flex gap-5 w-100 flex-wrap justify-content-center'>
        {/* information inputs */}
        <div className='mt-5 d-flex gap-3 flex-column w-50'>
          <input type="text" placeholder='العنوان' className={`${styles['address-class']} text-right rounded border border-dark`} onChange={e => setVideoTitle(e.target.value)} />
          <textarea name="" id="" cols="30" rows="5" className='px-2 pt-2 text-right rounded border border-dark' placeholder="الوصف" style={{ textAlign: 'right' }} onChange={e => setVideoDescription(e.target.value)}></textarea>
          <input type="text" placeholder='رابط صورة الفيديو' className='p-2 text-right rounded border border-dark' onChange={e => setVideoImgUrl(e.target.value)} />
          <input type="text" placeholder='رابط مقطع الفيديو' className='p-2 text-right rounded border border-dark' onChange={e => setVideoUrl(e.target.value)} />
        </div>
      </div>
      <div className='d-flex gap-5 w-100 flex-wrap justify-content-center my-5 me-5'>
        <div>
          <input type="number" id='videoDuration' className='mx-3 rounded border border-dark' onChange={e => setVideoDuration(e.target.value)} />
          <label htmlFor="videoDuration">مدة الفيديو</label>
        </div>
        <div>
          <input type="number" id='videoChapter' className='mx-3 rounded border border-dark' onChange={e => setVideoChapter(e.target.value)} />
          <label htmlFor="videoChapter">الفصل</label>
        </div>
        <div>
          <input type="number" id='videoSequence' className='mx-3 rounded border border-dark' onChange={e => setVideoSequence(e.target.value)} />
          <label htmlFor="videoSequence">تسلسل الفيديو</label>
        </div>
      </div>
      <div className="form-check form-switch" style={{ margin: '0 13rem' }}>
        <input className="form-check-input px-4 mx-2" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={() => setIsVideoFree(!isVideoFree)} />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">مجاني ؟</label>
      </div>
      <div className='d-flex flex-column my-5 gap-3'>
        <Link className='btn btn-light w-75 mx-auto' to={`/universities/${universityId}/${colleageId}/${branchId}/${courseId}`}>الغاء</Link>
        <button className='btn btn-primary w-75 mx-auto'>حفظ</button>
      </div>
    </form>
  );
};

export default LectureForm;
