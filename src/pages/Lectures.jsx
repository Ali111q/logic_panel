import React, { useEffect, useState } from 'react';
import LectureRow from '../components/LectureRow';
import SideBar from '../components/SideBar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Lectures = () => {
  const { universityId, colleageId, branchId, courseId } = useParams();

  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await axios.get(`https://slogic.dorto-dev.com/api/course/${courseId}`, { headers });
        setVideos(response.data.courseVideos);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, navigate, courseId]);

  return (
    <>
      <SideBar />
      <div className='d-flex w-75'>
        <div className='w-100 mt-5'>
          <div className='d-flex justify-content-between align-items-center'>
            <h1 className='text-primary'>Course Videos</h1>
            <div>
              <Link className='btn btn-primary me-5 text-uppercase' to={`/universities/${universityId}/${colleageId}/${branchId}/${courseId}/addnewcourse`}>
                add video
              </Link>
            </div>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <table className="table mt-5 w-100">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">المرحلة</th>
                  <th scope="col">الفرع</th>
                  <th scope="col">تاريخ النشر</th>
                  <th scope="col">الجامعة</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="overflow-hidden" style={{ maxHeight: '10vh', overflow: 'hidden' }}>
                {videos.map(video => (
                  <LectureRow key={video} videoId={video} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Lectures;
