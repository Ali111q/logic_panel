import React from 'react'
import styles from './lectureForm.module.css'
const VideoForm = () => {
  return (
    <form >
    <h1 className='text-center mt-3 text-primary'>Upload Video</h1>
    <div className='d-flex  gap-5 w-100 flex-wrap justify-content-center'>

      {/* information inputs */}
      <div className='mt-5 d-flex gap-3  flex-column w-50 '>
        <input type="text" placeholder='العنوان' className={styles['address-class'] + 'text-right rounded border border-dark'} />
        <textarea name="" id="" cols="30" rows="5" className='px-2 pt-2 text-right rounded border border-dark ' placeholder="الوصف" style={{ textAlign: 'right ' }} ></textarea>
        <input type="text" placeholder='رابط صورة الفيديو' className='p-2 text-right rounded border border-dark ' />
        <input type="text" placeholder='رابط مقطع الفيديو' className='p-2 text-right rounded border border-dark ' />
      </div>
    
    </div>
    <div className='d-flex  gap-5 w-100 flex-wrap justify-content-center my-5 me-5 '>
        <div>
          <input type="number"id='videoDuration' className='mx-3 rounded border border-dark' />
          <label htmlFor="videoDuration" >مدة الفيديو</label>
        </div>
        <div>
          <input type="number" id='videoChapter' className='mx-3 rounded border border-dark' />
          <label htmlFor="videoChapter" >الفصل</label>
        </div>
        <div>
          <input type="number" id='videoSequence' className='mx-3 rounded border border-dark' />
          <label htmlFor="videoSequence" > تسلسل الفيديو</label>
        </div>
    </div>
    <div className="form-check form-switch " style={{ margin: '0 13rem' }}>
      <input className="form-check-input px-4 mx-2" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
      <label className="form-check-label" for="flexSwitchCheckDefault">مجاني ؟</label>
    </div>
    <div className='d-flex flex-column my-5 gap-3'>
      <button className='btn btn-light w-75 mx-auto'>الغاء</button>
      <button className='btn btn-primary w-75 mx-auto'>حفظ</button>
    </div>
  </form>
  )
}

export default VideoForm
