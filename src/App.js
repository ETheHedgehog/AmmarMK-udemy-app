import './styles/App.css';
import CourseDataProvider from './components/CourseDataProvider/CourseDataProvider';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Navbar></Navbar>
            <CourseDataProvider>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    {
                        //TODO: Single Course Page:
                        /* <Route
                        path="/courses/:courseId"
                        element={<CoursePage />}
                    ></Route> */
                    }
                </Routes>
            </CourseDataProvider>
        </>
    );
}

export default App;
