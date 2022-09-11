import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    useCallback,
} from 'react';
import styles from './CourseDataProvider.module.css';

const courseData = createContext({});
export const DataContext = () => useContext(courseData);

const initialState = {
    courses: [],
    isLoading: true,
    error: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCHING_DATA':
            return { ...state, isLoading: true };
        case 'SUCCESS':
            return { ...state, isLoading: false, courses: action.payload };
        case 'FAILURE':
            return {
                ...state,
                isLoading: false,
                error: (
                    <h3 className={styles.errorMessage}>
                        {'Oops, Something went wrong'}
                    </h3>
                ),
            };
        default:
            return state;
    }
};

const CourseDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCourses = useCallback(async () => {
        dispatch({ type: 'FETCHING_DATA' });
        let data = await fetch('http://localhost:3001/info');
        let json = await data.json();
        dispatch({ type: 'SUCCESS', payload: json.courses });
    }, []);

    useEffect(() => {
        fetchCourses().catch(() => {
            dispatch({ type: 'FAILURE' });
        });
    }, [fetchCourses]);

    return <courseData.Provider value={state}>{children}</courseData.Provider>;
};

export default CourseDataProvider;
