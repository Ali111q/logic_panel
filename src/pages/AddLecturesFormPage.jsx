import React from 'react'
import LectureForm from '../components/LectureForm'
import SideBar from '../components/SideBar'

const AddLecturesFormPage = () => {
  return (
    <div className='d-flex  gap-5'>
      <SideBar/>
      <LectureForm/>
    </div>
  )
}

export default AddLecturesFormPage
