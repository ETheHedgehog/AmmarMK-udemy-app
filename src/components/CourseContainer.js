import CourseCard from './CourseCard';
import styles from '../styles/CourseContainer.module.css';
import { useEffect, useState } from 'react';

const createCourseCardJSX = (course) => {
    return <CourseCard key={course.id} {...course}></CourseCard>;
};

const updateCoursesState = (courses) => {
    return (oldState) => {
        return {
            ...oldState,
            isLoading: false,
            courses: courses.map(createCourseCardJSX),
        };
    };
};

const handleCoursesError = (oldState) => {
    return {
        ...oldState,
        isLoading: false,
        error: (
            <h3 className={styles.errorMessage}>
                {'Oops, Something went wrong'}
            </h3>
        ),
    };
};

const CourseContainer = () => {
    const [courses, setCourses] = useState({
        courses: [],
        isLoading: false,
        error: '',
    });

    useEffect(() => {
        const fetchCourses = async () => {
            let data = await fetch('http://localhost:3001/info');
            let json = await data.json();
            setCourses(updateCoursesState(json.courses));
        };
        setCourses((oldState) => {
            return { ...oldState, isLoading: true };
        });
        fetchCourses().catch(() => {
            setCourses(handleCoursesError);
        });
    }, []);

    if (courses.error) {
        return courses.error;
    }
    return <div className={styles.courseContainer}>{courses.courses}</div>;
};

export default CourseContainer;
