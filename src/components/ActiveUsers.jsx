import { useNavigate, useParams } from 'react-router-dom';
import SideBar from './SideBar'
import { useEffect, useState } from 'react';
import axios from 'axios'
import UserCard from './UserCard';

const ActiveUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const param = useParams();
    const courseId = param.courseId;

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    };

    useEffect(() => {
        async function fetchData() {
            try {
                if (!token) {
                    navigate('/login');
                } else {
                    const response = await axios.get(process.env.REACT_APP_API_URL+'/usersaccounts', { headers });
                    setUsers(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                } else {
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [token, navigate]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <SideBar />
            <div class="album py-5 bg-light min-vh-100">
                <div className="d-flex flex-column mb-5 align-items-center justify-content-between">
                    <h1 className="text-center my-3 text-primary text-uppercase">Users Accounts</h1>
                        <input
                            className='form-control'
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                </div>
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {filteredUsers.map((user) => (
                            <UserCard userInfo={user} id={user._id} currentCourseId={courseId} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActiveUsers;