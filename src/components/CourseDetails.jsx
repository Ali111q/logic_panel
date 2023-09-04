import React from 'react'
import SideBar from './SideBar'
import { Link, useParams } from 'react-router-dom'

const CourseDetails = () => {
    const param = useParams()
    const id = param.id
    return (<>
        <SideBar />
        <div class="container px-5 my-5 ">
            <div className="col px-5 ">
                <h1 className="text-center mb-3">Coures Details</h1>
                <div className="card shadow-sm">
                    <title>Placeholder</title>
                    <img src="" alt="main img" width="100%" height="250" />
                    <div className="card-body">
                        <h2>course title</h2>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <Link to={'/lectures/'+id} type="button" className="btn btn-sm btn-outline-secondary">Course Videos    </Link>
                                <Link to={`/editc/${id}`} type="button" className="btn btn-sm btn-outline-secondary">Edit</Link>
                            </div>
                            <small className="text-muted">استاذ محمد علي</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default CourseDetails
