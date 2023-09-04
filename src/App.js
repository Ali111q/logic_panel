import './App.css'
import { Routes, Route } from "react-router-dom";
import AddLecturesFormPage from "./pages/AddLecturesFormPage";
import Lectures from "./pages/Lectures";
import SignForm from "./pages/SignFormPage";
import VideoFormPage from "./pages/VideoFormPage";
import CourseFormPage from "./pages/CourseFormPage";
import CourseCard from "./components/CourseCard";
import Courses from "./components/Courses";
import CourseDetails from "./components/CourseDetails";
import EditCourse from "./components/EditCourse";
import SideBar from "./components/SideBar";
import Wrapper from "./ui/Wrapper";
import EditVideo from "./components/EditVideo";
import UniversitiesForm from "./components/UniversitiesForm";
import ColleageForm from "./components/ColleageForm";
import Universities from './components/Universities';
import Colleages from './components/Colleages';
import Branches from './components/Branches';
import EdtiUniversity from './components/EditUniversity';
import EditColleage from './components/EditColleage';
import SignUp from './pages/SignUpPage';
import BranchForm from './components/BranchForm';
import LectureForm from './components/LectureForm';
import CoursesPage from './pages/CoursesPage';
import EditBranch from './components/EditBranch';
import ActiveUsers from './components/ActiveUsers';
function App() {
  return (
    <div className="App ">
      <Routes>
        <Route exact path="/login" element={<SignForm />} />
        <Route exact path='/signup' element={<SignUp />} />
      </Routes>
      <Wrapper>
        <Routes>
          {/* active course  */}
          <Route path='/active/:courseId' element = {<ActiveUsers/>}/>


          {/* courses routes */}
            <Route path="/universities/:universityId/:colleageId/:branchId" element={<CoursesPage />} />
            <Route path="/editcourse/:universityId/:colleageId/:branchId/:courseId" element={<EditCourse />} />
            <Route path="/universities/:universityId/:colleageId/:branchId/addnewcourse" element={<CourseFormPage />} />

            {/* videos routes */}
            <Route path='universities/:universityId/:colleageId/:branchId/:courseId' element = {<Lectures/>} />
            <Route path='/universities/:universityId/:colleageId/:branchId/:courseId/addnewcourse' element = {<VideoFormPage/>} />
            <Route path="/editvideo/:universityId/:collegeId/:branchId/:courseId/:videoId" element={<EditVideo />} />

            {/* branchs routes */}
            <Route path='/universities/:universityId/:colleageId' element={<Branches />} />
            <Route path='/universities/:universityId/:colleageId/addnewbranch' element={<BranchForm />} />
            <Route path='/editbranch/:universityId/:collegeId/:branchId' element={<EditBranch />} />

          {/* colleges routes */}
            <Route path='/universities/:universityId' element={<Colleages />} />
            <Route path='/universities/:universityId/addnewcolleage' element={<ColleageForm/>} />
            <Route path='/edit/:universityId/:currentCollegeId' element={<EditColleage />} />

            
            {/* university routes */}
            <Route path='/' element = {<Universities/>}/>
            <Route path='/universities' element={<Universities />} />
            <Route path='/addnewuniversity' element={<UniversitiesForm />} />
            <Route path='/edit/university/:id' element={<EdtiUniversity />} />

        </Routes>
      </Wrapper>
    </div>
  );
}

export default App;
