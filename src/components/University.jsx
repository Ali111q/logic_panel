import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const University = ({ title, img, id }) => {

    const [isDeleteClicked, setIsDeleteClicked] = useState(false)



    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function fetchData() {
            try {
                if (!token) {
                    navigate('/login'); // Redirect to login route if token is not present
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


    const headers = {
        Authorization: `Bearer ${token}`
    };
    const handleDelete = async () => {
        try {
            await axios.delete(`http://172.20.10.11:5000/api/university/${id}`, { headers });
            setIsDeleteClicked(true); // Update the state to indicate deletion
        } catch (err) {
            console.log(err);
        }
    }
    if(isDeleteClicked){
        return null
    }
    return (
        <div className="col " style={{minWidth:'250px'}}>
            <div className="card shadow-sm">
                <img src={img} alt="main img" width="100%" height="250" />
                <div className="card-body">
                    <h2>{title}</h2>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group" >
                            <Link to={`/universities/${id}`} className="btn btn-sm btn-outline-primary">View</Link>
                            <Link to={`/edit/university/${id}`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            <button type='button' className="btn btn-sm btn-outline-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default University
