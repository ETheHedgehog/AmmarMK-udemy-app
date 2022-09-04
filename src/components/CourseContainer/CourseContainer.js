import CourseCard from '../CourseCard/CourseCard';
import styles from './CourseContainer.module.css';
import { DataContext } from '../CourseDataProvider/CourseDataProvider';
import { useSearchParams } from 'react-router-dom';

const createCourseCardJSX = (course) => {
    return <CourseCard key={course.id} {...course}></CourseCard>;
};

//takes a search parameter and returns a callback function for the filter method;
const filterCourses = (searchParam) => {
    const filters = searchParam.toLowerCase().split(' ');
    //if search parameter is an empty string return a filter callback function that always returns true;
    if (!searchParam)
        return () => {
            return true;
        };
    return (course) => {
        const title = course.title.toLowerCase();
        return filters.some((filter) => {
            if (!filter) return false;
            return title.includes(filter);
        });
    };
};

const CourseContainer = () => {
    const courseData = DataContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const courses = courseData.courses
        .filter(filterCourses(searchParams.get('search') || ''))
        .map(createCourseCardJSX);

    if (courseData.error) {
        return courseData.error;
    }
    return <div className={styles.courseContainer}>{courses}</div>;
};

export default CourseContainer;
